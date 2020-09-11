export const state = () => ({
  savedTimeboxLists: [
    {
      name: "Pomodoro",
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
        }
      ]
    }
  ]
});

export const mutations = {
  ADD_TIMEBOX_LIST(state, timeboxList) {
    state.savedTimeboxLists.push(timeboxList);
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
    state.savedTimeboxLists[index] = timeboxList;
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
