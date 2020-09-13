<template>
  <v-card class="mx-auto" width="100%">
    <div class="timebox-background" :style="backgroundHeight"></div>
    <div class="handle">
      <v-icon>mdi-drag</v-icon>
    </div>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      {{ remainingTime }}
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        icon
        v-if="!active && editing"
        color="green"
        @click="updateTimebox"
      >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn
        icon
        v-else
        :disabled="active"
        color="blue"
        @click="editing = true"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        icon
        v-if="!active && editing"
        color="red"
        @click="editing = false"
      >
        <v-icon>mdi-undo-variant</v-icon>
      </v-btn>
      <v-btn
        icon
        v-else
        :disabled="active"
        color="red"
        @click="DELETE_TIMEBOX(id)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from "moment";
import statusEnum from "../assets/status";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: {
    id: {
      required: true
    },
    title: {
      required: true,
      default: "Title"
    },
    duration: {
      required: true
    }
  },
  data() {
    return {
      editing: false,
      remainingTime: 0,
      timerInterval: null
    };
  },
  mounted() {
    this.remainingTime = this.duration;
  },
  methods: {
    updateTimebox() {
      this.editing = false;
    },
    ...mapMutations("timebox", ["DELETE_TIMEBOX"]),
    ...mapActions("timebox", ["updateTimebox", "nextTimebox"])
  },
  computed: {
    active() {
      return this.currentTimeboxId === this.id;
    },
    backgroundHeight() {
      if (!this.active) {
        return this.isCompleted ? "height: 100%;" : "height: 0%;";
      }
      return `height: ${(1 - this.remainingTime / this.duration) * 100}%;`;
    },
    isCompleted() {
      if (this.active){
        return null;
      }
      return this.getTimeboxIndexById(this.id) <
        this.getTimeboxIndexById(this.currentTimeboxId)
        ? true
        : false;
    },
    ...mapState("timebox", ["currentTimeboxId", "status"]),
    ...mapGetters("timebox", ["getTimeboxIndexById"])
  },
  watch: {
    active: function(newVal) {
      if (newVal === true) {
        this.editing = false;
      }
    },
    isCompleted: function(newVal) {
      if (this.active) {
        return;
      }
      if (newVal === false) {
        this.remainingTime = this.duration;
      } else {
        this.remainingTime = 0;
      }
    },
    status: function(newVal) {
      if (this.currentTimeboxId !== this.id) {
        return;
      }

      switch (newVal) {
        case statusEnum.START:
          this.timerInterval = setInterval(
            () => (this.remainingTime -= 1),
            1000
          );
          break;
        case statusEnum.PAUSED:
          clearInterval(this.timerInterval);
          break;
        case statusEnum.STOPPED:
          clearInterval(this.timerInterval);
          this.remainingTime = this.duration;
          // Reset timeboxlist method
          break;
      }
    },
    currentTimeboxId: {
      handler: function(newVal) {
        if (newVal !== this.id) {
          return;
        }

        if (this.status === statusEnum.START) {
          this.remainingTime = this.duration;
          this.timerInterval = setInterval(
            () => (this.remainingTime -= 1),
            1000
          );
        }
      },
      immediate: true
    },
    remainingTime: function(newVal) {
      if (newVal <= 0 && this.timerInterval) {
        clearInterval(this.timerInterval);
        this.nextTimebox();
      }
    }
  }
};
</script>

<style>
.handle {
  position: absolute;
  top: 0;
  right: 0;
}

.timebox-background {
  transition: height 1s linear;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0%;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
