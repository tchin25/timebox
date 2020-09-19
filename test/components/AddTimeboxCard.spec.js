import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

import Vuex from "vuex";
Vue.use(Vuex);

import { mount } from "@vue/test-utils";
import AddTimeboxCard from "~/components/AddTimeboxCard";

let ADD_TIMEBOX = jest.fn();
const store = new Vuex.Store({
  modules: {
    timebox: {
      namespaced: true,
      mutations: {
        ADD_TIMEBOX
      }
    }
  }
});

describe("AddTimeboxCard.vue", () => {
  test("Form does not submit invalid input", () => {
    const wrapper = mount(AddTimeboxCard, {
      data() {
        return {
          form: {
            title: "",
            duration: "00:00:00"
          }
        };
      },
      store
    });
    const submitButton = wrapper.get("button[type=submit]");
    expect(submitButton.exists()).toBe(true);
    submitButton.trigger("submit");
    expect(ADD_TIMEBOX.mock.calls.length).toBe(0);
  });
  test("Form submits valid input", () => {
    const wrapper = mount(AddTimeboxCard, {
      data() {
        return {
          form: {
            title: "",
            duration: "01:00:00"
          }
        };
      },
      store
    });
    const submitButton = wrapper.get("button[type=submit]");
    expect(submitButton.exists()).toBe(true);
    submitButton.trigger("submit");
    expect(ADD_TIMEBOX.mock.calls.length).toBe(1);
  });
});
