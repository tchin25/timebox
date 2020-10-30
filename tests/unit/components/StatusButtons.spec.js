import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

import Vuex from "vuex";
Vue.use(Vuex);

import { mount } from "@vue/test-utils";
import StatusButtons from "~/components/StatusButtons";
import TooltipButton from "~/components/TooltipButton";
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
    let buttons = wrapper.findAllComponents(TooltipButton);
    expect(buttons.length).toBe(1);
    expect(buttons.at(0).props().buttonAttributes.alt).toBe("Start");
  });
  test("Start button shows when status is FINISHED", () => {
    store.modules.timebox.state.status = statusEnum.FINISHED;
    const wrapper = mount(StatusButtons, {
      store: new Vuex.Store(store)
    });
    let buttons = wrapper.findAllComponents(TooltipButton);
    expect(buttons.length).toBe(1);
    expect(buttons.at(0).props().buttonAttributes.alt).toBe("Start");
  });
  test("Start and Stop button shows when status is PAUSED", () => {
    store.modules.timebox.state.status = statusEnum.PAUSED;
    const wrapper = mount(StatusButtons, {
      store: new Vuex.Store(store)
    });
    let buttons = wrapper.findAllComponents(TooltipButton);
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).props().buttonAttributes.alt).toBe("Start");
    expect(buttons.at(1).props().buttonAttributes.alt).toBe("Stop");
  });
  test("Pause and Stop button shows when status is STARTED", () => {
    store.modules.timebox.state.status = statusEnum.STARTED;
    const wrapper = mount(StatusButtons, {
      store: new Vuex.Store(store)
    });
    let buttons = wrapper.findAllComponents(TooltipButton);
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).props().buttonAttributes.alt).toBe("Pause");
    expect(buttons.at(1).props().buttonAttributes.alt).toBe("Stop");
  });

  test("Stop alarm button is shown when useCustomAudio and isPlaying is true", () => {
    store.modules.timebox.state.status = statusEnum.STARTED;
    store.modules.alarm.state.useCustomAudio = true;
    store.modules.alarm.state.isPlaying = true;
    const wrapper = mount(StatusButtons, {
      store: new Vuex.Store(store)
    });
    let buttons = wrapper.findAllComponents(TooltipButton);
    expect(buttons.at(buttons.length - 1).props().buttonAttributes.alt).toBe(
      "Stop Alarm"
    );
  });

  test("switchStatus() Method", () => {
    store.modules.timebox.state.status = statusEnum.STARTED;
    store.modules.alarm.state.isPlaying = true;
    let setStatusSpy = jest.spyOn(
      store.modules.timebox.mutations,
      "SET_STATUS"
    );
    let audioPauseSpy = jest
      .spyOn(Audio.prototype, "pause")
      .mockImplementation(() => {});
    jest.spyOn(Audio.prototype, "currentSrc", "get").mockReturnValue(true);
    let wrapper = mount(StatusButtons, {
      store: new Vuex.Store(store)
    });
    wrapper.vm.switchStatus();
    expect(setStatusSpy).toHaveBeenCalled();
    expect(audioPauseSpy).toHaveBeenCalled();

    jest.clearAllMocks();

    store.modules.alarm.state.audioObject = null;
    wrapper = mount(StatusButtons, {
      store: new Vuex.Store(store)
    });
    wrapper.vm.switchStatus();
    expect(setStatusSpy).toHaveBeenCalled();
    expect(audioPauseSpy).not.toHaveBeenCalled();
  });
});
