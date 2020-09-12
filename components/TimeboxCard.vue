<template>
  <v-card class="mx-auto" width="100%">
    <div class="handle">
      <v-icon>mdi-drag</v-icon>
    </div>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      Text
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
import { mapState, mapMutations } from "vuex";

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
  methods: {
    updateTimebox() {
      this.editing = false;
    },
    ...mapMutations("timebox", ["UPDATE_TIMEBOX", "DELETE_TIMEBOX"])
  },
  computed: {
    active() {
      return this.currentTimeboxId == this.id;
    },
    ...mapState("timebox", ["currentTimeboxId", "status"])
  },
  watch: {
    active: function(newVal, oldVal) {
      if (newVal == true) {
        this.editing = false;
      }
    },
    currentTimeboxId: {
      handler: function(newVal, oldVal) {
        if (newVal == this.id) {
          this.remainingTime = this.duration;
          if (this.status == "START") {
            this.timerInterval = setInterval(
              () => (this.remainingTime -= 1),
              1000
            );
          }
        }
      },
      immediate: true
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
</style>
