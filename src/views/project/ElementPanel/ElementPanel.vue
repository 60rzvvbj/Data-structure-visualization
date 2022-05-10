<template>
	<div class="elememtPanelRoot">
		<a-tabs v-model:activeKey="activeKey" animated :tabBarStyle="{ 'justify-content': 'space-around' }">
			<a-tab-pane key="1" tab="基本数据类型">
				<a-button>number</a-button>
				<a-button>string</a-button>
				<a-button>boolean</a-button>
			</a-tab-pane>
			<a-tab-pane key="2" tab="常见数据结构">
				<a-button>stack</a-button>
				<a-button>queue</a-button>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script lang="js">
import { ref } from 'vue';

export default {
	name: 'ElementPanel',
	setup() {
		let activeKey = ref('1');
		return {
			activeKey
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
