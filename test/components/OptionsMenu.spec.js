import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

import Vuex from "vuex";
Vue.use(Vuex);

import { mount } from "@vue/test-utils";
import OptionsMenu from "~/components/OptionsMenu";
import { statusEnum } from "~/assets/enums";

describe("OptionsMenu.vue", () => {
  let store;
  beforeEach(() => {
    store = {
      modules: {
        timebox: {
          namespaced: true,
          state: {
            status: statusEnum.STOPPED,
            repeat: false
          },
          mutations: {
            SET_REPEAT: jest.fn()
          }
        },
        alarm: {
          namespaced: true,
          state: {
            audioObject: new Audio(),
            isPlaying: false,
            mute: false,
            useCustomAudio: false
          },
          mutations: {
            SET_MUTE: jest.fn(),
            SET_USE_CUSTOM_AUDIO: jest.fn()
          }
        }
      }
    };
  });

  test("Stop Alarm button displays when custom audio is playing", () => {
    let wrapper = mount(OptionsMenu, {
      store: new Vuex.Store(store)
    });
    expect(wrapper.text()).not.toContain("Stop Alarm");

    store.modules.alarm.state = {
      audioObject: new Audio(),
      isPlaying: true,
      mute: false,
      useCustomAudio: true
    };
    wrapper = mount(OptionsMenu, {
      store: new Vuex.Store(store)
    });

    expect(wrapper.text()).toContain("Stop Alarm");
  });

  test("Computed properties call correct mutations", () => {
    let wrapper = mount(OptionsMenu, {
      store: new Vuex.Store(store)
    });
    wrapper.vm.repeat = true;
    wrapper.vm.mute = true;
    wrapper.vm.useCustomAudio = true;

    expect(store.modules.timebox.mutations.SET_REPEAT).toHaveBeenCalled();
    expect(store.modules.alarm.mutations.SET_MUTE).toHaveBeenCalled();
    expect(
      store.modules.alarm.mutations.SET_USE_CUSTOM_AUDIO
    ).toHaveBeenCalled();
  });
});
