export const state = () => ({
  currentTimeboxId: 0,
  currentTimeboxEndTime: 0,
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
  SET_TIMEBOX_LIST(state, timeboxList) {
    state.timeboxList = timeboxList;
  },
  DELETE_TIMEBOX(state, id) {
    state.timeboxList = state.timeboxList.filter(box => box.id != id);
  },
  ADD_TIMEBOX(state, timebox) {
    state.timeboxList.push(timebox);
  },
  UPDATE_TIMEBOX(state, timebox) {
    let index = state.timeboxList.findIndex(box => box.id == timebox.id);
    if (index == -1) {
      return;
    }
    state.timeboxList[index] = timebox;
  },
  SET_CURRENT_TIMEBOX(state, id){
      state.currentTimeboxId = id;
  }
};

export const actions = {};
