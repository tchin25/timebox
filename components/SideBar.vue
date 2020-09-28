<template>
  <v-card class="mx-auto sidebar-wrapper">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <h2>
            Saved Timebox Lists
          </h2>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        link
        v-for="timeboxList in savedTimeboxLists"
        :key="timeboxList.name"
        @click="switchTimeboxList(timeboxList.name)"
      >
        <v-list-item-icon>
          <v-icon class="handle">mdi-drag</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ timeboxList.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-form ref="form" @submit.prevent="addTimeboxList" lazy-validation>
            <v-text-field
              dense
              label="Add New Timebox List"
              v-model="newTimebox"
              :rules="[
                () => (isNameTaken ? `Name Must Not Be Taken` : true),
                () => (newTimebox ? true : `Name Must Not Be Empty`)
              ]"
            >
              <template v-slot:append-outer>
                <v-btn
                  icon
                  color="green"
                  :disabled="isNameTaken || !newTimebox"
                  type="submit"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template></v-text-field
            >
          </v-form>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <p>Current Timebox List: {{ currentTimeboxListName }}</p>
          Edited: {{ isCurrentTimeboxListEdited }}
          <v-btn icon color="green">
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { statusEnum } from "../assets/enums";
import { isEqual } from "lodash";

export default {
  name: "side-bar",
  data() {
    return {
      drawer: true,
      newTimebox: null
    };
  },
  methods: {
    switchTimeboxList(name) {
      console.log(name);
      let { name: timeboxListName, timeboxList } = this.getTimeboxListByName(
        name
      );
      this.SET_TIMEBOX_LIST([...timeboxList]);
      this.SET_STATUS(statusEnum.STOPPED);
      this.SET_CURRENT_TIMEBOX_LIST(timeboxListName);
    },
    addTimeboxList() {
      if (this.$refs.form.validate()) {
        this.ADD_NEW_TIMEBOX_LIST(this.newTimebox);
        this.switchTimeboxList(this.newTimebox);
        this.selected = this.savedTimeboxLists.length - 1;
        this.newTimebox = null;
        this.$refs.form.reset();
      }
    },
    ...mapMutations("timebox", ["SET_TIMEBOX_LIST", "SET_STATUS"]),
    ...mapMutations("savedTimeboxes", [
      "SET_CURRENT_TIMEBOX_LIST",
      "ADD_NEW_TIMEBOX_LIST"
    ])
  },
  computed: {
    isNameTaken() {
      if (this.getTimeboxListByName(this.newTimebox)) {
        return true;
      }
      return false;
    },
    isCurrentTimeboxListEdited() {
      let savedTimeboxList = this.getTimeboxListByName(
        this.currentTimeboxListName
      );
      if (!savedTimeboxList) {
        return false;
      }

      if (isEqual(this.timeboxList, savedTimeboxList.timeboxList)) {
        return false;
      }
      return true;
    },
    savedTimeboxLists: {
      get() {
        return this.$store.state.savedTimeboxes.savedTimeboxLists;
      },
      set(value) {
        this.$store.commit("savedTimeboxes/SET_SAVED_TIMEBOX_LIST", value);
      }
    },
    ...mapState("timebox", ["timeboxList"]),
    ...mapState("savedTimeboxes", ["currentTimeboxListName"]),
    ...mapGetters("savedTimeboxes", ["getTimeboxListByName"])
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
