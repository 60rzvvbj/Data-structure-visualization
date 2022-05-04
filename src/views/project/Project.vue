<template>
	<div class="projectRoot">
		<Header></Header>
		<div class="content">
			<element-panel class="elementPanel"></element-panel>
		</div>
	</div>
</template>

<script lang="js">
import ElementPanel from "./ElementPanel/ElementPanel.vue";
import Header from '@/components/header/Header.vue';

export default {
	name: 'Project',
	components: {
		ElementPanel,
		Header
	},
	setup() {
		return {
		};
	}
};
</script>

<style scoped>
.projectRoot {
	display: flex;
	flex-flow: column nowrap;
	width: 100%;
	height: 100%;
	background-color: #666;
}

.projectRoot .content {
	flex: 1;

}

.projectRoot .elementPanel {
	width: 300px;
}
</style>
