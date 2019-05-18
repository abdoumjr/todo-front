<template>

<div>
	<ul id="groups" class="visible">
		<li class="group">
			<p>group1</p>
		</li>
    <li class="group">
			<p>group2</p>
		</li>
	</ul>

</div>
</template>

<script>
export default {
  name: 'Group',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
