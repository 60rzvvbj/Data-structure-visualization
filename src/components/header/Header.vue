<template>
	<div class="headerRoot">
		<div class="main">
			<div class="left"></div>
			<div class="center">数据结构可视化</div>
			<div class="right"></div>
		</div>
		<div class="full"></div>
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
}

.headerRoot .main {
	position: absolute;
	width: 100%;
	height: var(--header-height);
	z-index: 100;
	background-color: #eee;
}

.headerRoot .center {
	margin: auto;
	width: 200px;
	font-size: 24px;
	text-align: center;
	line-height: var(--header-height);
	/* color: #eee; */
}

.headerRoot .full {
	height: var(--header-height);
}
</style>
