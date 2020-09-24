<template>
  <v-card class="mx-auto sidebar-wrapper">
    <v-navigation-drawer v-model="drawer" permanent floating>
      <v-list dense>
        <v-list-item
          link
          v-for="(timeboxList, index) in savedTimeboxLists"
          :key="index"
          @click="switchTimeboxList(index)"
        >
          <v-list-item-icon>
            <v-icon>mdi-clock-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ timeboxList.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { statusEnum } from "../assets/enums";
export default {
  name: "side-bar",
  data() {
    return {
      drawer: true
    };
  },
  methods: {
    switchTimeboxList(index) {
      //   console.log(index);
      this.SET_TIMEBOX_LIST(this.savedTimeboxLists[index].timeboxList);
      this.SET_STATUS(statusEnum.STOPPED);
    },
    ...mapMutations("timebox", ["SET_TIMEBOX_LIST", "SET_STATUS"])
  },
  computed: {
    ...mapState("savedTimeboxes", ["savedTimeboxLists"])
  }
};
</script>

<style scoped>
.sidebar-wrapper {
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 1000;
}
</style>
