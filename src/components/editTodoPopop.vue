<template>
         <v-dialog v-model="dialog" persistent max-width="600px">
         <template v-slot:activator="{ on }">
          <v-btn 
          flat icon
              color="warning"
              v-on="on"
            >   
              <v-icon>edit</v-icon>
            </v-btn>
                    </template>
                  <v-card>
        <v-card-title>
          <span class="headline">Edit Todo</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
                 <v-flex xs12>
                <v-text-field label="Title*" v-model="editTodoTitle" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea label="Todo*" v-model="editTodoValue" required></v-textarea>
              </v-flex>
                <v-flex xs12>
                <v-select
                chips
                v-model="select"
                :items="items"
                item-text="status"
                item-value="value"
                label="Status"
                :hint="`${select.status}`"
                persistent-hint
                return-object
                single-line
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*All required fields</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.stop="updateTodo">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['todo'],
    data() {
      return {
        dialog : false,
        editTodoTitle : '',
        editTodoValue : '',
        select : '',
        items : '',
      }
    },
    methods : {
          updateTodo () {
          this.$store.dispatch('updateTodo',{
            editTodoTitle : this.editTodoTitle,
            editTodoValue : this.editTodoValue,
            editStatus : this.select,
            id : this.todo.id
            })    
          .then(response => {
          this.dialog = false;
          //   this.$swal("Great", response.data, "success")
          })
          .catch(error => {
            this.$swal("Oups ...",  error.data.data, "error")
          })
        },
    },
    created() {
        this.editTodoTitle = this.todo.title
        this.editTodoValue = this.todo.value
        this.select = {value : this.todo.status == 'Pending' ? '0': (this.todo.status == 'Ongoing' ? '1' : '2'), status : this.todo.status}
        this.items = this.$store.state.status
    }
}
</script>