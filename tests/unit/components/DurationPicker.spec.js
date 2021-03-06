import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

import { mount, createLocalVue } from "@vue/test-utils";
import DurationPicker from "~/components/DurationPicker";

describe("DurationPicker.vue", () => {
  test("Duration properly formatted", () => {
    const wrapper = mount(DurationPicker, {
      propsData: {
        value: 60
      }
    });
    expect(
      wrapper
        .findComponent({ name: "v-menu" })
        .findComponent({ name: "v-text-field" }).vm.lazyValue
    ).toBe("00:01:00");
  });

  test("Change emits input event with duration in seconds", async () => {
    // Need data-app element for Vuetify
    let app = document.createElement("div");
    app.setAttribute("data-app", true);
    document.body.appendChild(app);

    const vuetify = new Vuetify({});
    const localVue = createLocalVue();

    const wrapper = mount(DurationPicker, {
      propsData: {
        value: 60
      },
      data() {
        return { timePicker: true };
      },
      localVue,
      vuetify
    });

    let menu = wrapper.findComponent({ name: "v-time-picker" });
    menu.vm.$emit("input", "00:01:30");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0]).toEqual([90]);
  });
});
