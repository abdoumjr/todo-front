<template>
         <v-dialog v-model="dialog" persistent max-width="600px">
         <template v-slot:activator="{ on }">
          <v-btn
              dark
              flat icon Outlined
              color="primary"
              v-on="on"
            >   
              <v-icon>add</v-icon>
            </v-btn>
                    </template>
                  <v-card>
        <v-card-title>
          <span class="headline">Add new Member</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
                 <v-flex xs12>
                <v-text-field label="Name/Email*" v-model="user" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*You can add group memeber by email/username</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.stop="inviteMember">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props :['group'],
    data() {
      return {
        dialog : false,
        user : '',
      }
    },
    methods : {
          inviteMember () {
          this.$store.dispatch('inviteMember',{
            user : this.user,
            group_id : this.group.group_id
            })    
          .then(response => {
          this.dialog = false;
          //   this.$swal("Great", response.data, "success")
          })
          .catch(error => {
              if(error.data.error) {
            this.$swal("Oups ...",  error.data.error.join('\r\n'), "error")
              } else {
              this.$swal("Oups ...",  error.data.data, "error")
              }
          })
        },
    }
}
</script>