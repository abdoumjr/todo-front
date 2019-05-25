<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
         {{message}}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    data () {
        return {
            message : '',
            dialog : false,
        }
    },
    created: function () {
    this.$store.watch(state => state.loader, () => {
      const state = this.$store.state.loader
      const message = this.$store.state.loaderMessage
      this.dialog = state
      this.message = message
    },
     {
        deep: true //add this if u need to watch object properties change etc.
    })
  }
}
</script>