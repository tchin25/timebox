export const state = () => ({
  currentTimer: 0,
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
  ],
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
  SET_TIMEBOX_LIST(state, value) {
    state.timeboxList = value;
  }
};

export const actions = {};
