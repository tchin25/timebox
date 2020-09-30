import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { getters, mutations } from "../../store/savedTimeboxes";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("savedTimeboxes/getters", () => {
  const state = {
    savedTimeboxLists: [{ name: "Pomodoro" }]
  };
  const getTimeboxListByName = getters.getTimeboxListByName(state);
  test("getTimeboxListByName successfully returns Timebox List by name", () => {
    expect(getTimeboxListByName("Pomodoro")).toStrictEqual({
      name: "Pomodoro"
    });
  });
  test("getTimeboxListByName returns null when name does not exist", () => {
    expect(getTimeboxListByName("X")).toBe(undefined);
  });
});

describe("savedTimeboxes/mutations", () => {
  describe("SET_SAVED_TIMEBOX_LIST", () => {
    test("Successfully sets savedTimeboxLists", () => {
      const state = {
        savedTimeboxLists: []
      };
      mutations.SET_SAVED_TIMEBOX_LIST(state);
      expect(state.savedTimeboxLists).toStrictEqual([]);
      mutations.SET_SAVED_TIMEBOX_LIST(state, [
        { name: "Pomodoro" },
        { name: "Yoga MIA" }
      ]);
      expect(state.savedTimeboxLists).toStrictEqual([
        { name: "Pomodoro" },
        { name: "Yoga MIA" }
      ]);
      mutations.SET_SAVED_TIMEBOX_LIST(state, []);
      expect(state.savedTimeboxLists).toStrictEqual([]);
    });
  });

  describe("ADD_NEW_TIMEBOX_LIST", () => {
    test("Successfully adds timeboxList to end of savedTimeboxLists", () => {
      const state = {
        savedTimeboxLists: [{ name: "Pomodoro", timeboxList: [] }]
      };
      mutations.ADD_NEW_TIMEBOX_LIST(state, "Yoga MIA");
      expect(state.savedTimeboxLists).toStrictEqual([
        { name: "Pomodoro", timeboxList: [] },
        { name: "Yoga MIA", timeboxList: [] }
      ]);
    });
  });

  describe("SET_CURRENT_TIMEBOX_LIST", () => {
    test("Successfully sets currentTimeboxListName", () => {
      const state = {
        currentTimeboxListName: ""
      };
      mutations.SET_CURRENT_TIMEBOX_LIST(state, "Pomodoro");
      expect(state.currentTimeboxListName).toBe("Pomodoro");
    });
  });

  describe("DELETE_TIMEBOX_LIST", () => {
    test("Successfully deletes timeboxList from savedTimeboxLists", () => {
      const state = {
        savedTimeboxLists: [{ name: "Pomodoro" }]
      };
      mutations.DELETE_TIMEBOX_LIST(state, "Pomodoro");
      expect(state.savedTimeboxLists).toStrictEqual([]);
    });
    test("Does not delete when passed invalid id", () => {
      const state = {
        savedTimeboxLists: [{ name: "Pomodoro" }]
      };
      mutations.DELETE_TIMEBOX_LIST(state, "X");
      expect(state.savedTimeboxLists).toStrictEqual([{ name: "Pomodoro" }]);
    });
  });

  describe("UPDATE_TIMEBOX_LIST", () => {
    const state = {
      savedTimeboxLists: [
        {
          name: "Pomodoro",
          timeboxList: []
        }
      ]
    };

    test("Successfully updates timeboxList", () => {
      mutations.UPDATE_TIMEBOX_LIST(state, {
        name: "Pomodoro",
        timeboxList: [
          {
            id: 0,
            title: "Work",
            duration: 1500
          },
          {
            id: 1,
            title: "Rest",
            duration: 300
          }
        ]
      });
      expect(state.savedTimeboxLists).toStrictEqual([
        {
          name: "Pomodoro",
          timeboxList: [
            {
              id: 0,
              title: "Work",
              duration: 1500
            },
            {
              id: 1,
              title: "Rest",
              duration: 300
            }
          ]
        }
      ]);
    });
    test("Doesn't fail when timeboxList does not exist", () => {
      mutations.UPDATE_TIMEBOX_LIST(state, {
        name: "X",
        timeboxList: []
      });
      expect(state.savedTimeboxLists).toStrictEqual([
        {
          name: "Pomodoro",
          timeboxList: [
            {
              id: 0,
              title: "Work",
              duration: 1500
            },
            {
              id: 1,
              title: "Rest",
              duration: 300
            }
          ]
        }
      ]);
    });
  });
});
