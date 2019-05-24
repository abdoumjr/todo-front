<template>
  <v-snackbar v-model="show" :timeout="timeout">
    {{message}}
    <v-btn flat color="accent"  @click.native="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'snackbar',
  data () {
    return {
      show: false,
      message: '',
      timeout: 2000,
    }
  },
  created: function () {
    this.$store.watch(state => state.snack, () => {
      const msg = this.$store.snack
      if (msg !== '') {
        this.show = true
        this.message = this.$store.state.snack
      }
    },
     {
        deep: true //add this if u need to watch object properties change etc.
    })
  }
}
</script>