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
  getTimeboxListByName: state => name => {
    return state.savedTimeboxLists.find(list => list.name == name);
  }
};

export const mutations = {
  SET_SAVED_TIMEBOX_LIST(state, savedTimeboxLists) {
    state.savedTimeboxLists = savedTimeboxLists ? savedTimeboxLists : [];
  },
  ADD_NEW_TIMEBOX_LIST(state, name) {
    state.savedTimeboxLists.push({name, timeboxList: []});
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

};
