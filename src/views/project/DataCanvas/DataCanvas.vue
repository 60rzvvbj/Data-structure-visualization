<template>
	<div class="dataCanvasRoot">
	</div>
</template>

<script lang="js">
import { ref, watch } from 'vue';
import { object } from 'vue-types';

export default {
	name: 'DataCanvas',
	props: {
		data: object
	},
	setup(props, ctx) {
		watch(props.data, () => {
			console.log(JSON.stringify(props.data));
		});
		return {
		};
	}
};
</script>

<style scoped>
</style>
