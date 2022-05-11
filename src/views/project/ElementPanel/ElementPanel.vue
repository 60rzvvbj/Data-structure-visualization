<template>
	<div class="elememtPanelRoot">
		<a-tabs v-model:activeKey="activeKey" animated :tabBarStyle="{ 'justify-content': 'space-around' }">
			<a-tab-pane key="1" tab="基本数据类型">
				<a-button v-for="item in baseDataType" @click="add('1', item)">{{ item }}</a-button>
			</a-tab-pane>
			<a-tab-pane key="2" tab="常见数据结构">
				<a-button v-for="item in commonDataStructures" @click="add('2', item)">{{ item }}</a-button>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script lang="js">
import { ref } from 'vue';

export default {
	name: 'ElementPanel',
	emits: ['add'],
	setup(props, ctx) {
		let activeKey = ref('1');

		let baseDataType = ['number', 'string', 'boolean'];
		let commonDataStructures = ['stack', 'queue'];

		function add(type, value) {
			ctx.emit('add', type, value);
		}

		return {
			activeKey,
			baseDataType,
			commonDataStructures,
			add,
		};
	}
};
</script>

<style scoped>
.elememtPanelRoot {
	width: 100%;
	height: 100%;
	box-shadow: 0px 0px 5px 0px #666;
	background-color: #fff;
}
</style>
<style>
.elememtPanelRoot .ant-tabs-nav-wrap {
	justify-content: space-around;
}
</style>
