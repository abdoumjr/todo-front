<template>
    
</template>

<script>
export default {
    created() {
        this.$store.dispatch('logout')
        .then(reponse => {
              this.$swal("logged Out!", "Thanks for stoping bye, see you soon!", "success")
              this.$router.push('login')
          })
    }
}
</script>
