<template>
<div>
<v-card>
        <v-toolbar color="teal" dark>
          <v-toolbar-title>Groups</v-toolbar-title>
        <addGroupPopop></addGroupPopop>
        </v-toolbar>

<v-container>
  <v-layout  row align-center justify-start fill-heigh>
    <v-flex xs4 md4 class="px-5 py-3">Group</v-flex>
    <v-flex xs4 md4 class="px-5 py-3">Owner</v-flex>
    <v-flex  xs4 md4 class="px-5 py-3">Actons</v-flex>
  </v-layout>
   <v-layout r row align-center justify-start fill-heigh v-for="item in items"  :key="item.id">
    <v-flex xs4 md4 class="px-5 py-3 ">{{ item.name }}</v-flex>
    <v-flex xs4 md4 class="px-5 py-3"> {{ item.owner }}</v-flex>
    <v-flex xs4 md4 class="px-5 py-3">       
     <v-btn  color="primary" flat icon Outlined  @click.stop="setCurrentGroup(item)"> <v-icon>list_alt</v-icon></v-btn>
     <showGroupPopop :group="item"></showGroupPopop>
      <inviteMember v-if="item.owner == username" :group="item"></inviteMember>
</v-flex>
  </v-layout>
</v-container>
      </v-card>
</div>
</template>

<script>
import addGroupPopop from './addGroupPopop'
import showGroupPopop from './showGroupPopop'
import inviteMember from './inviteMember'
export default {
  name: 'Group',
  components: {
    addGroupPopop,
    showGroupPopop,
    inviteMember
  },
	 data () {
      return {
       username: ''
			}
		},
		methods: {
			getGroups() {
				this.$store.dispatch('getGroups');
      },
      setCurrentGroup(data){
        this.$store.dispatch('setCurrentGroup',data)
        .then(reponse => {
              this.$router.push('todo')
          })
          .catch(reponse => {
             this.$swal("Oups ...", 'Something went wrong please refresh page and try again!', "error")
          })
      }
			},
  beforeMount(){
      this.getGroups()
      this.username = this.$store.state.username
  },
  computed: {
    items () {
      return this.$store.state.groups
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
