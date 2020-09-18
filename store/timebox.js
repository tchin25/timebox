import { statusEnum } from "../assets/enums";

/* istanbul ignore next */
export const state = () => ({
  currentTimeboxId: 1,
  status: statusEnum.STOPPED,
  repeat: true,
  remainingTime: 0,
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

export const getters = {
  getTimeboxIndexById: state => id => {
    return state.timeboxList.findIndex(box => box.id == id);
  }
};

export const mutations = {
  SET_TIMEBOX_LIST(state, timeboxList) {
    state.timeboxList = timeboxList ? timeboxList : [];
  },
  DELETE_TIMEBOX(state, id) {
    state.timeboxList = state.timeboxList.filter(box => box.id != id);
  },
  ADD_TIMEBOX(state, timebox) {
    state.timeboxList.push(timebox);
  },
  UPDATE_TIMEBOX(state, { index, timebox }) {
    if (index == -1 || index >= state.timeboxList.length) {
      return;
    }
    state.timeboxList.splice(index, 1, timebox);
  },
  SET_CURRENT_TIMEBOX(state, id) {
    state.currentTimeboxId = id;
  },
  SET_REMAINING_TIME(state, seconds) {
    console.log("set remaining time " + seconds)
    state.remainingTime = seconds;
  },
  _NEXT_TIMEBOX(state, currentTimeboxIndex) {
    if (
      currentTimeboxIndex == state.timeboxList.length - 1 &&
      state.repeat == false
    ) {
      state.currentTimeboxId = -1;
      state.status = statusEnum.FINISHED;
    } else if (
      currentTimeboxIndex == state.timeboxList.length - 1 &&
      state.repeat == true
    ) {
      state.currentTimeboxId = state.timeboxList[0].id;
    } else {
      state.currentTimeboxId = state.timeboxList[currentTimeboxIndex + 1].id;
    }
  }
};

export const actions = {
  updateTimebox({ commit, getters }, timebox) {
    let index = getters.getTimeboxIndexById(timebox.id);
    commit("UPDATE_TIMEBOX", { index, timebox });
  },
  nextTimebox({ state, commit, getters }) {
    let index = getters.getTimeboxIndexById(state.currentTimeboxId);
    commit("_NEXT_TIMEBOX", index);
  }
};
