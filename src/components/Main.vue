<template>
<div>
 <v-app id="inspire" dark>
    <v-navigation-drawer v-if="isLoggedIn"
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
 <v-list-tile @click="" >
                <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title >{{username}}</v-list-tile-title>
          </v-list-tile-content>
           </v-list-tile>
        <v-list-tile @click="">
          
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="isLoggedIn"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    <v-spacer></v-spacer>
          <v-toolbar-items class="clipped-right">
            <v-btn v-if="!isLoggedIn" flat><router-link to="/login"> Login</router-link></v-btn>
            <v-btn  v-if="!isLoggedIn" flat><router-link  to="/register"> Register</router-link></v-btn>
            <v-btn  v-if="isLoggedIn" flat><router-link  to="/logout"> Logout</router-link></v-btn>
    </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center >
            <v-flex xs12 sm12 md12>

                <router-view></router-view>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; abdoumjr 2019</span>
    </v-footer>
  </v-app>
</div>
</template>

<script>
import Todo from './Todo.vue'
import Group from './Group.vue'
import login from './login.vue'

export default {
  name: 'Main',
	components: {
    /* eslint-disable vue/no-unused-components */
    Todo,
    Group,
    login
  },
  props: {
    msg: String
  },
  data() {
    return {
      drawer: true,
    }
},
computed: {
    username () {
      return this.$store.state.username
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
     items : function() {
      return this.$store.state.groups
    } 
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 a {
    text-decoration: none;
        color: #f6f6f6;
}
</style>
