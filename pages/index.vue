<template>
  <div class="d-flex flex-column justify-center align-center">
    <p class="text-h3">
      Simple Timeboxer
    </p>
    <div style="position: relative; width: 344px;">
      <status-buttons class="ma-2"></status-buttons>
      <draggable
        v-model="timeboxList"
        :move="onMoveCallback"
        animation="500"
        ghost-class="ghost"
        draggable=".timeboxList-item"
        handle=".handle"
        filter=".ignore"
        tag="transition-group"
        :componentData="{
          props: {
            type: 'transition',
            name: 'timeboxList'
          }
        }"
      >
        <timebox-card
          class="ma-2 timeboxList-item"
          v-for="element in timeboxList"
          :key="element.id"
          v-bind="element"
        >
        </timebox-card>

        <add-timebox-card key="footer" slot="footer"></add-timebox-card>
      </draggable>
    </div>
  </div>
</template>

<script>
import StatusButtons from "../components/StatusButtons";
import TimeboxCard from "../components/TimeboxCard";
import AddTimeboxCard from "../components/AddTimeboxCard";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    StatusButtons,
    TimeboxCard,
    AddTimeboxCard
  },
  methods: {
    onMoveCallback(evt, originalEvent) {
      console.log(evt);
      // return false; — for cancel
    },
    ...mapMutations("timebox", ["SET_REPEAT"])
  },
  computed: {
    timeboxList: {
      get() {
        return this.$store.state.timebox.timeboxList;
      },
      set(value) {
        this.$store.commit("timebox/SET_TIMEBOX_LIST", value);
      }
    },
    ...mapState("timebox", ["repeat"])
  }
};
</script>
<style>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.timeboxList-item {
  transition: all 0.75s;
}

.timeboxList-move {
  transition: all 0.5s;
}
.timeboxList-enter,
.timeboxList-leave-to {
  opacity: 0;
}
.timeboxList-leave-active {
  position: absolute;
}
</style>
