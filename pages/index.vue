<template>
  <div class="d-flex flex-column justify-center align-center">
    <client-only placeholder="Loading...">
      <p class="text-h3" v-if="!currentTimeboxListName">
        Simple Timeboxer
      </p>
      <div v-if="!$vuetify.breakpoint.mdAndUp">
        Sorry! This app doesn't work on mobile.
      </div>
      <div v-else>
        <side-bar></side-bar>
        <options-menu></options-menu>
        <div v-if="!currentTimeboxListName">
          Select or create a new timebox to get started
        </div>

        <div v-else style="position: relative; width: 344px;">
          <status-buttons class="status-buttons"></status-buttons>
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
                name: 'timeboxList',
                appear: true
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
    </client-only>
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
        this.$store.commit("savedTimeboxes/UPDATE_TIMEBOX_LIST", {
          name: this.$store.state.savedTimeboxes.currentTimeboxListName,
          timeboxList: value
        });
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

/* .timeboxList-move {
  transition: all 0.5s !important;
} */
.timeboxList-enter,
.timeboxList-leave-to {
  opacity: 0 !important;
}

.timeboxList-enter-active,
.timeboxList-leave-active {
  transition: opacity 0.3s ease !important;
}

.timeboxList-leave-active {
  position: absolute !important;
}

.status-buttons {
  position: absolute;
  top: 0;
  right: -70px;
}
</style>
