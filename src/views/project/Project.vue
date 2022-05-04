<template>
	<div>
		{{ msg }}
	</div>
</template>

<script lang="js">

export default {
	name: 'Project',
	setup() {
		let msg = 'aaa';
		return {
			msg
		};
	}
};
</script>

<style scoped>
</style>
