<template>
	<div class="projectRoot">
		<Header></Header>
		<div class="content">
			<element-panel class="elementPanel" @add="addElement"></element-panel>
			<data-canvas :data="data"></data-canvas>
		</div>
		<a-modal v-model:visible="inputDataNameVisible" @cancel="handleInputName(false)" @ok="handleInputName(true)"
			:closable="false">
			<a-input v-model:value="addElementData.name" allowClear placeholder="请输入变量名"></a-input>
		</a-modal>
	</div>
</template>

<script lang="js">
import Header from '@/components/header/Header.vue';
import ElementPanel from "./ElementPanel/ElementPanel.vue";
import DataCanvas from './DataCanvas/DataCanvas.vue';
import { reactive, ref } from "vue";

export default {
	name: 'Project',
	components: {
		Header,
		ElementPanel,
		DataCanvas,
	},
	setup() {
		let projectName = "projectName";
		let data = reactive([]);
		let dataMap = {};
		let inputDataNameVisible = ref(false);
		let addElementData = reactive({});

		function addElement(type, value) {
			inputDataNameVisible.value = true;
			addElementData.belong = type;
			addElementData.type = value;
			addElementData.name = '';
			addElementData.value = null;
		};

		function handleInputName(type) {
			if (type) {
				if (addElementData.name != '') {
					// console.log(addElementData);
					dataMap[addElementData.name] = {
						...addElementData
					};
					data.push(dataMap[addElementData.name]);
					addElementData.name = '';
				}
			}
			inputDataNameVisible.value = false;
		}

		return {
			data,
			inputDataNameVisible,
			addElement,
			addElementData,
			handleInputName,
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
	background-color: #fff;
}

.projectRoot .content {
	flex: 1;
}

.projectRoot .elementPanel {
	width: 300px;
}
</style>
