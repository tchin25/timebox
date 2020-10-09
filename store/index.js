import { statusEnum } from "../assets/enums";

export const actions = {
  resetState({ commit }) {
    commit("timebox/RESET_STATE", defaultState().timebox);
    commit("savedTimeboxes/RESET_STATE", defaultState().savedTimeboxes);
    commit("alarm/RESET_STATE", defaultState().alarm);
  }
};

/* istanbul ignore next */
export const defaultState = () => ({
  alarm: {
    mute: false,
    audioObject: null,
    useCustomAudio: false,
    customAudioName: null,
    isPlaying: false
  },
  timebox: {
    currentTimeboxId: -1,
    status: statusEnum.STOPPED,
    repeat: true,
    remainingTime: 0,
    timeboxList: [],
    toAddId: 0 // Increment every time a timebox is added to prevent id collision
  },
  savedTimeboxes: {
    currentTimeboxListName: "",
    savedTimeboxLists: [
      {
        name: "Pomodoro",
        timeboxList: [
          {
            id: 0,
            title: "Work",
            duration: 1500
          },
          {
            id: 1,
            title: "Rest",
            duration: 300
          }
        ]
      },
      {
        name: "Yoga MIA",
        timeboxList: [
          {
            id: 0,
            title: "Immersion",
            duration: 300
          },
          {
            id: 1,
            title: "SRS",
            duration: 300
          }
        ]
      }
    ]
  }
});
