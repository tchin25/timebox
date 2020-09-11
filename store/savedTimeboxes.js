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
  ADD_TIMEBOX_LIST(state, value) {
    state.savedTimeboxLists.push(value);
  },
  DELETE_TIMEBOX_LIST(state, value) {
    state.savedTimeboxLists = state.savedTimeboxLists.filter(lists => {
      lists.name != value;
    });
  },
  UPDATE_TIMEBOX_LIST(state, value) {
    let index = state.savedTimeboxLists.findIndex(
      list => list.name == value.name
    );
    if (index == -1) {
      return;
    }
    state.savedTimeboxLists[index] = value;
  }
};

export const actions = {};
