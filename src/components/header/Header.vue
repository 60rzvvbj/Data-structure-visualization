<template>
	<div class="headerRoot">
		<div class="left"></div>
		<div class="center">数据结构可视化</div>
		<div class="right"></div>
	</div>
</template>

<script lang="js">

export default {
	name: 'Header',
	setup() {
		let msg = 'aaa';
		return {
			msg
		};
	}
};
</script>

<style scoped>
.headerRoot {
	--header-height: 60px;
	width: 100%;
	height: var(--header-height);
	background-color: #333;
}

.headerRoot .center {
	margin: auto;
	width: 200px;
	font-size: 24px;
	text-align: center;
	line-height: var(--header-height);
	color: #eee;
}
</style>
