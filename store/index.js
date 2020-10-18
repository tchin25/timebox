import { statusEnum } from "../assets/enums";

// Hardcode database version so we can check vuex-persist if they are using an old version
const DATABASE_VERSION = "1.0.0";
export const state = () => ({
  databaseVersion: DATABASE_VERSION
});

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
    audioData: null,
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
    toAddId: 4 // Increment every time a timebox is added to prevent id collision
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
        name: "Immersion/SRS Timebox",
        timeboxList: [
          {
            id: 2,
            title: "Immersion",
            duration: 300
          },
          {
            id: 3,
            title: "SRS",
            duration: 300
          }
        ]
      }
    ]
  }
});
