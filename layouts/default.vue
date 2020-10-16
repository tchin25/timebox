<template>
  <v-app>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="true" app padless>
      <v-card class="flex" flat tile>
        <v-card-title class="">
          <v-spacer></v-spacer>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="red"
                v-bind="attrs"
                v-on="on"
                text
                x-small
                @dblclick="hardReset"
              >
                <v-icon left>
                  mdi-restore
                </v-icon>
                Hard Reset
              </v-btn>
            </template>
            <span
              >Use if website completely breaks<br />
              Double-click to use</span
            >
          </v-tooltip>
        </v-card-title>

        <v-card-actions class="py-2">
          A side project by
          <a href="https://thomasch.in/" class="ml-1">
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
export default {
  components: {},
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
