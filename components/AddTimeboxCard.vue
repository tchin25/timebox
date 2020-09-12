<template>
  <v-card outlined class="mx-auto" width="344">
    <v-card-title>
      Name
    </v-card-title>
    <v-card-text>
      Text
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn icon color="green" @click="addCard">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    addCard() {
      let toAdd = {
        id: 0,
        title: "Test name 1",
        duration: 3600,
        advance: {
          alternate: 0,
          offset: 0
        }
      };
      this.ADD_TIMEBOX(toAdd);
    },
    ...mapMutations("timebox", ["ADD_TIMEBOX"])
  }
};
</script>

<style></style>
