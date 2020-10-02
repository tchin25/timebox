import { statusEnum } from "../assets/enums";

/* istanbul ignore next */
export const state = () => ({
  currentTimeboxId: -1,
  status: statusEnum.STOPPED,
  repeat: true,
  mute: false,
  useCustomAudio: false,
  customAudioName: null,
  alarmAudio: null,
  remainingTime: 0,
  timeboxList: [],
  toAddId: 0 // Increment every time a timebox is added to prevent id collision
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
    state.timeboxList.push({ ...timebox, id: state.toAddId });
    state.toAddId++;
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
    state.remainingTime = seconds;
  },
  SET_REPEAT(state, bool) {
    state.repeat = bool;
  },
  SET_MUTE(state, bool) {
    state.mute = bool;
  },
  SET_USE_CUSTOM_AUDIO(state, bool) {
    state.useCustomAudio = bool;
  },
  SET_ALARM_AUDIO(state, dataURL) {
    state.alarmAudio = dataURL;
  },
  SET_CUSTOM_AUDIO_NAME(state, name) {
    state.customAudioName = name;
  },
  SET_STATUS(state, status) {
    switch (status) {
      case statusEnum.STARTED:
        if (state.currentTimeboxId === -1 && state.timeboxList.length > 0) {
          state.currentTimeboxId = state.timeboxList[0].id;
        }
        if (state.timeboxList.length !== 0) {
          state.status = status;
        }
        break;
      case statusEnum.STOPPED:
        state.currentTimeboxId = -1;
        state.status = status;
        break;
      case statusEnum.PAUSED:
        state.status = status;
        break;
    }
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
    if (state.timeboxList.length === 1 && state.repeat) {
      // Workaround to get repeat working on just 1 timebox
      commit("SET_CURRENT_TIMEBOX", -1);
      setTimeout(() => {
        commit("_NEXT_TIMEBOX", index);
      }, 50);
    } else {
      commit("_NEXT_TIMEBOX", index);
    }
  },
  deleteTimebox({ state, commit, getters }, id) {
    let currentLocation = getters.getTimeboxIndexById(state.currentTimeboxId);
    let deleteLocation = getters.getTimeboxIndexById(id);
    if (currentLocation === deleteLocation) {
      if (state.timeboxList.length === 1) {
        commit("SET_CURRENT_TIMEBOX", -1);
      } else {
        commit(
          "SET_CURRENT_TIMEBOX",
          state.timeboxList[currentLocation - 1].id
        );
      }
    }

    commit("DELETE_TIMEBOX", id);
  }
};
