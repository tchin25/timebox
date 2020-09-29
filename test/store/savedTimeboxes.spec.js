import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { getters, mutations } from "../../store/savedTimeboxes";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("savedTimeboxes/getters", () => {
  const state = {
    savedTimeboxLists: [
        {
          name: "Pomodoro",
          timeboxList: []
        }
    ]
  };
  const getTimeboxListByName = getters.getTimeboxListByName(state);
  test("getTimeboxListByName successfully returns Timebox List by name", () => {
    expect(
      getTimeboxListByName("Pomodoro")
    ).toStrictEqual( {
      name: "Pomodoro",
      timeboxList: []
    });
  });
  test("getTimeboxListByName returns null when name does not exist", () => {
    expect(getTimeboxListByName("X")).toBe(undefined);
  });
});

// describe("savedTimeboxes/mutations", () => {
//   describe("SET_SAVED_TIMEBOX_LIST", () => {});

//   describe("ADD_NEW_TIMEBOX_LIST", () => {});

//   describe("SET_CURRENT_TIMEBOX_LIST", () => {});

//   describe("DELETE_TIMEBOX_LIST", () => {});

//   describe("UPDATE_TIMEBOX_LIST", () => {});
// });
