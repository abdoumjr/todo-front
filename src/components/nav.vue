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
        <div class="text-xs-center mt-2">
       <router-link to="invites">
    <v-badge left overlap>
      <template v-slot:badge>
        <span>{{total_invites}}</span>
      </template>
   <v-icon color="grey lighten-1" medium>
        account_circle
      </v-icon>  
        </v-badge>
</router-link>
    &nbsp;&nbsp;
    </div>
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
        total_invites :''
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
beforeMount(){
  if(this.isLoggedIn){
  this.$store.dispatch('getInvites')
    .then(reponse => {
          this.total_invites = this.$store.state.total_invites
          })
          .catch(reponse => {
             this.$swal("Oups ...", 'Something went wrong please refresh page and try again!', "error")
          })
}
  }
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
