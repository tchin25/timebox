import { getters, mutations, actions } from "../../store/timebox";
// import {statusEnum } from "../"
import { isEqual } from "lodash";
import { statusEnum } from "~/assets/enums";

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
      expect(isEqual(state.timeboxList, [])).toBe(true);
      mutations.SET_TIMEBOX_LIST(state, [{ id: 10 }]);
      expect(isEqual(state.timeboxList, [{ id: 10 }])).toBe(true);
      mutations.SET_TIMEBOX_LIST(state, []);
      expect(isEqual(state.timeboxList, [])).toBe(true);
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
      expect(isEqual(state.timeboxList, [])).toBe(true);
    });
    test("Does not delete when passed invalid id", () => {
      mutations.DELETE_TIMEBOX(state, 10);
      expect(isEqual(state.timeboxList, [{ id: 25 }])).toBe(true);
    });
  });

  describe("ADD_TIMEBOX", () => {
    test("Successfully adds timebox to end of timeboxList", () => {
      const state = {
        timeboxList: [{ id: 25 }]
      };
      mutations.ADD_TIMEBOX(state, { id: 10 });
      expect(isEqual(state.timeboxList, [{ id: 25 }, { id: 10 }])).toBe(true);
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
      expect(isEqual(state.timeboxList, [{ id: 25, title: "Title 2" }])).toBe(
        true
      );
    });
    test("Doesn't fail when index is out of range", () => {
      mutations.UPDATE_TIMEBOX(state, {
        index: -1,
        timebox: { id: 25, title: "Title 2" }
      });
      expect(isEqual(state.timeboxList, [{ id: 25, title: "Title 1" }])).toBe(
        true
      );
      mutations.UPDATE_TIMEBOX(state, {
        index: 2,
        timebox: { id: 25, title: "Title 2" }
      });
      expect(isEqual(state.timeboxList, [{ id: 25, title: "Title 1" }])).toBe(
        true
      );
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
      expect(state.status).not.toBe(statusEnum.STOPPED);
    });
    test("Does not loop when hit end and not set to repeat", () => {
      state.repeat = false;
      mutations._NEXT_TIMEBOX(state, 2);
      expect(state.currentTimeboxId).toBe(-1);
      expect(state.status).toBe(statusEnum.STOPPED);
    });
  });
});
