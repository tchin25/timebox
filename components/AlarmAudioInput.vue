<template>
  <v-file-input
    accept="audio/*"
    label="Place audio file for alarm here"
    @change="readFile"
    :placeholder="customAudioName"
    dense
  ></v-file-input>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "alarm-audio-input",
  methods: {
    readFile(e) {
    //   console.log(e);
      this.SET_CUSTOM_AUDIO_NAME(e ? e.name : null);
      let reader = new FileReader();
      reader.onload = e => {
        let dataURL = e.target.result;
        this.setAlarmAudio(dataURL);
      };
      reader.readAsDataURL(e);
    },
    ...mapMutations("alarm", ["SET_CUSTOM_AUDIO_NAME"]),
    ...mapActions("alarm", ["setAlarmAudio"]),
  },
  computed: {
    ...mapState("alarm", ["customAudioName"])
  }
};
</script>

<style></style>
