export const state = () => ({
  currentTimeboxListName: "",
  savedTimeboxLists: [
    {
      name: "Pomodoro",
      timeboxList: [
        {
          id: 0,
          title: "Work",
          duration: 1500,
        },
        {
          id: 1,
          title: "Rest",
          duration: 300,
        }
      ]
    },
    {
      name: "Yoga MIA",
      timeboxList: [
        {
          id: 0,
          title: "Immersion",
          duration: 300,
        },
        {
          id: 1,
          title: "SRS",
          duration: 300,
        }
      ]
    }
  ],
});

export const getters = {
  getTimeboxListIndexByName: state => name => {
    return state.savedTimeboxLists.findIndex(list => list.name == name);
  }
};

export const mutations = {
  ADD_TIMEBOX_LIST(state, timeboxList) {
    state.savedTimeboxLists.push(timeboxList);
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
  }
};

export const actions = {
    retrieveSavedTimeboxLists({commit}){

    },
    updateSavedTimeboxList({state, commit}, timeboxList){

    },
    deleteSavedTimeboxList({state, commit}, name){

    },
    addSavedTimedTimeboxList({state, commit}, timeboxList){

    }
};
