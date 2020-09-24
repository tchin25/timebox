<template>
  <v-app>
    <side-bar></side-bar>
    <options-menu></options-menu>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="true" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import SideBar from "../components/SideBar";
import OptionsMenu from "../components/OptionsMenu";
export default {
  components: {
    SideBar,
    OptionsMenu
  },
  data() {
    return {};
  }
};
</script>
