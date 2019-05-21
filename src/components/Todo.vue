<template>

<div>
  <v-card>
        <v-toolbar color="purple" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Settings</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>


        <v-list>
          <v-subheader>{{group_name}}</v-subheader>
        <template v-for="(item, index) in items">
          <v-list-tile>
            <v-list-tile-action>
             <v-checkbox value="true"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content >
              <v-list-tile-title>{{item.title }} {{ item.status }}</v-list-tile-title>
              <v-list-tile-sub-title>{{item.value}}</v-list-tile-sub-title>
            </v-list-tile-content>
                          <v-list-tile-action>
                <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                <v-icon
                  v-if="item.status !== 1"
                  color="grey lighten-1"
                >
                  star_border
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-2"
                >
                  star
                </v-icon>
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
      newTodo: '',
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
      this.getTodos()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
