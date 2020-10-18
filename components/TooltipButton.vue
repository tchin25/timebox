<template>
  <v-tooltip v-bind="tooltipAttributes">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="{ ...attrs, ...buttonAttributes }"
        v-on="on"
        @click="$emit('click')"
      >
        <slot>
          Button
        </slot>
      </v-btn>
    </template>
    <slot name="tooltip">
      <span>This is a tooltip</span>
    </slot>
  </v-tooltip>
</template>

<script>
export default {
  name: "tooltip-button",
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
    }
  }
};
</script>

<style></style>
