<template>
  <v-card outlined class="mx-auto" width="344">
    <v-form ref="form" @submit.prevent="addCard" lazy-validation>
      <v-card-title>
        Add New Timebox
      </v-card-title>
      <v-card-text>
        <v-text-field
          prepend-icon="mdi-pencil"
          label="Title"
          v-model="form.title"
        ></v-text-field>
        <duration-picker v-model="form.duration"></duration-picker>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn icon color="green" type="submit">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="reset">
          <v-icon>mdi-undo-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
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
        duration: "00:00:00"
      }
    };
  },
  methods: {
    addCard() {
      if (this.$refs.form.validate()) {
        this.ADD_TIMEBOX(this.form);
        this.reset();
      }
    },
    reset() {
      this.$refs.form.reset();
      this.form = {
        title: "",
        duration: "00:00:00"
      };
    },
    ...mapMutations("timebox", ["ADD_TIMEBOX"])
  }
};
</script>

<style></style>
