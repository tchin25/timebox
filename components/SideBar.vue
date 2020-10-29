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
        v-for="timeboxList in savedTimeboxLists"
        :key="timeboxList.name"
        @click="switchTimeboxList(timeboxList.name)"
        :input-value="
          timeboxList.name === currentTimeboxListName ? true : undefined
        "
      >
        <v-list-item-content>
          <v-list-item-title>{{ timeboxList.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <tooltip-dialog-button
            :buttonAttributes="{ icon: true, color: 'red'}"
            :dialogAttributes="{ width: 290 }"
          >
            <template #dialog="{on}">
              <v-card>
                <v-card-title class="headline">
                  Confirm
                </v-card-title>
                <v-card-text>This will delete your timebox list</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red"
                    text
                    @click="
                      () => {
                        on.click();
                        deleteTimeboxList(timeboxList.name);
                      }
                    "
                  >
                    Delete
                  </v-btn>
                  <v-btn color="green" outlined v-on="on">
                    Go Back
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
            <v-icon>mdi-delete</v-icon>
            <template #tooltip> <span>Delete timebox list</span></template>
          </tooltip-dialog-button>
        </v-list-item-icon>
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
    </v-list>
  </v-card>
</template>

<script>
import TooltipDialogButton from "../components/TooltipDialogButton";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { statusEnum } from "../assets/enums";

export default {
  name: "side-bar",
  components: {
    TooltipDialogButton
  },
  data() {
    return {
      drawer: true,
      newTimebox: null
    };
  },
  methods: {
    switchTimeboxList(name = "") {
      console.log("timebox switch " + name);
      if (!!name) {
        let { timeboxList } = this.getTimeboxListByName(name);
        this.SET_TIMEBOX_LIST(timeboxList);
      } else {
        this.SET_TIMEBOX_LIST([]);
      }
      this.SET_CURRENT_TIMEBOX_LIST(name);
      this.SET_STATUS(statusEnum.STOPPED);
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
    deleteTimeboxList(name) {
      console.log("deleting " + name);
      this.DELETE_TIMEBOX_LIST(name);
      if (name == this.currentTimeboxListName) {
        this.switchTimeboxList();
      }
    },
    ...mapMutations("timebox", ["SET_TIMEBOX_LIST", "SET_STATUS"]),
    ...mapMutations("savedTimeboxes", [
      "SET_CURRENT_TIMEBOX_LIST",
      "ADD_NEW_TIMEBOX_LIST",
      "DELETE_TIMEBOX_LIST"
    ])
  },
  computed: {
    isNameTaken() {
      if (this.getTimeboxListByName(this.newTimebox)) {
        return true;
      }
      return false;
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
  width: 300px;
  transition: all 0.5s;
}
</style>
