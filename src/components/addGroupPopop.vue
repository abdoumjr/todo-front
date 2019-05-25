<template>
    <div>
         <v-dialog v-model="dialog" persistent max-width="600px">
         <template v-slot:activator="{ on }">
          <v-btn
              absolute
              dark
              fab
              bottom
              right
              color="primary"
              v-on="on"
            >   
              <v-icon>add</v-icon>
            </v-btn>
                    </template>
                  <v-card>
        <v-card-title>
          <span class="headline">Add new Todo</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
                 <v-flex xs12>
                <v-text-field label="Name*" v-model="newGroupName" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*Group name is a required fields</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.stop="addGroup">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
      return {
        dialog : false,
        newGroupName : '',
      }
    },
    methods : {
          addGroup () {
          this.$store.dispatch('addGroup',{
            newGroupName : this.newGroupName,
            })    
          .then(response => {
          this.dialog = false;
          //   this.$swal("Great", response.data, "success")
          })
          .catch(error => {
            this.$swal("Oups ...",  error.data.error.join('\r\n'), "error")
          })
        },
    }
}
</script>