<template>
  <v-card
    class="mx-auto"
    :flat="isCompleted == completionEnum.COMPLETED"
    width="100%"
  >
    <div class="timebox-background" :style="backgroundHeight"></div>
    <div class="handle">
      <v-icon>mdi-drag</v-icon>
    </div>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <div v-if="!editing">
        <span class="text-h4">{{ formattedRemainingTime }}</span>
        <span class="text-h6">/{{ formattedDuration }}</span>
      </div>
      <div v-else>
        <duration-picker v-model="form.duration"></duration-picker>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        icon
        v-if="!isActive && editing"
        color="green"
        @click="saveTimebox"
      >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn
        icon
        v-else
        :disabled="isActive"
        color="blue"
        @click="editing = true"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        icon
        v-if="!isActive && editing"
        color="red"
        @click="editing = false"
      >
        <v-icon>mdi-undo-variant</v-icon>
      </v-btn>
      <v-btn
        icon
        v-else
        :disabled="isActive"
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
import momentDurationFormatSetup from "moment-duration-format";
import { statusEnum, completionEnum } from "../assets/enums";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import DurationPicker from "./DurationPicker";

export default {
  name: "timebox-card",
  components: {
    DurationPicker
  },
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
      timerInterval: null,
      form: {
        title: this.title,
        duration: this.duration
      },
      completionEnum
    };
  },
  mounted() {
    this.remainingTime = this.duration;
  },
  methods: {
    saveTimebox() {
      let timebox = {
        id: this.id,
        ...this.form
      };
      this.updateTimebox(timebox);
      if (this.isCompleted === completionEnum.NOT_COMPLETED) {
        this.remainingTime = this.form.duration;
      }
      this.editing = false;
    },
    ...mapMutations("timebox", ["DELETE_TIMEBOX"]),
    ...mapActions("timebox", ["updateTimebox", "nextTimebox"])
  },
  computed: {
    isActive() {
      return this.currentTimeboxId === this.id;
    },
    backgroundHeight() {
      switch (this.isCompleted) {
        case completionEnum.COMPLETED:
          return "height: 100%;";
          break;
        case completionEnum.NOT_COMPLETED:
          return "height: 0%;";
          break;
        case completionEnum.IN_PROGRESS:
          return `height: ${(1 - this.remainingTime / this.duration) * 100}%;`;
          break;
        default:
          return "height: 0%;";
      }
    },
    isCompleted() {
      if (this.status === statusEnum.FINISHED) {
        return completionEnum.COMPLETED;
      }
      if (this.timerInterval) {
        return completionEnum.IN_PROGRESS;
      }
      return this.getTimeboxIndexById(this.id) <
        this.getTimeboxIndexById(this.currentTimeboxId)
        ? completionEnum.COMPLETED
        : completionEnum.NOT_COMPLETED;
    },
    formattedRemainingTime() {
      return moment
        .duration(this.remainingTime, "seconds")
        .format("hh:mm:ss", { trim: "large mid" });
    },
    formattedDuration() {
      return moment
        .duration(this.duration, "seconds")
        .format("hh[h]:mm[m]:ss[s]", { trim: "large mid" });
    },
    ...mapState("timebox", ["currentTimeboxId", "status"]),
    ...mapGetters("timebox", ["getTimeboxIndexById"])
  },
  watch: {
    isActive: function(newVal) {
      if (newVal === true) {
        this.editing = false;
      }
    },
    isCompleted: function(newVal) {
      if (this.isActive) {
        return;
      }
      if (newVal === completionEnum.NOT_COMPLETED) {
        this.remainingTime = this.duration;
      } else {
        this.remainingTime = 0;
      }
    },
    status: function(newVal) {
      if (!this.isActive) {
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
        this.timerInterval = null;
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
