import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

import Vuex from "vuex";
Vue.use(Vuex);

import { mount } from "@vue/test-utils";
import AlarmAudioInput from "~/components/AlarmAudioInput";

let SET_CUSTOM_AUDIO_NAME = jest.fn();
let setAlarmAudio = jest.fn();
const store = new Vuex.Store({
  modules: {
    alarm: {
      namespaced: true,
      mutations: {
        SET_CUSTOM_AUDIO_NAME
      },
      actions: {
        setAlarmAudio
      }
    }
  }
});

describe("AlarmAudioInput.vue", () => {
  test("readFile method", () => {
    const wrapper = mount(AlarmAudioInput, {
      store
    });

    const fileReaderSpy = jest
      .spyOn(FileReader.prototype, "readAsDataURL")
      .mockImplementation(function() {
        this.onload({ target: { result: "" } });
      });
    wrapper.vm.readFile({size: 5000000});
    expect(fileReaderSpy).not.toHaveBeenCalled();

    wrapper.vm.readFile({});
    expect(fileReaderSpy).toHaveBeenCalled();
    expect(setAlarmAudio).toHaveBeenCalled();
    expect(SET_CUSTOM_AUDIO_NAME).toHaveBeenLastCalledWith({}, undefined);
    wrapper.vm.readFile({name: "X"});
    expect(SET_CUSTOM_AUDIO_NAME).toHaveBeenLastCalledWith({}, "X");
  });
});
