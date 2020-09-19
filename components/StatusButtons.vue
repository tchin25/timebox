<template>
  <v-card class="mx-auto" flat max-width="100%">
    <div v-if="status != statusEnum.STARTED">
      <v-btn block depressed color="green" @click="status = statusEnum.STARTED">
        <span>Start</span>
        <v-icon right>mdi-play</v-icon>
      </v-btn>
    </div>
    <div v-else>
      <v-row no-gutters>
        <v-col>
          <v-btn
            class="button-left"
            block
            outlined
            @click="status = statusEnum.PAUSED"
          >
            <span>Pause</span>
            <v-icon right>mdi-pause</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            class="button-right"
            block
            depressed
            color="red"
            @click="status = statusEnum.STOPPED"
          >
            <span>Stop</span>
            <v-icon right>mdi-stop</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import { statusEnum } from "../assets/enums";

export default {
  data() {
    return {
      statusEnum
    };
  },
  methods: {},
  computed: {
    status: {
      get() {
        return this.$store.state.timebox.status;
      },
      set(value) {
        this.$store.commit("timebox/SET_STATUS", value);
      }
    }
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
