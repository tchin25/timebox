import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { mutations, actions } from "../../store/alarm";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("alarm/mutations", () => {
  const state = {
    mute: false,
    audioObject: null,
    useCustomAudio: false,
    customAudioName: null,
    isPlaying: false
  };
  describe("SET_MUTE", () => {
    test("Sets mute variable correctly", () => {
      mutations.SET_MUTE(state, true);
      expect(state.mute).toBe(true);
      mutations.SET_MUTE(state, false);
      expect(state.mute).toBe(false);
      mutations.SET_MUTE(state);
      expect(state.mute).toBe(false);
    });
  });
  describe("SET_USE_CUSTOM_AUDIO", () => {
    test("Sets useCustomAudio variable correctly", () => {
      mutations.SET_USE_CUSTOM_AUDIO(state, true);
      expect(state.useCustomAudio).toBe(true);
      mutations.SET_USE_CUSTOM_AUDIO(state, false);
      expect(state.useCustomAudio).toBe(false);
      mutations.SET_USE_CUSTOM_AUDIO(state);
      expect(state.useCustomAudio).toBe(false);
    });
  });
  describe("SET_ALARM_AUDIO", () => {
    test("Sets audioObject variable correctly", () => {
      mutations.SET_ALARM_AUDIO(state, null);
      expect(state.audioObject).toBeDefined();
    });
  });
  describe("SET_CUSTOM_AUDIO_NAME", () => {
    test("Sets customAudioName variable correctly", () => {
      mutations.SET_CUSTOM_AUDIO_NAME(state, "name");
      expect(state.customAudioName).toBe("name");
    });
  });
  describe("SET_IS_PLAYING", () => {
    test("Sets isPlaying variable correctly", () => {
      mutations.SET_IS_PLAYING(state, true);
      expect(state.isPlaying).toBe(true);
      mutations.SET_IS_PLAYING(state, false);
      expect(state.isPlaying).toBe(false);
      mutations.SET_IS_PLAYING(state);
      expect(state.isPlaying).toBe(false);
    });
  });
});
describe("alarm/actions", () => {
  describe("setAlarmAudio", () => {
    const state = {
      audioObject: null
    };
    const commit = jest
      .fn()
      .mockImplementationOnce(
        (commit, dataURL) => (state.audioObject = new Audio(dataURL))
      );

    let audioOnPlaySpy;
    let audioOnPauseSpy;
    let audioOnEndSpy;

    test("Sets audioObject and its event listeners", () => {
      actions.setAlarmAudio({ state, commit });
      expect(commit.mock.calls[0][0]).toBe("SET_ALARM_AUDIO");
      expect(state.audioObject).toBeDefined();
      expect(state.audioObject.onplay).toBeDefined();
      expect(state.audioObject.onpause).toBeDefined();
      expect(state.audioObject.onended).toBeDefined();
      audioOnPlaySpy = jest.spyOn(state.audioObject, "onplay");
      audioOnPauseSpy = jest.spyOn(state.audioObject, "onpause");
      audioOnEndSpy = jest.spyOn(state.audioObject, "onended");
    });

    test("onplay event commits correct value", () => {
      state.audioObject.onplay();
      expect(audioOnPlaySpy).toHaveBeenCalled();
      expect(commit.mock.calls[1][0]).toBe("SET_IS_PLAYING");
      expect(commit.mock.calls[1][1]).toBe(true);
    });
    test("onpause event commits correct value", () => {
      state.audioObject.onpause();
      expect(audioOnPauseSpy).toHaveBeenCalled();
      expect(commit.mock.calls[2][0]).toBe("SET_IS_PLAYING");
      expect(commit.mock.calls[2][1]).toBe(false);
    });
    test("onended event commits correct value", () => {
      state.audioObject.onended();
      expect(audioOnEndSpy).toHaveBeenCalled();
      expect(commit.mock.calls[3][0]).toBe("SET_IS_PLAYING");
      expect(commit.mock.calls[3][1]).toBe(false);
    });
  });
  describe("playSound", () => {
    const state = {
      mute: false,
      audioObject: null,
      useCustomAudio: false,
      customAudioName: null,
      isPlaying: false
    };
    const audioPlaySpy = jest
      .spyOn(Audio.prototype, "play")
      .mockImplementation(() => {});

    afterEach(() => {
      audioPlaySpy.mockClear();
    });

    test("Plays default audio", () => {
      actions.playSound({ state });
      expect(audioPlaySpy).toHaveBeenCalled();
    });

    test("Plays custom audio", () => {
      state.audioObject = new Audio();
      state.useCustomAudio = true;
      actions.playSound({ state });
      expect(audioPlaySpy).toHaveBeenCalled();
    });

    test("If custom audio is already playing, resets it", () => {
      state.audioObject = new Audio();
      state.useCustomAudio = true;
      state.audioObject.active = true;
      state.audioObject.currentTime = 1;
      let audioPauseSpy = jest
        .spyOn(state.audioObject, "pause")
        .mockImplementation(() => {});
      actions.playSound({ state });
      expect(state.audioObject.currentTime).toBe(0);
      expect(audioPauseSpy).toHaveBeenCalled();
      expect(audioPlaySpy).toHaveBeenCalled();
    });

    test("Does nothing when muted", () => {
      state.mute = true;
      actions.playSound({ state });
      expect(audioPlaySpy).not.toHaveBeenCalled();
    });
  });
});
