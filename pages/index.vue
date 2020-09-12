<template>
  <div class="d-flex flex-column justify-center align-center">
    <p class="text-h3">
      Simple Timeboxer
    </p>
    <div style="position: relative; width: 344px;">
      <draggable
        v-model="timeboxList"
        animation="500"
        ghost-class="ghost"
        handle=".handle"
        filter=".ignore"
      >
        <transition-group type="transition" name="timeboxList">
          <timebox-card
            class="ma-2 timeboxList-item"
            v-for="element in timeboxList"
            :key="element.id"
            v-bind="element"
          >
          </timebox-card>
          <add-timebox-card key="footer" class="timeboxList-item"></add-timebox-card>
        </transition-group>
              
      </draggable>

    </div>
  </div>
</template>

<script>
import TimeboxCard from "../components/TimeboxCard";
import AddTimeboxCard from "../components/AddTimeboxCard";
export default {
  components: {
    TimeboxCard,
    AddTimeboxCard
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
