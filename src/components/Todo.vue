<template>

<div>
  <v-card>
        <v-toolbar color="purple" dark>

          <v-toolbar-title>Todos</v-toolbar-title>

          <v-spacer></v-spacer>

          <!-- <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn> -->
  
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
          <v-btn color="blue darken-1" flat @click="addTodo">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-toolbar>
        <v-list>
          <v-subheader>{{group_name}}</v-subheader>
        <template>
          <v-list-tile v-for="item in items" :key="item.id">
            <v-list-tile-action>
             <v-checkbox v-model="item.done" ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content >
              <v-list-tile-title>{{item.title }} {{ item.status }}</v-list-tile-title>
              <v-list-tile-sub-title>{{item.value}}</v-list-tile-sub-title>
            </v-list-tile-content>
                          <v-list-tile-action>
                  <div class="text-xs-center">
             <v-btn fab dark small v-if="item.doing" color="cyan">
              <v-icon dark>edit</v-icon>
            </v-btn>
               <v-btn fab dark small v-else >
              <v-icon dark>edit</v-icon>
            </v-btn>
            </div>
              </v-list-tile-action>

          </v-list-tile>
       </template>
        </v-list>


      </v-card>

</div>
</template>

<script>
export default {
  name: 'Todo',
  data () {
      return {
      newTodoValue: '',
      newTodoTitle: '',
      dialog : false,
      }
  },
  methods : {
          getTodos () {
         this.$store.dispatch('getTodos',{
              group_id : this.$store.state.current_group_id,
              name : this.$store.state.group_name
              })
         .then(response => {} )
         .catch(error => {
             this.$router.push('group')
         })
    },
        addTodo () {
          this.$store.dispatch('addTodo',{
            newTodoValue : this.newTodoValue,
            newTodoTitle : this.newTodoTitle
            })    
          .then(response => {
             this.dialog = false;
             this.$swal("Great", response.data, "success")
          })
          .catch(error => {
             this.$swal("Oups ...",  error.data.error.join('\r\n'), "error")
          })
        }
  },
    computed: {
    items () {
      return this.$store.state.todos
    },
    group_name () {
        return this.$store.state.current_group_name
    }
  },
   beforeMount(){
      this.getTodos();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
