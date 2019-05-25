<template>
<div>
    <v-container>
  <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="email" label="Login" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" v-model="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
                </v-container>
    </div>
</template>

<script>
export default {
  name: 'login',
  data() {
      return {
          email : 'abdoumjr@gmail.com',
          password : 'azerty'
      }
  },
  props: {
    msg: String
  },
  methods : {
      login() {
          this.$store.dispatch('login',{
              email : this.email,
              password : this.password
          })
          .then(reponse => {
              this.$swal("Great!", "You are logged in!", "success")
              this.$router.push('group')
          })
          .catch(reponse => {
             this.$swal("Oups ...", 'Email or password wrong !', "error")
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
