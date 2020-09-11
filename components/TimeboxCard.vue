<template>
  <v-card class="mx-auto" width="344">
    <v-card-title>
      {{name}}
    </v-card-title>
    <v-card-text>
      Text
    </v-card-text>
    <v-card-actions>
        <v-spacer />
      <v-btn color="red" dark @click="deleteTimebox">
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: {
        id: {
            required: true,
        },
        name: {
            required: true,
            default: "Title"
        },
        duration: {
            required: true,
        }
    },
    methods: {
        deleteTimebox() {
            this.$store.commit("timebox/DELETE_TIMEBOX", this.id);
        }
    }
};
</script>

<style></style>
