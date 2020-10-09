<template>
  <v-file-input
    accept="audio/*"
    label="Place audio file for alarm here"
    @change="readFile"
    :placeholder="customAudioName"
    :rules="[
      value =>
        !value ||
        value.size < 4000000 ||
        'Audio should be less than 4 MB!'
    ]"
    dense
  ></v-file-input>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "alarm-audio-input",
  methods: {
    readFile(e) {
      // console.log(e);

      // Limit file size to under 5 MB so that we don't hit localStorage limit
      if (!e || e.size > 400000) {
        return;
      }
      this.SET_CUSTOM_AUDIO_NAME(e ? e.name : null);
      let reader = new FileReader();
      reader.onload = e => {
        let dataURL = e.target.result;
        this.setAlarmAudio(dataURL);
      };
      reader.readAsDataURL(e);
    },
    ...mapMutations("alarm", ["SET_CUSTOM_AUDIO_NAME"]),
    ...mapActions("alarm", ["setAlarmAudio"])
  },
  computed: {
    ...mapState("alarm", ["customAudioName"])
  }
};
</script>

<style></style>
