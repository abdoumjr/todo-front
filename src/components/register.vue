<template>
<div>
  <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="email" v-model="email" label="email" type="text" required=""></v-text-field>
                  <v-text-field prepend-icon="person" v-model="user_name" label="username" type="text" required=""></v-text-field>
                  <v-text-field prepend-icon="lock" v-model="password" label="Password" id="password" type="password" required=""></v-text-field>
                  <v-text-field prepend-icon="lock" v-model="confirm_password" label="confirm_password" id="confirm_password" type="password" required=""></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
    </div>
</template>

<script>
export default {
  name: 'register',
  data() {
      return {
          email : '',
          password : '',
          confirm_password : '',
          user_name : ''
      }
  },
  props: {
    msg: String
  },
  methods : {
      login() {
          this.$store.dispatch('register',{
              email : this.email,
              password : this.password,
              confirm_password : this.confirm_password,
              user_name : this.user_name
          })
          .then(reponse => {
               this.$swal("Welcome!", "You are now registred!", "success")
              this.$router.push('todo')
          })
          .catch(error => {
             this.$swal("Oups ...", error.data.error.join('\r\n'), "error")
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
