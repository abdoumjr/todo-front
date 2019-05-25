<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn  color="primary" flat icon v-on="on"> <v-icon>info</v-icon>
</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Todo Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">OK</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Title</v-list-tile-title>
              <v-list-tile-sub-title >{{title}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Description</v-list-tile-title>
              <v-list-tile-sub-title>{{value}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Status</v-list-tile-title>
              <v-list-tile-sub-title>
            <v-chip v-if="status == 'Pending'" color="primary" text-color="white">{{status}}</v-chip>
            <v-chip v-if="status == 'Complete'" color="green" text-color="white">{{status}}</v-chip>
            <v-chip v-if="status == 'Ongoing'" color="orange" text-color="white">{{status}}</v-chip>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
            <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Group </v-list-tile-title>
              <v-list-tile-sub-title>{{group}}</v-list-tile-sub-title>
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
        </v-list>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
      props: ['todo'],
    data () {
        return {
            dialog :false,
            title : '',
            status : '',
            value : '',
            owner : '',
            group : '',
            created_at : ''
        }
    },
    mounted() {
      this.title = this.todo.title
      this.status = this.todo.status
      this.value = this.todo.value
      this.owner = this.todo.owner
      this.created_at = this.todo.created_at
      this.group = this.todo.group
      console.log(this.todo)
    },
}
</script>