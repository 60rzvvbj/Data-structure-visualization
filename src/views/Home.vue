<template>
	<div class="homeRoot">
		<a-button @click="toProject">Project</a-button>
	</div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
	name: "Home",
	components: {},
	setup() {
		let router = useRouter();
		function toProject() {
			router.push('/project');
		}
		return {
			toProject
		};
	},
};
</script>

<style scoped>
.homeRoot {
	display: flex;
	height: 100%;
}

.show {
	width: 60%;
	background-color: pink;
}

.control {
	flex: 1;
	background-color: skyblue;
}
</style>
