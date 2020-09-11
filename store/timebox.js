export const state = () => ({
  currentTimebox: 0,
  remainingDuration: 0,
  timeboxList: [
    {
      id: 0,
      name: "Test name 1",
      duration: 3600,
      advance: {
        alternate: 0,
        offset: 0
      }
    },
    {
      id: 1,
      name: "Test name 2",
      duration: 1800,
      advance: {
        alternate: 0,
        offset: 0
      }
    },
    {
      id: 2,
      name: "Test name 3",
      duration: 7200,
      advance: {
        alternate: 0,
        offset: 0
      }
    }
  ]
});

export const mutations = {
  SET_TIMEBOX_LIST(state, value) {
    state.timeboxList = value;
  },
  DELETE_TIMEBOX(state, value) {
    state.timeboxList = state.timeboxList.filter(box => {
      box.id != value;
    });
  },
  ADD_TIMEBOX(state, value) {
    state.timeboxList.push(value);
  },
  UPDATE_TIMEBOX(state, value) {
    let index = state.timeboxList.findIndex(box => box.id == value.id);
    if (index == -1) {
      return;
    }
    state.timeboxList[index] = value;
  }
};

export const actions = {};
