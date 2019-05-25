<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn  color="purple darken-2" flat  icon v-on="on"> <v-icon>info</v-icon>
</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Group Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">OK</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Name</v-list-tile-title>
              <v-list-tile-sub-title >{{name}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
           <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Created By</v-list-tile-title>
              <v-list-tile-sub-title>{{owner}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
            <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Created At</v-list-tile-title>
              <v-list-tile-sub-title>{{created_at}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
               <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Members</v-list-tile-title>
              <v-list-tile-sub-title>
            <v-chip v-for="item in items" :key="item.user_name">
            <!-- <v-avatar class="teal">A</v-avatar> -->
            {{item.user_name}}
            </v-chip>
          </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>   

      </v-card>
    </v-dialog>
</template>
<script>
export default {
      props: ['group'],
    data () {
        return {
            dialog :false,
            name : '',
            owner : '',
            created_at : '',
            items : ''
        }
    },
    methods : {
        getGroupUsers() {
       this.$store.dispatch('getGroupUsers')
         .then(reponse => {
           this.items = this.$store.state.groupUsers
          })
          .catch(reponse => {
             this.$swal("Oups ...", 'Something went wrong please refresh page and try again!', "error")
          })
        },
        setCurrentGroup(data){
        this.$store.dispatch('setCurrentGroup',data)
        .then(reponse => {
          })
          .catch(reponse => {
             this.$swal("Oups ...", 'Something went wrong please refresh page and try again!', "error")
          })
      }
    },
    mounted() {
      this.name = this.group.name,
      this.created_at = this.group.created_at,
      this.owner = this.group.owner
    },
    beforeMount(){
       this.setCurrentGroup(this.group)
       this.getGroupUsers()
    }
}
</script>