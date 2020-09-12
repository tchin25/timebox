import statusEnum from "../assets/status"

export const state = () => ({
  currentTimeboxId: 0,
  status: statusEnum.STOPPED,
  repeat: true,
  timeboxList: [
    {
      id: 0,
      title: "Test name 1",
      duration: 10,
      advance: {
        alternate: 0,
        offset: 0
      }
    },
    {
      id: 1,
      title: "Test name 2",
      duration: 10,
      advance: {
        alternate: 0,
        offset: 0
      }
    },
    {
      id: 2,
      title: "Test name 3",
      duration: 10,
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
  SET_CURRENT_TIMEBOX(state, id) {
    state.currentTimeboxId = id;
  },
  NEXT_TIMEBOX(state) {
    let index = state.timeboxList.findIndex(box => box.id == state.currentTimeboxId);
    if (
      index == -1 ||
      (index == state.timeboxList.length - 1 && repeat == false)
    ) {
      state.currentTimeboxId = state.timeboxList[0].id;
      state.status = statusEnum.STOPPED;
    } else if (index == state.timeboxList.length - 1 && repeat == true) {
      state.currentTimeboxId = state.timeboxList[0].id;
    } else {
      state.currentTimeboxId = state.timeboxList[index + 1].id;
    }
  }
};

export const actions = {};
