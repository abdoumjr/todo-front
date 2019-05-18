<template>

<div>
	<ul id="tasks" class="visible">
	  <li v-for="item in todos" class="tasks">
    {{ item.value }}
    </li>
	</ul>

</div>
</template>

<script>
export default {
  name: 'Todo',
  data () {
      return {
      newTodo: '',
      todos: [
          {
              id : '1',
              value : 'one'
          },
           {
              id : '2',
              value : 'two'
          }
      ]
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
