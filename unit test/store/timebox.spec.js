import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { getters, mutations, actions } from "../../store/timebox";
import { statusEnum } from "~/assets/enums";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("timebox/getters", () => {
  const state = {
    timeboxList: [{ id: 25 }, { id: 20 }, { id: 5 }]
  };
  const getTimeboxIndexById = getters.getTimeboxIndexById(state);
  test("getTimeboxIndexById successfully finds index from id", () => {
    expect(getTimeboxIndexById(25)).toBe(0);
    expect(getTimeboxIndexById(20)).toBe(1);
    expect(getTimeboxIndexById(5)).toBe(2);
  });
  test("getTimeboxIndexById returns -1 when id does not exist", () => {
    expect(getTimeboxIndexById(30)).toBe(-1);
  });
});

describe("timebox/mutations", () => {
  describe("SET_TIMEBOX_LIST", () => {
    test("Successfully sets timeboxList", () => {
      const state = {
        timeboxList: [{ id: 25 }]
      };
      mutations.SET_TIMEBOX_LIST(state);
      expect(state.timeboxList).toStrictEqual([]);
      mutations.SET_TIMEBOX_LIST(state, [{ id: 10 }]);
      expect(state.timeboxList).toStrictEqual([{ id: 10 }]);
      mutations.SET_TIMEBOX_LIST(state, []);
      expect(state.timeboxList).toStrictEqual([]);
    });
  });

  describe("SET_REPEAT", () => {
    test("Successfully sets repeat", () => {
      const state = {
        repeat: null
      };
      mutations.SET_REPEAT(state);
      expect(state.repeat).toBe(false);
      mutations.SET_REPEAT(state, true);
      expect(state.repeat).toBe(true);
      mutations.SET_REPEAT(state, false);
      expect(state.repeat).toBe(false);
    });
  });

  describe("SET_STATUS", () => {
    describe("statusEnum.STARTED", () => {
      test("Successfully sets status", () => {
        const state = {
          status: -1,
          currentTimeboxId: 1,
          timeboxList: [{ id: 1 }]
        };
        mutations.SET_STATUS(state, statusEnum.STARTED);
        expect(state.status).toBe(statusEnum.STARTED);
      });
      test("Successfully sets status and moves currentTimeboxId to first timebox in timeboxList", () => {
        const state = {
          status: -1,
          currentTimeboxId: -1,
          timeboxList: [{ id: 1 }]
        };
        mutations.SET_STATUS(state, statusEnum.STARTED);
        expect(state.status).toBe(statusEnum.STARTED);
        expect(state.currentTimeboxId).toBe(1);
      });
      test("Does not set status as STARTED if timeboxList is empty", () => {
        const state = {
          status: -1,
          currentTimeboxId: -1,
          timeboxList: []
        };
        mutations.SET_STATUS(state, statusEnum.STARTED);
        expect(state.status).toBe(statusEnum.STOPPED);
      });
    });

    test("Successfully sets statusEnum.PAUSED", () => {
      const state = {
        status: 1,
        currentTimeboxId: 1,
        timeboxList: [{ id: 1 }]
      };
      mutations.SET_STATUS(state, statusEnum.PAUSED);
      expect(state.status).toBe(statusEnum.PAUSED);
      expect(state.currentTimeboxId).toBe(1);
    });
    test("Successfully sets statusEnum.STOPPED and resets currentTimeboxId", () => {
      const state = {
        status: 1,
        currentTimeboxId: 1,
        timeboxList: [{ id: 1 }]
      };
      mutations.SET_STATUS(state, statusEnum.STOPPED);
      expect(state.status).toBe(statusEnum.STOPPED);
      expect(state.currentTimeboxId).toBe(-1);
    });
  });

  describe("DELETE_TIMEBOX", () => {
    let state;
    beforeEach(() => {
      state = {
        timeboxList: [{ id: 25 }]
      };
    });

    test("Successfully deletes timeboxes from timeboxList", () => {
      mutations.DELETE_TIMEBOX(state, 25);
      expect(state.timeboxList).toStrictEqual([]);
    });
    test("Does not delete when passed invalid id", () => {
      mutations.DELETE_TIMEBOX(state, 10);
      expect(state.timeboxList).toStrictEqual([{ id: 25 }]);
    });
  });

  describe("ADD_TIMEBOX", () => {
    test("Successfully adds timebox to end of timeboxList", () => {
      const state = {
        timeboxList: [{ id: 25 }],
        toAddId: 1
      };
      mutations.ADD_TIMEBOX(state, { id: 10 });
      expect(state.timeboxList).toStrictEqual([{ id: 25 }, { id: 1 }]);
    });
  });

  describe("UPDATE_TIMEBOX", () => {
    let state;
    beforeEach(() => {
      state = {
        timeboxList: [{ id: 25, title: "Title 1" }]
      };
    });
    test("Successfully updates timebox", () => {
      mutations.UPDATE_TIMEBOX(state, {
        index: 0,
        timebox: { id: 25, title: "Title 2" }
      });
      expect(state.timeboxList).toStrictEqual([{ id: 25, title: "Title 2" }]);
    });
    test("Doesn't fail when index is out of range", () => {
      mutations.UPDATE_TIMEBOX(state, {
        index: -1,
        timebox: { id: 25, title: "Title 2" }
      });
      expect(state.timeboxList).toStrictEqual([{ id: 25, title: "Title 1" }]);
      mutations.UPDATE_TIMEBOX(state, {
        index: 2,
        timebox: { id: 25, title: "Title 2" }
      });
      expect(state.timeboxList).toStrictEqual([{ id: 25, title: "Title 1" }]);
    });
  });

  describe("SET_CURRENT_TIMEBOX", () => {
    test("Successfully sets currentTimeboxId", () => {
      const state = {
        currentTimeboxId: 0
      };
      mutations.SET_CURRENT_TIMEBOX(state, 1);
      expect(state.currentTimeboxId).toBe(1);
    });
  });

  describe("_NEXT_TIMEBOX", () => {
    let state;
    beforeEach(() => {
      state = {
        timeboxList: [
          { id: 25, title: "Title 1" },
          { id: 30, title: "Title 2" },
          { id: 5, title: "Title 0" }
        ]
      };
    });
    test("Successfully switches to next timebox in list", () => {
      mutations._NEXT_TIMEBOX(state, 0);
      expect(state.currentTimeboxId).toBe(30);
    });
    test("Successfully loops when set to repeat", () => {
      state.repeat = true;
      mutations._NEXT_TIMEBOX(state, 2);
      expect(state.currentTimeboxId).toBe(25);
      expect(state.status).not.toBe(statusEnum.FINISHED);
    });
    test("Does not loop when hit end and not set to repeat", () => {
      state.repeat = false;
      mutations._NEXT_TIMEBOX(state, 2);
      expect(state.currentTimeboxId).toBe(-1);
      expect(state.status).toBe(statusEnum.FINISHED);
    });
  });
});

