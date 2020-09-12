<template>
  <v-card class="mx-auto" width="100%">
    <div class="handle">
      <v-icon>mdi-drag</v-icon>
    </div>
    <v-card-title>
      {{ name }}
    </v-card-title>
    <v-card-text>
      Text
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn icon :disabled="active">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon color="red" @click="DELETE_TIMEBOX(id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    id: {
      required: true
    },
    name: {
      required: true,
      default: "Title"
    },
    duration: {
      required: true
    }
  },
  data() {
    return {
      editing: false
    };
  },
  methods: {
    ...mapMutations("timebox", ["UPDATE_TIMEBOX", "DELETE_TIMEBOX"])
  },
  computed: {
    active() {
      return this.currentTimeboxId == this.id;
    },
    ...mapState("timebox", ["currentTimeboxId"])
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
