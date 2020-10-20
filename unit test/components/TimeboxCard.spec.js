import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";

import { state, getters, mutations, actions } from "../../store/timebox";
import { completionEnum, statusEnum } from "~/assets/enums";
import TimeboxCard from "~/components/TimeboxCard";

const generateStore = (customState = {}) => {
  return {
    modules: {
      timebox: {
        namespaced: true,
        state: { ...state(), ...customState },
        getters,
        mutations,
        actions
      }
    }
  };
};

describe("TimeboxCard.vue", () => {
  describe("UI Display", () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store(generateStore());

    const wrapper = shallowMount(TimeboxCard, {
      propsData: {
        id: 0,
        title: "Test Title",
        duration: 60
      },
      localVue,
      store
    });
    test("Header displays prop title", () => {
      expect(wrapper.text()).toContain("Test Title");
    });
    test("Duration displayed in proper formatting", () => {
      expect(wrapper.text()).toContain("01m:00s");
    });
  });

  describe("Methods", () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store(generateStore());

    const wrapper = shallowMount(TimeboxCard, {
      propsData: {
        id: 0,
        title: "Test Title",
        duration: 60
      },
      data: () => ({
        form: {
          title: "Form Title",
          duration: 30
        },
        editing: true
      }),
      localVue,
      store
    });
    test("saveTimebox", () => {
      let updateTimeboxSpy = jest
        .spyOn(wrapper.vm, "updateTimebox")
        .mockImplementation(() => {});
      wrapper.vm.saveTimebox();
      expect(updateTimeboxSpy).toHaveBeenCalled();
    });
    test("resetForm", () => {
      wrapper.vm.$refs.form.reset = jest.fn();
      wrapper.vm.resetForm();
      expect(wrapper.vm.$refs.form.reset).toHaveBeenCalled();
    });
  });

  describe("Status and Completion", () => {
    let localVue;
    let timeboxList = [{ id: 0 }, { id: 1 }, { id: 2 }];

    beforeEach(() => {
      localVue = createLocalVue();
      localVue.use(Vuex);
    });

    const generateWrapper = (
      status,
      currentTimeboxId,
      propsData = {},
      stateData = {}
    ) => {
      const store = new Vuex.Store(
        generateStore({
          status: status,
          currentTimeboxId,
          timeboxList,
          remainingTime: 0,
          ...stateData
        })
      );
      return shallowMount(TimeboxCard, {
        propsData: {
          id: 0,
          title: "Test Title",
          duration: 60,
          ...propsData
        },
        localVue,
        store
      });
    };

    let wrapper;
    describe("Timebox List Status STARTED", () => {
      describe("Timebox Status COMPLETED", () => {
        beforeEach(() => {
          wrapper = generateWrapper(statusEnum.STARTED, 1, { id: 0 });
        });

        test("Timebox isn't active", () => {
          expect(wrapper.vm.isActive).toBe(false);
          expect(wrapper.vm.isCompleted).toBe(completionEnum.COMPLETED);
          expect(wrapper.vm.timerInterval).toBe(null);
        });

        test("Timebox displayed as finished", () => {
          expect(wrapper.vm.backgroundHeight).toBe("height: 100%;");
          expect(wrapper.vm.formattedRemainingTime).toBe("00");
        });
      });

      describe("Timebox Status IN PROGRESS", () => {
        beforeEach(() => {
          wrapper = generateWrapper(statusEnum.STARTED, 0, { id: 0 });
        });

        test("Timebox is active", () => {
          expect(wrapper.vm.isActive).toBe(true);
          expect(wrapper.vm.isCompleted).toBe(completionEnum.IN_PROGRESS);
          expect(wrapper.vm.timerInterval).not.toBe(null);
        });

        test("Timebox displays as in progress", () => {
          expect(wrapper.vm.backgroundHeight).toBe("height: 0%;");
          expect(wrapper.vm.formattedRemainingTime).toBe("01:00");
          wrapper.vm.SET_REMAINING_TIME(30);
          expect(wrapper.vm.backgroundHeight).toBe("height: 50%;");
          expect(wrapper.vm.formattedRemainingTime).toBe("30");
        });
      });

      describe("Timebox Status NOT COMPLETED", () => {
        beforeEach(() => {
          wrapper = generateWrapper(statusEnum.STARTED, 1, { id: 2 });
        });

        test("Timebox isn't active", () => {
          expect(wrapper.vm.isActive).toBe(false);
          expect(wrapper.vm.isCompleted).toBe(completionEnum.NOT_COMPLETED);
          expect(wrapper.vm.timerInterval).toBe(null);
        });

        test("Timebox displayed as not finished", () => {
          expect(wrapper.vm.backgroundHeight).toBe("height: 0%;");
          expect(wrapper.vm.formattedRemainingTime).toBe("01:00");
        });
      });
    });

    describe("Timebox List Status PAUSED", () => {
      describe("Timebox Status COMPLETED", () => {
        beforeEach(() => {
          wrapper = generateWrapper(statusEnum.PAUSED, 1, { id: 0 });
        });

        test("Timebox isn't active", () => {
          expect(wrapper.vm.isActive).toBe(false);
          expect(wrapper.vm.isCompleted).toBe(completionEnum.COMPLETED);
          expect(wrapper.vm.timerInterval).toBe(null);
        });

        test("Timebox displayed as finished", () => {
          expect(wrapper.vm.backgroundHeight).toBe("height: 100%;");
          expect(wrapper.vm.formattedRemainingTime).toBe("00");
        });
      });

      describe("Timebox Status IN PROGRESS", () => {
        beforeEach(() => {
          wrapper = generateWrapper(statusEnum.PAUSED, 0, { id: 0 });
        });

        test("Timebox is active", () => {
          expect(wrapper.vm.isActive).toBe(true);
          expect(wrapper.vm.isCompleted).toBe(completionEnum.IN_PROGRESS);
        });

        test("Timebox is not ticking", () => {
          expect(wrapper.vm.timerInterval).toBe(null);
        });

        test("Timebox displays as in progress", () => {
          expect(wrapper.vm.backgroundHeight).toBe("height: 0%;");
          expect(wrapper.vm.formattedRemainingTime).toBe("01:00");
          wrapper.vm.SET_REMAINING_TIME(30);
          expect(wrapper.vm.backgroundHeight).toBe("height: 50%;");
          expect(wrapper.vm.formattedRemainingTime).toBe("30");
        });

        test("Timebox displays as in progress when loading remaining time from cache", () => {
          wrapper = generateWrapper(
            statusEnum.PAUSED,
            0,
            { id: 0 },
            { remainingTime: 30 }
          );
          expect(wrapper.vm.backgroundHeight).toBe("height: 50%;");
          expect(wrapper.vm.formattedRemainingTime).toBe("30");
        });
      });

      describe("Timebox Status NOT COMPLETED", () => {
        beforeEach(() => {
          wrapper = generateWrapper(statusEnum.PAUSED, 1, { id: 2 });
        });

        test("Timebox isn't active", () => {
          expect(wrapper.vm.isActive).toBe(false);
          expect(wrapper.vm.isCompleted).toBe(completionEnum.NOT_COMPLETED);
          expect(wrapper.vm.timerInterval).toBe(null);
        });

        test("Timebox displayed as not finished", () => {
          expect(wrapper.vm.backgroundHeight).toBe("height: 0%;");
          expect(wrapper.vm.formattedRemainingTime).toBe("01:00");
        });
      });
    });

    describe("Timebox List Status FINISHED", () => {
      describe("Timebox Status COMPLETED", () => {
        beforeEach(() => {
          wrapper = generateWrapper(statusEnum.FINISHED, -2, { id: 0 });
        });

        test("Timebox isn't active", () => {
          expect(wrapper.vm.isActive).toBe(false);
          expect(wrapper.vm.isCompleted).toBe(completionEnum.COMPLETED);
          expect(wrapper.vm.timerInterval).toBe(null);
        });

        test("Timebox displayed as finished", () => {
          expect(wrapper.vm.backgroundHeight).toBe("height: 100%;");
          expect(wrapper.vm.formattedRemainingTime).toBe("00");
        });
      });

      test("Every timebox should be marked as completed regardless of state", () => {
        wrapper = generateWrapper(statusEnum.FINISHED, 0, { id: 0 });
        expect(wrapper.vm.isCompleted).toBe(completionEnum.COMPLETED);
        expect(wrapper.vm.timerInterval).toBe(null);
        wrapper = generateWrapper(statusEnum.FINISHED, 0, { id: 1 });
        expect(wrapper.vm.isCompleted).toBe(completionEnum.COMPLETED);
        expect(wrapper.vm.timerInterval).toBe(null);
        wrapper = generateWrapper(statusEnum.FINISHED, 1, { id: 0 });
        expect(wrapper.vm.isCompleted).toBe(completionEnum.COMPLETED);
        expect(wrapper.vm.timerInterval).toBe(null);
      });
    });
  });
});
