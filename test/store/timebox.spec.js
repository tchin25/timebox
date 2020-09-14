import { getters, mutations, actions } from "../../store/timebox";

describe("timebox/getters", () => {
  const state = {
    timeboxList: [
      {
        id: 25
      },
      {
        id: 20
      },
      {
        id: 5
      }
    ]
  };
  const getTimeboxIndexById = getters.getTimeboxIndexById(state);
  test("Successfully finds index from id", () => {
    expect(getTimeboxIndexById(25)).toBe(0);
    expect(getTimeboxIndexById(20)).toBe(1);
    expect(getTimeboxIndexById(5)).toBe(2);
  });
  test("Returns -1 when id does not exist", () => {
    expect(getTimeboxIndexById(30)).toBe(-1);
  });
});
