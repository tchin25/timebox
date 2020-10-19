<template>
  <v-card class="mx-auto" flat max-width="100%">
    <div v-if="status != statusEnum.STARTED">
      <tooltip-button
        :buttonAttributes="{ fab: true, dark: true, color: 'green' }"
        @click="status = statusEnum.STARTED"
      >
        <v-icon>mdi-play</v-icon>
        <template #tooltip>Start timer</template>
      </tooltip-button>
      <tooltip-button
        v-if="status === statusEnum.PAUSED"
        :buttonAttributes="{ fab: true, dark: true, color: 'red' }"
        @click="stopTimebox"
      >
        <v-icon>mdi-stop</v-icon>
        <template #tooltip>Stop timer</template>
      </tooltip-button>
    </div>
    <div v-else>
      <tooltip-button
        :buttonAttributes="{ fab: true, dark: true, color: 'yellow' }"
        @click="status = statusEnum.PAUSED"
      >
        <v-icon>mdi-pause</v-icon>
        <template #tooltip>Pause timer</template>
      </tooltip-button>
      <tooltip-button
        :buttonAttributes="{ fab: true, dark: true, color: 'red' }"
        @click="stopTimebox"
      >
        <v-icon>mdi-stop</v-icon>
        <template #tooltip>Stop timer</template>
      </tooltip-button>
    </div>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { statusEnum } from "../assets/enums";
import TooltipButton from "./TooltipButton";

export default {
  components: { TooltipButton },
  data() {
    return {
      statusEnum
    };
  },
  methods: {
    stopTimebox() {
      this.status = statusEnum.STOPPED;
      if (!!this.audioObject.currentSrc) {
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
    ...mapState("alarm", ["audioObject"])
  }
};
</script>

<style scoped>
.button-left {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.button-right {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
