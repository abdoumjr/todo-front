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
              v-if="item.action"
              :key="item.title"
              @click=""
            >
              <v-list-tile-action>
                <v-icon>group</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
  props: {
    msg: String
  },
	 data () {
      return {
        items: []
			}
		},
		methods: {
			getGroups() {
						this.$store.dispatch('getGroups');
						console.log('group')
			}
			},
		computed: {
		},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
