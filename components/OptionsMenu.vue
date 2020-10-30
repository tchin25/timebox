<template>
  <v-card flat class="mx-auto sidebar-wrapper">
    <v-list dense>
      <v-list-item>
        <v-list-item-content>
          <h2>
            Global Settings
          </h2>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          Repeat
        </v-list-item-content>
        <v-list-item-action>
          <v-switch v-model="repeat"></v-switch>
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          Mute
        </v-list-item-content>
        <v-list-item-action>
          <v-switch v-model="mute"></v-switch>
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          Pause Between Timeboxes
        </v-list-item-content>
        <v-list-item-action>
          <v-switch v-model="pauseBetweenTimeboxes"></v-switch>
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          Use Custom Alarm
        </v-list-item-content>
        <v-list-item-action>
          <v-switch v-model="useCustomAudio"></v-switch>
        </v-list-item-action>
      </v-list-item>
      <template v-if="useCustomAudio">
        <v-list-item>
          <v-list-item-content>
            <alarm-audio-input></alarm-audio-input>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list-item>
        <v-list-item-content>
          Test Audio
        </v-list-item-content>
        <v-list-item-action>
          <v-btn x-small outlined dense dark color="green" @click="playSound"
            ><v-icon>mdi-play</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <!-- <v-list-item>
          <v-list-item-action>
            <v-switch></v-switch>
          </v-list-item-action>
          <v-list-item-content>
            Notifications
          </v-list-item-content>
        </v-list-item> -->
    </v-list>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import AlarmAudioInput from "./AlarmAudioInput";

export default {
  components: {
    AlarmAudioInput
  },
  methods: {
    ...mapActions("alarm", ["playSound"])
  },
  computed: {
    repeat: {
      get() {
        return this.$store.state.timebox.repeat;
      },
      set(value) {
        this.$store.commit("timebox/SET_REPEAT", value);
      }
    },
    mute: {
      get() {
        return this.$store.state.alarm.mute;
      },
      set(value) {
        this.$store.commit("alarm/SET_MUTE", value);
      }
    },
    useCustomAudio: {
      get() {
        return this.$store.state.alarm.useCustomAudio;
      },
      set(value) {
        this.$store.commit("alarm/SET_USE_CUSTOM_AUDIO", value);
      }
    },
    pauseBetweenTimeboxes: {
      get() {
        return this.$store.state.timebox.pauseBetweenTimeboxes;
      },
      set(value) {
        this.$store.commit("timebox/SET_PAUSE_BETWEEN_TIMEBOXES", value);
      }
    },
    ...mapState("alarm", ["isPlaying"])
  }
};
</script>

<style scoped>
.sidebar-wrapper {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
