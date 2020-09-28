<template>
  <v-card class="mx-auto sidebar-wrapper">
    <v-list dense>
      <v-list-item>
        <v-list-item-content>
          <h2>
            Saved Timeboxes
          </h2>
        </v-list-item-content>
      </v-list-item>
      <v-list-item-group v-model="selected">
        <v-list-item
          link
          v-for="(timeboxList, index) in savedTimeboxLists"
          :key="index"
          @click="switchTimeboxList(index)"
        >
          <v-list-item-icon>
            <v-icon class="handle">mdi-drag</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ timeboxList.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-text-field
            dense
            prepend-icon="mdi-pencil"
            :placeholder="currentTimeboxListName"
          >
            <template v-slot:append-outer>
              <v-btn icon color="green">
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </template></v-text-field
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { statusEnum } from "../assets/enums";
export default {
  name: "side-bar",
  data() {
    return {
      drawer: true,
      selected: -1
    };
  },
  methods: {
    switchTimeboxList(index) {
      //   console.log(index);
      this.SET_TIMEBOX_LIST(this.savedTimeboxLists[index].timeboxList);
      this.SET_STATUS(statusEnum.STOPPED);
      this.SET_CURRENT_TIMEBOX_LIST(this.savedTimeboxLists[index].name);
    },
    ...mapMutations("timebox", ["SET_TIMEBOX_LIST", "SET_STATUS"]),
    ...mapMutations("savedTimeboxes", ["SET_CURRENT_TIMEBOX_LIST"])
  },
  computed: {
    ...mapState("savedTimeboxes", [
      "savedTimeboxLists",
      "currentTimeboxListName"
    ]),
    ...mapGetters("savedTimeboxes", ["getTimeboxListIndexByName"])
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
