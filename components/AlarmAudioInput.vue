<template>
  <v-file-input
    accept="audio/*"
    label="Place audio file for alarm here"
    @change="readFile"
    :placeholder="customAudioName"
  ></v-file-input>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "alarm-audio-input",
  methods: {
    readFile(e) {
      console.log(e);
      this.SET_CUSTOM_AUDIO_NAME(e.name);
      let reader = new FileReader();
      reader.onload = (e) => {
        let dataURL = e.target.result;
        this.SET_ALARM_AUDIO(dataURL);
      };
      reader.readAsDataURL(e);
    },
    ...mapMutations("timebox", ["SET_ALARM_AUDIO", "SET_CUSTOM_AUDIO_NAME"])
  },
  computed: {
      ...mapState("timebox", ["customAudioName"])
  }
};
</script>

<style></style>
