<template>
<div>
<v-card>
        <v-toolbar color="teal" dark>
          <v-toolbar-title>Invites</v-toolbar-title>
        </v-toolbar>

<v-container>
  <v-layout  row align-center justify-start fill-heigh>
    <v-flex xs4 md4 class="px-5 py-3">From</v-flex>
    <v-flex xs4 md4 class="px-5 py-3">Group</v-flex>
    <v-flex  xs4 md4 class="px-5 py-3">Actons</v-flex>
  </v-layout>
   <v-layout r row align-center justify-start fill-heigh v-for="item in items"  :key="item.id">
    <v-flex xs4 md4 class="px-5 py-3 ">{{ item.user_name }}</v-flex>
    <v-flex xs4 md4 class="px-5 py-3"> {{ item.name }}</v-flex>
    <v-flex xs4 md4 class="px-5 py-3">       
     <v-btn  color="primary" flat icon Outlined  @click.stop="acceptInvite(item.id)"> <v-icon>check</v-icon></v-btn>
     <v-btn  color="red" flat icon Outlined  @click.stop="rejectInvite(item.id)"> <v-icon>cancel</v-icon></v-btn>
</v-flex>
  </v-layout>
</v-container>
      </v-card>
</div>
</template>

<script>
export default {
    data() {
        return {
          items : ''
        }
    },
    methods : {
        acceptInvite(id){
         this.$store.dispatch('acceptInvite',{id:id})
         .then(response=>{

         })
         .catch(error=>{
             
         })
        },
        rejectInvite(id){

        },
    },
    created(){
        this.items = this.$store.state.invites
    }
}
</script>