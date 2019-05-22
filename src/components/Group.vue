<template>

<div>
	
<v-card>
        <v-toolbar color="teal" dark>

          <v-toolbar-title>Groups</v-toolbar-title>

          <v-spacer></v-spacer>

          <!-- <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn> -->
        </v-toolbar>

        <v-list>
          <template v-for="(item, index) in items">
            <v-list-tile
              :key="item.id"
              @click="setCurrentGroup(item)"
            >
              <v-list-tile-action>
                <v-icon>group</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <div class="v-list__tile__sub-title">Owner : {{ item.owner }}</div>
              </v-list-tile-content>
            </v-list-tile>

          </template>
        </v-list>
      </v-card>
</div>
</template>

<script>
export default {
  name: 'Group',
	 data () {
      return {
      // items: []
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

</style>
