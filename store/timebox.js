import { defaultState } from "./index";
import { statusEnum } from "../assets/enums";

/* istanbul ignore next */
export const state = () => defaultState().timebox;

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
    state.repeat = !!bool;
  },
  SET_PAUSE_BETWEEN_TIMEBOXES(state, bool) {
    state.pauseBetweenTimeboxes = !!bool;
  },
  SET_STATUS(state, status) {
    switch (status) {
      case statusEnum.STARTED:
        if (state.timeboxList.length > 0) {
          state.status = status;
          if (state.currentTimeboxId === -1) {
            state.currentTimeboxId = state.timeboxList[0].id;
          }
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
  },
  RESET_STATE(state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, defaultState().timebox);
  }
};

export const actions = {
  updateTimebox({ rootState, state, commit, getters }, timebox) {
    let index = getters.getTimeboxIndexById(timebox.id);
    commit("UPDATE_TIMEBOX", { index, timebox });
    commit(
      "savedTimeboxes/UPDATE_TIMEBOX_LIST",
      {
        name: rootState.savedTimeboxes.currentTimeboxListName,
        timeboxList: state.timeboxList
      },
      { root: true }
    );
  },
  nextTimebox({ state, commit, dispatch, getters }) {
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
    if (state.pauseBetweenTimeboxes){
      commit("SET_STATUS", statusEnum.PAUSED);
    }
    dispatch("alarm/playSound", null, { root: true });
  },
  deleteTimebox({ rootState, state, commit, getters }, id) {
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
    commit(
      "savedTimeboxes/UPDATE_TIMEBOX_LIST",
      {
        name: rootState.savedTimeboxes.currentTimeboxListName,
        timeboxList: state.timeboxList
      },
      { root: true }
    );
  }
};
