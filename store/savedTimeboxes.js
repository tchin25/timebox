import { defaultState } from "./index";

/* istanbul ignore next */
export const state = () => defaultState().savedTimeboxes;

export const getters = {
  getTimeboxListByName: state => name => {
    return state.savedTimeboxLists.find(list => list.name == name);
  }
};

export const mutations = {
  SET_SAVED_TIMEBOX_LIST(state, savedTimeboxLists) {
    state.savedTimeboxLists = savedTimeboxLists ? savedTimeboxLists : [];
  },
  ADD_NEW_TIMEBOX_LIST(state, name) {
    state.savedTimeboxLists.push({ name, timeboxList: [] });
  },
  SET_CURRENT_TIMEBOX_LIST(state, name) {
    state.currentTimeboxListName = name;
  },
  DELETE_TIMEBOX_LIST(state, name) {
    state.savedTimeboxLists = state.savedTimeboxLists.filter(
      lists => lists.name != name
    );
  },
  UPDATE_TIMEBOX_LIST(state, timeboxList) {
    let index = state.savedTimeboxLists.findIndex(
      list => list.name == timeboxList.name
    );
    if (index == -1) {
      return;
    }
    state.savedTimeboxLists.splice(index, 1, timeboxList);
  },
  RESET_STATE(state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, defaultState().savedTimeboxes);
  }
};

export const actions = {};
