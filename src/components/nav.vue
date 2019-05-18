<template>
<div>
	<nav>
    <router-link to="/group">
		<a id="nav-notes" class="nav-item active" href="#">
			<i class="fas fa-tasks"></i>

			<h6>Groups</h6>
		</a>
        </router-link>

        <router-link to="/todo">
		<a id="nav-tasks" class="nav-item">
			<i class="fas fa-sticky-note"></i>

			<h6>Todos</h6>
		</a>	
        </router-link>

	</nav>
    </div>
</template>

<script>
export default {
  name: 'todoNav',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
