<template>
  <div class="d-flex flex-column justify-center align-center">
    <p class="text-h3">
      Simple Timeboxer
    </p>
    <div v-if="!$vuetify.breakpoint.mobile">
      Sorry! This app doesn't work on mobile.
    </div>
    <div v-else>
      <side-bar></side-bar>
      <options-menu></options-menu>
      <div v-if="!currentTimeboxListName">
        Select or create a new timebox to get started
      </div>

      <div v-else style="position: relative; width: 344px;">
        <status-buttons class="ma-2"></status-buttons>
        <draggable
          v-model="timeboxList"
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
  </div>
</template>

<script>
import StatusButtons from "../components/StatusButtons";
import TimeboxCard from "../components/TimeboxCard";
import AddTimeboxCard from "../components/AddTimeboxCard";
import SideBar from "../components/SideBar";
import OptionsMenu from "../components/OptionsMenu";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    StatusButtons,
    TimeboxCard,
    AddTimeboxCard,
    SideBar,
    OptionsMenu
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
    ...mapState("savedTimeboxes", ["currentTimeboxListName"])
  }
};
</script>
<style>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.timeboxList-move {
  transition: all 0.5s !important;
}
.timeboxList-enter,
.timeboxList-leave-to {
  opacity: 0 !important;
}

.timeboxList-leave-active {
  position: absolute !important;
}
</style>
