<template>
<div>
    <v-navigation-drawer v-if="isLoggedIn"
      clipped
      fixed
      v-model="drawer"
      app
    >
		<v-container>
		<v-layout column justify-center align-center>
			<v-flex xs12 sm12 md12>
            <img class="profilePic"  src="https://randomuser.me/api/portraits/men/85.jpg">
			</v-flex>
				<v-flex xs12 sm12 md12>
            <v-list-tile-title >{{username}}</v-list-tile-title>
			</v-flex>
		</v-layout>
		</v-container>
      <v-list dense>
					 <router-link to="group">
        <v-list-tile >
          <v-list-tile-action>
            <v-icon>group</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Groups</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
				</router-link>
				<!-- <router-link to="todo">
    <v-list-tile>
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Todos</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
				</router-link> -->
    
      </v-list>
    </v-navigation-drawer>
		    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="isLoggedIn"></v-toolbar-side-icon>
      <v-toolbar-title>Todo App</v-toolbar-title>
    <v-spacer></v-spacer>
          <v-toolbar-items class="clipped-right">
            <v-btn v-if="!isLoggedIn" flat><router-link to="/login"> Login</router-link></v-btn>
            <v-btn  v-if="!isLoggedIn" flat><router-link  to="/register"> Register</router-link></v-btn>
            <v-btn  v-if="isLoggedIn" flat><router-link  to="/logout"> Logout</router-link></v-btn>
    </v-toolbar-items>
    </v-toolbar>
		</div>
</template>

<script>
export default {
  name: 'todoNav',
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
.profilePic {
	border-radius: 100px;
	max-width: 100px;
	max-height: 100px
}
</style>