describe("timebox/actions", () => {
  let vuexStore;
  beforeEach(() => {
    vuexStore = {
      mutations,
      getters,
      actions
    };
  });

  describe("updateTimebox", () => {
    test("Successfully updates timebox", () => {
      let state = {
        timeboxList: [{ id: 25, title: "Title 1" }]
      };
      let commitMock = jest.fn();
      actions.updateTimebox(
        {
          rootState: {
            savedTimeboxes: {
              currentTimeboxListName: ""
            }
          },
          state,
          getters,
          commit: commitMock
        },
        { id: 25, title: "Title 2" }
      );
      expect(commitMock.mock.calls[0][0]).toBe("UPDATE_TIMEBOX");
      expect(commitMock.mock.calls[1][0]).toBe(
        "savedTimeboxes/UPDATE_TIMEBOX_LIST"
      );
    });
  });

  describe("nextTimebox", () => {
    let playSound;
    beforeEach(() => {
      playSound = jest.fn();
      vuexStore.state = {
        timeboxList: [
          { id: 25, title: "Title 1" },
          { id: 30, title: "Title 2" },
          { id: 5, title: "Title 0" }
        ]
      };
      vuexStore.modules = {
        alarm: {
          namespaced: true,
          actions: {
            playSound
          }
        }
      };
    });

    test("Successfully switches to next timebox in list", () => {
      vuexStore.state.currentTimeboxId = 25;
      const store = new Vuex.Store(vuexStore);

      store.dispatch("nextTimebox");
      expect(store.state.currentTimeboxId).toBe(30);
      expect(playSound.mock.calls.length).toBe(1);
    });
    test("Successfully loops when set to repeat", () => {
      vuexStore.state.repeat = true;
      vuexStore.state.currentTimeboxId = 5;
      const store = new Vuex.Store(vuexStore);

      store.dispatch("nextTimebox");
      expect(store.state.currentTimeboxId).toBe(25);
      expect(store.state.status).not.toBe(statusEnum.FINISHED);
      expect(playSound.mock.calls.length).toBe(1);
    });
    test("Successfully loops when set to repeat with only 1 item in timeboxList", () => {
      vuexStore.state.repeat = true;
      vuexStore.state.currentTimeboxId = 25;
      vuexStore.state.timeboxList = [{ id: 25, title: "Title 1" }];
      const store = new Vuex.Store(vuexStore);

      jest.useFakeTimers();
      store.dispatch("nextTimebox");
      expect(setTimeout).toHaveBeenCalled();
      expect(store.state.currentTimeboxId).toBe(-1);
      jest.advanceTimersByTime(100);
      expect(store.state.currentTimeboxId).toBe(25);
      expect(store.state.status).not.toBe(statusEnum.FINISHED);
      expect(playSound.mock.calls.length).toBe(1);
    });
    test("Does not loop when hit end and not set to repeat", () => {
      vuexStore.state.repeat = false;
      vuexStore.state.currentTimeboxId = 5;
      const store = new Vuex.Store(vuexStore);

      store.dispatch("nextTimebox");
      expect(store.state.currentTimeboxId).toBe(-1);
      expect(store.state.status).toBe(statusEnum.FINISHED);
      expect(playSound.mock.calls.length).toBe(1);
    });
  });

  describe("deleteTimebox", () => {
    let store;
    let UPDATE_TIMEBOX_LIST = jest.fn();
    beforeEach(() => {
      vuexStore.state = {
        timeboxList: [
          { id: 25, title: "Title 1" },
          { id: 30, title: "Title 2" },
          { id: 5, title: "Title 0" }
        ],
        currentTimeboxId: 30
      };
      vuexStore.modules = {
        savedTimeboxes: {
          namespaced: true,
          state: {
            currentTimeboxListName: "name"
          },
          mutations: {
            UPDATE_TIMEBOX_LIST
          }
        }
      };
      store = new Vuex.Store(vuexStore);
    });
    test("Deleting current timebox moves currentTimeboxId to previous one", () => {
      store.dispatch("deleteTimebox", 30);
      expect(store.state.currentTimeboxId).toBe(25);
    });
    test("Deleting past timebox does nothing to currentTimeboxId", () => {
      store.dispatch("deleteTimebox", 25);
      expect(store.state.currentTimeboxId).toBe(30);
    });
    test("Deleting future timebox does nothing to currentTimeboxId", () => {
      store.dispatch("deleteTimebox", 5);
      expect(store.state.currentTimeboxId).toBe(30);
    });
    test("Deleting final timebox sets currentTimeboxId to -1", () => {
      vuexStore.state = {
        timeboxList: [{ id: 5, title: "Title 0" }],
        currentTimeboxId: 5
      };
      store = new Vuex.Store(vuexStore);
      store.dispatch("deleteTimebox", 5);
      expect(store.state.currentTimeboxId).toBe(-1);
    });
  });
});
