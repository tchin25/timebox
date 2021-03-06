<template>
  <v-card
    class="mx-auto"
    :flat="
      isCompleted == completionEnum.COMPLETED && status !== statusEnum.STOPPED
    "
    width="100%"
  >
    <div class="timebox-background" :style="backgroundHeight"></div>
    <div class="handle">
      <v-tooltip :disabled="isDragging" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"
            @mousedown="isDragging = true"
            @mouseleave="isDragging = false"
          >
            mdi-drag</v-icon
          >
        </template>
        <span>Drag to reorder</span>
      </v-tooltip>
    </div>
    <v-form ref="form" @submit.prevent="saveTimebox" lazy-validation>
      <v-card-title>
        <div v-if="!editing">
          {{ title }}
        </div>
        <div v-else>
          <v-text-field
            prepend-icon="mdi-pencil"
            label="Title"
            v-model="form.title"
          ></v-text-field>
        </div>
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
        <tooltip-button
          :buttonAttributes="{ icon: true, disabled: isActive, color: 'black' }"
          @click="switchTimebox"
        >
          <v-icon>mdi-swap-horizontal</v-icon>
          <template #tooltip>Switch to this timebox</template>
        </tooltip-button>
        <v-spacer />
        <v-btn icon v-if="!isActive && editing" color="green" type="submit">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn
          icon
          v-else
          :disabled="isActive"
          color="blue"
          @click.prevent="editing = true"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon v-if="!isActive && editing" color="red" @click="resetForm">
          <v-icon>mdi-undo-variant</v-icon>
        </v-btn>
        <v-btn
          icon
          v-else
          :disabled="isActive"
          color="red"
          @click="deleteTimebox(id)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { statusEnum, completionEnum } from "../assets/enums";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import DurationPicker from "./DurationPicker";
import TooltipButton from "./TooltipButton";

export default {
  name: "timebox-card",
  components: {
    DurationPicker,
    TooltipButton
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
      timerInterval: null,
      form: {
        title: this.title,
        duration: this.duration
      },
      isDragging: false,
      completionEnum,
      statusEnum
    };
  },
  beforeDestroy() {
    clearInterval(this.timerInterval);
  },
  methods: {
    saveTimebox() {
      if(!this.$refs.form.validate()){
        return;
      }
      let timebox = {
        id: this.id,
        ...this.form
      };
      this.updateTimebox(timebox);
      this.editing = false;
    },
    resetForm() {
      this.$refs.form.reset();
      this.editing = false;
    },
    switchTimebox() {
      this.SET_CURRENT_TIMEBOX(this.id);
      this.SET_REMAINING_TIME(this.duration);
    },
    ...mapMutations("timebox", ["SET_REMAINING_TIME", "SET_CURRENT_TIMEBOX"]),
    ...mapActions("timebox", ["updateTimebox", "nextTimebox", "deleteTimebox"])
  },
  computed: {
    isActive() {
      return this.currentTimeboxId === this.id;
    },
    isCompleted() {
      if (
        this.status === statusEnum.STOPPED ||
        this.status === statusEnum.FINISHED
      ) {
        return completionEnum.COMPLETED;
      }
      if (this.isActive) {
        return completionEnum.IN_PROGRESS;
      }
      return this.getTimeboxIndexById(this.id) <
        this.getTimeboxIndexById(this.currentTimeboxId)
        ? completionEnum.COMPLETED
        : completionEnum.NOT_COMPLETED;
    },
    backgroundHeight() {
      if (this.status == statusEnum.STOPPED) {
        return "height: 0%;";
      }
      switch (this.isCompleted) {
        case completionEnum.COMPLETED:
          return "height: 100%;";
        case completionEnum.IN_PROGRESS:
          return `height: ${(1 - this.remainingTime / this.duration) * 100}%;`;
        default:
          return "height: 0%;";
      }
    },
    formattedRemainingTime() {
      if (this.status == statusEnum.STOPPED) {
        return moment
          .duration(this.duration, "seconds")
          .format("hh:mm:ss", { trim: "large mid" });
      }
      switch (this.isCompleted) {
        case completionEnum.NOT_COMPLETED:
          return moment
            .duration(this.duration, "seconds")
            .format("hh:mm:ss", { trim: "large mid" });
        case completionEnum.IN_PROGRESS:
          return moment
            .duration(this.remainingTime, "seconds")
            .format("hh:mm:ss", { trim: "large mid" });
        default:
          return "00";
      }
    },
    formattedDuration() {
      return moment
        .duration(this.duration, "seconds")
        .format("hh[h]:mm[m]:ss[s]", { trim: "large mid" });
    },
    ...mapState("timebox", ["currentTimeboxId", "status", "remainingTime"]),
    ...mapGetters("timebox", ["getTimeboxIndexById"])
  },
  watch: {
    isActive: {
      handler: function(newVal) {
        if (newVal === true) {
          this.editing = false;
          if (this.remainingTime <= 0) {
            this.SET_REMAINING_TIME(this.duration);
          }
        } else {
          clearInterval(this.timerInterval);
          this.timerInterval = null;
        }
      },
      immediate: true
    },
    status: function(newVal) {
      switch (newVal) {
        case statusEnum.STARTED:
          if (this.isActive && !this.timerInterval) {
            this.timerInterval = setInterval(
              () => this.SET_REMAINING_TIME(this.remainingTime - 1),
              1000
            );
          }
          break;
        case statusEnum.PAUSED:
          clearInterval(this.timerInterval);
          this.timerInterval = null;
          break;
        case statusEnum.STOPPED:
          this.SET_REMAINING_TIME(this.duration);
        case statusEnum.FINISHED:
          clearInterval(this.timerInterval);
          this.timerInterval = null;
          break;
      }
    },
    currentTimeboxId: {
      handler: function(newVal) {
        if (newVal !== this.id) {
          return;
        }

        if (this.status === statusEnum.STARTED) {
          this.SET_REMAINING_TIME(this.duration);
          if (!this.timerInterval) {
            this.timerInterval = setInterval(
              () => this.SET_REMAINING_TIME(this.remainingTime - 1),
              1000
            );
          }
        }
      },
      immediate: true
    },
    remainingTime: function(newVal) {
      if (newVal > this.duration && this.isActive) {
        this.SET_REMAINING_TIME(this.duration);
      }
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
