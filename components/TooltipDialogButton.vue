<template>
  <v-tooltip v-bind="tooltipAttribules">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="{ ...attrs, ...buttonAttributes }"
        v-on="on"
        @click.stop="dialog = true"
      >
        <slot>
          Open Dialog
        </slot>
      </v-btn>
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
    </template>
    <slot name="tooltip">
      <span>This is a tooltip</span>
    </slot>
  </v-tooltip>
</template>

<script>
export default {
  name: "tooltip-dialog-button",
  props: {
    buttonAttributes: {
      type: Object,
      default: () => ({})
    },
    tooltipAttribules: {
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
