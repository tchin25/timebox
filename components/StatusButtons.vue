<template>
  <div class="mx-auto buttons-wrapper">
    <template v-if="status != statusEnum.STARTED">
      <tooltip-button
        :buttonAttributes="{
          ...sharedButtonAttributes,
          color: 'green',
          alt: 'Start'
        }"
        @click="switchStatus(statusEnum.STARTED)"
      >
        <v-icon>mdi-play</v-icon>
        <template #tooltip>Start timer</template>
      </tooltip-button>
      <tooltip-button
        v-if="status === statusEnum.PAUSED"
        :buttonAttributes="{
          ...sharedButtonAttributes,
          color: 'red',
          alt: 'Stop'
        }"
        @click="switchStatus(statusEnum.STOPPED)"
      >
        <v-icon>mdi-stop</v-icon>
        <template #tooltip>Stop timer</template>
      </tooltip-button>
    </template>
    <template v-else>
      <tooltip-button
        :buttonAttributes="{
          ...sharedButtonAttributes,
          color: 'yellow',
          alt: 'Pause'
        }"
        @click="switchStatus(statusEnum.PAUSED)"
      >
        <v-icon>mdi-pause</v-icon>
        <template #tooltip>Pause timer</template>
      </tooltip-button>
      <tooltip-button
        :buttonAttributes="{
          ...sharedButtonAttributes,
          color: 'red',
          alt: 'Stop'
        }"
        @click="switchStatus(statusEnum.STOPPED)"
      >
        <v-icon>mdi-stop</v-icon>
        <template #tooltip>Stop timer</template>
      </tooltip-button>
    </template>
    <template v-if="isPlaying">
      <tooltip-button
        :buttonAttributes="{
          ...sharedButtonAttributes,
          color: 'red',
          outlined: true,
          alt: 'Stop Alarm'
        }"
        @click="pauseAudio"
      >
        <v-icon>mdi-bell-off-outline</v-icon>
        <template #tooltip>Stop alarm</template>
      </tooltip-button>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { statusEnum } from "../assets/enums";
import TooltipButton from "./TooltipButton";

export default {
  components: { TooltipButton },
  data() {
    return {
      statusEnum,
      sharedButtonAttributes: {
        fab: true,
        dark: true,
        elevation: 2
      }
    };
  },
  methods: {
    switchStatus(status) {
      this.pauseAudio();
      this.status = status;
    },
    pauseAudio() {
      if (this.audioObject && this.isPlaying) {
        this.audioObject.pause();
      }
    }
  },
  computed: {
    status: {
      get() {
        return this.$store.state.timebox.status;
      },
      set(value) {
        this.$store.commit("timebox/SET_STATUS", value);
      }
    },
    ...mapState("alarm", ["audioObject", "useCustomAudio", "isPlaying"])
  }
};
</script>

<style scoped>
.buttons-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
}
</style>
