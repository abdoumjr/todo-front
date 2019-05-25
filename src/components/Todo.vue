<template>

<div>
  <v-card>
        <v-toolbar color="purple" dark>

          <v-toolbar-title>Todos</v-toolbar-title>
          <v-spacer></v-spacer>
          <addTodoPopop></addTodoPopop>
        </v-toolbar>
        <v-container>
          <v-layout row align-center justify-start fill-heigh>
          <v-flex xs3 md3 class="pl-5">Title</v-flex>
          <v-flex xs3 md3 class="pl-5">description</v-flex>
          <v-flex xs3 md3 class="pl-5">Status</v-flex>
          <v-flex xs3 md3 class="pl-5">Actions</v-flex>
          </v-layout>
          <v-layout row v-for="item in items" :key="item.id" align-center justify-start fill-heigh :class="item.status" >
          <v-flex xs3 md3 class="pl-5">{{item.title}}</v-flex>
          <v-flex xs3 md3 class="pl-5">{{item.value}}</v-flex>
          <v-flex xs3 md3 class="pl-5">
           <v-chip v-if="item.status == 'Pending'" color="primary" text-color="white">{{item.status}}</v-chip>
            <v-chip v-if="item.status == 'Complete'" color="green" text-color="white">{{item.status}}</v-chip>
            <v-chip v-if="item.status == 'Ongoing'" color="orange" text-color="white">{{item.status}}</v-chip>
          </v-flex>
          <v-flex xs3 md3 class="pl-5">
            <showTodoPopop :todo='item'></showTodoPopop>
            <editTodoPopop :todo='item'></editTodoPopop>
          </v-flex>
          </v-layout>
        </v-container>
      </v-card>

</div>
</template>

<script>
import addTodoPopop from './addTodoPopop'
import editTodoPopop from './editTodoPopop'
import showTodoPopop from './showTodoPopop'
export default {
  name: 'Todo',
  components : {
   addTodoPopop,
   editTodoPopop,
   showTodoPopop
  },
  data () {
      return {
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
          todoStateChange (id,toTodoState) {
          this.$store.dispatch('todoStateChange',{
            id : id,
            toTodoState: toTodoState,
            })    
          .then(response => {
          //this.dialog = false;
          //   this.$swal("Great", response.data, "success")
          })
          .catch(error => {
           //  this.$swal("Oups ...",  error.data.error.join('\r\n'), "error")
          })
        },
        updateTodo() {
             this.$store.dispatch('updateTodo',{
            id : id,
            })    
          .then(response => {
          //this.dialog = false;
          //   this.$swal("Great", response.data, "success")
          })
          .catch(error => {
           //  this.$swal("Oups ...",  error.data.error.join('\r\n'), "error")
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
<style>
.flex {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.Pending {
    border-left: solid 3px #1677CF;
  }
  .Complete {
    border-left: solid 3px #4baf50;
  }
   .Ongoing {
    border-left: solid 3px #ff9800;
  }
  .v-chip .v-chip__content { 
    height: 20px !important
  }


</style>
