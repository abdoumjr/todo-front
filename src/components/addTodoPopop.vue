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
                <v-text-field label="Title*" v-model="newTodoTitle" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea label="Todo*" v-model="newTodoValue" required></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*Todo and title required fields</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.stop="addTodo">Save</v-btn>
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
        newTodoTitle : '',
        newTodoValue : ''
      }
    },
    methods : {
          addTodo () {
          this.$store.dispatch('addTodo',{
            newTodoTitle : this.newTodoTitle,
            newTodoValue : this.newTodoValue,
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