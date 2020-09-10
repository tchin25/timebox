<template>
  <div class="d-flex flex-column justify-center align-center">
    <p class="text-h3">
      Simple Timeboxer
    </p>
    <draggable v-model="timeboxList">
      <timebox-card v-for="element in timeboxList" :key="element.id" v-bind="element">
      </timebox-card>
    </draggable>
  </div>
</template>

<script>
import TimeboxCard from "../components/TimeboxCard";
export default {
  components: {
    TimeboxCard
  },
  computed: {
    timeboxList: {
      get() {
        return this.$store.state.timebox.timeboxList;
      },
      set(value) {
        this.$store.commit("timebox/SET_TIMEBOX_LIST", value);
      }
    }
  }
};
</script>
