<template>
  <v-app>
    <v-main>
      <v-container style="padding-bottom: 2rem">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="true" app padless>
      <v-card class="flex" flat tile>
        <v-card-title class="">
          <v-spacer></v-spacer>

          <tooltip-dialog-button
            :tooltipAttributes="{ top: true }"
            :buttonAttributes="{ text: true, color: 'red', 'x-small': true }"
            :dialogAttributes="{ width: 290 }"
          >
            <template #dialog="{on}">
              <v-card>
                <v-card-title class="headline">
                  Confirm
                </v-card-title>
                <v-card-text>This will wipe all local data</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red"
                    text
                    @click="
                      () => {
                        on.click();
                        hardReset();
                      }
                    "
                  >
                    Wipe Data
                  </v-btn>
                  <v-btn color="green" outlined v-on="on">
                    Go Back
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
            <v-icon left>
              mdi-restore
            </v-icon>
            Hard Reset
            <template #tooltip>
              <span>Use if website completely breaks</span></template
            >
          </tooltip-dialog-button>
        </v-card-title>

        <v-card-actions class="py-2">
          A side project by
          <a
            href="https://thomasch.in/"
            class="ml-1"
            target="_blank"
            rel="noreferrer"
          >
            Thomas Chin
          </a>
          —
          {{ new Date().getFullYear() }}
          <v-spacer></v-spacer>
          <v-btn
            class="mx-4"
            icon
            small
            href="https://github.com/tchin25/timebox"
            target="_blank"
            rel="noreferrer"
          >
            <v-icon class="mb-1" large>
              mdi-github
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import TooltipDialogButton from "../components/TooltipDialogButton";

export default {
  components: {
    TooltipDialogButton
  },
  data() {
    return {};
  },
  methods: {
    hardReset() {
      window.localStorage.clear();
      window.location.reload(true);
    }
  }
};
</script>
