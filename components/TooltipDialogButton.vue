<template>
  <div>
    <tooltip-button
      :tooltipAttributes="tooltipAttributes"
      :buttonAttributes="buttonAttributes"
      @click.stop="dialog = true"
    >
      <slot>
        Open Dialog
      </slot>
      <template #tooltip>
        <slot name="tooltip">
          <span>This is a tooltip</span>
        </slot></template
      >
    </tooltip-button>
    <v-dialog v-bind="dialogAttributes" v-model="dialog">
      <slot
        name="dialog"
        :on="{
          click: () => {
            dialog = false;
          }
        }"
      >
        <v-card>
          <v-card-title class="headline">
            Dialog
          </v-card-title>
          <v-card-text>Lorem Ipsum</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </slot>
    </v-dialog>
  </div>
</template>

<script>
import TooltipButton from "./TooltipButton";

export default {
  name: "tooltip-dialog-button",
  components: { TooltipButton },
  props: {
    buttonAttributes: {
      type: Object,
      default: () => ({})
    },
    tooltipAttributes: {
      type: Object,
      default: () => ({
        bottom: true
      })
    },
    dialogAttributes: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style></style>
