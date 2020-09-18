<template>
  <v-card outlined class="mx-auto" width="344">
    <v-card-title>
      <v-text-field
        prepend-icon="mdi-pencil"
        label="Title"
        v-model="form.title"
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <duration-picker v-model="form.duration"></duration-picker>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn icon color="green" @click="addCard">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn icon color="red" @click="clearCard">
        <v-icon>mdi-undo-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";
import DurationPicker from "./DurationPicker";

export default {
  name: "add-timebox-card",
  components: { DurationPicker },
  data() {
    return {
      form: {
        title: "",
        duration: 0
      }
    };
  },
  methods: {
    addCard() {
      this.ADD_TIMEBOX(this.form);
      this.clearCard();
    },
    clearCard() {
      this.form = {
        title: "",
        duration: 0
      };
    },
    ...mapMutations("timebox", ["ADD_TIMEBOX"])
  }
};
</script>

<style></style>
