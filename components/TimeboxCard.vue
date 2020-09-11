<template>
  <v-card class="mx-auto" width="344">
      <div class="handle">
        <v-icon>mdi-drag</v-icon>
      </div>
    <v-card-title>
      {{name}}
    </v-card-title>
    <v-card-text>
      Text
    </v-card-text>
    <v-card-actions>
        <v-spacer />
      <v-btn icon color="red" @click="deleteTimebox">
        <v-icon>mdi-delete</v-icon>
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

<style>
.handle {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
