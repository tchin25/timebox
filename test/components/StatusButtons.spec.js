import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

import Vuex from "vuex";
Vue.use(Vuex);

import { mount } from "@vue/test-utils";
import StatusButtons from "~/components/StatusButtons";
import { statusEnum } from "~/assets/enums";

describe("StatusButtons.vue", () => {
  let store;
  beforeEach(() => {
    store = {
      modules: {
        timebox: {
          namespaced: true,
          state: {
            status: statusEnum.STOPPED
          },
          mutations: {
            SET_STATUS: () => {}
          }
        },
        alarm: {
          namespaced: true,
          state: {
            audioObject: new Audio()
          }
        }
      }
    };
  });
  test("Start button shows when status is STOPPED", () => {
    const wrapper = mount(StatusButtons, {
      store: new Vuex.Store(store)
    });
    expect(wrapper.text()).toContain("Start");
  });
  test("Start button shows when status is FINISHED", () => {
    store.modules.timebox.state.status = statusEnum.FINISHED;
    const wrapper = mount(StatusButtons, {
      store: new Vuex.Store(store)
    });
    expect(wrapper.text()).toContain("Start");
  });
  test("Start and Stop button shows when status is PAUSED", () => {
    store.modules.timebox.state.status = statusEnum.PAUSED;
    const wrapper = mount(StatusButtons, {
      store: new Vuex.Store(store)
    });
    expect(wrapper.text()).toContain("Start");
    expect(wrapper.text()).toContain("Stop");
  });
  test("Pause and Stop button shows when status is STARTED", () => {
    store.modules.timebox.state.status = statusEnum.STARTED;
    const wrapper = mount(StatusButtons, {
      store: new Vuex.Store(store)
    });
    expect(wrapper.text()).toContain("Pause");
    expect(wrapper.text()).toContain("Stop");
  });

  test("stopTimebox() Method", () => {
    store.modules.timebox.state.status = statusEnum.STARTED;
    let setStatusSpy = jest
      .spyOn(store.modules.timebox.mutations, "SET_STATUS");
    let audioPauseSpy = jest
      .spyOn(Audio.prototype, "pause")
      .mockImplementation(() => {});
    let wrapper = mount(StatusButtons, {
      store: new Vuex.Store(store)
    });
    wrapper.vm.stopTimebox();
    expect(setStatusSpy).toHaveBeenCalled();
    expect(audioPauseSpy).toHaveBeenCalled();

    jest.clearAllMocks();

    store.modules.alarm.state.audioObject = null;
    wrapper = mount(StatusButtons, {
      store: new Vuex.Store(store)
    });
    wrapper.vm.stopTimebox();
    expect(setStatusSpy).toHaveBeenCalled();
    expect(audioPauseSpy).not.toHaveBeenCalled();
  });
});
