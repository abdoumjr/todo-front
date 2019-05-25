<template>
<div>
 <v-app id="inspire" dark>
  <todoNav ></todoNav>

    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center >
            <v-flex xs12 sm12 md12>
                   <loader></loader>
                <router-view></router-view>
                <snackbar></snackbar>

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
import snackbar from './snackbar.vue'
import loader from './loader.vue'
import todoNav from './nav'


export default {
  name: 'Main',
	components: {
    /* eslint-disable vue/no-unused-components */
    Todo,
    Group,
    login,
    snackbar,
    loader,
    todoNav
  },
  props: {
    msg: String
  },
  data() {
    return {
      snackbar : this.$store.state.snackbar
    }
},
computed: {
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
<style>
 a {
    text-decoration: none;
        color: #f6f6f6;
}
.actions {
  margin-right: 10px
}
</style>
