<template>
  <v-app>
    <side-bar></side-bar>
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
export default {
  components: {
    SideBar
  },
  data() {
    return {};
  }
};
</script>
