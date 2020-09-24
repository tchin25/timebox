<template>
  <v-card class="mx-auto sidebar-wrapper">
    <v-navigation-drawer permanent floating right>
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="repeat"></v-switch>
          </v-list-item-action>
          <v-list-item-content>
            Repeat
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-switch></v-switch>
          </v-list-item-action>
          <v-list-item-content>
            Mute
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  computed: {
    repeat: {
      get() {
        return this.$store.state.timebox.repeat;
      },
      set(value) {
        this.$store.commit("timebox/SET_REPEAT", value);
      }
    }
  }
};
</script>

<style scoped>
.sidebar-wrapper {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1000;
}
</style>
