<template>
  <v-menu
    ref="timePickerMenu"
    v-model="timePicker"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="duration"
        label="Duration"
        prepend-icon="mdi-clock-outline"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="timePicker"
      v-model="duration"
      full-width
      format="24hr"
      use-seconds
      @click:second="$refs.timePickerMenu.save(duration)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

export default {
  props: {
    value: {
      default: "00:00:00"
    }
  },
  data() {
    return {
      timePicker: false
    };
  },
  computed: {
    duration: {
      get() {
        return moment
          .duration(this.value, "seconds")
          .format("hh:mm:ss", { trim: false });
      },
      set(value) {
        this.$emit("input", moment.duration(value).asSeconds());
      }
    }
  }
};
</script>

<style></style>
