<template>
  <div class="homeRoot">
    <div class="show" ref="showBox"></div>
    <div class="control">
      <div class="input" v-show="model == 'input'">
        <textarea class="scroll" v-model="codeText"></textarea>
        <div>
          <a-button type="primary" size="large" @click="submit">确定</a-button>
        </div>
      </div>
      <div class="display" v-show="model == 'debug'">
        <div class="code scroll" ref="codeBox"></div>
        <div>
          <a-button type="primary" size="large" @click="next">下一步</a-button>
        </div>
        <div class="console">
          <div class="title">控制台</div>
          <div class="consoleBox" ref="consoleBox"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
// import HelloWorld from "@/components/HelloWorld.vue";
import { ref, nextTick } from "vue";
import { create } from "@/core/index.js";

export default {
  name: "Home",
  components: {},
  setup() {
    let model = ref("input");
    let showBox = ref();
    let codeBox = ref();
    let consoleBox = ref();
    let engine;

    nextTick(() => {
      engine = create(showBox.value, codeBox.value, consoleBox.value);
    });

    let codeText = ref("");

    function submit() {
      // console.log(codeText.value);
      let res = engine.handelInput(codeText.value);
      if (!res) {
        alert("error");
      } else {
        model.value = "debug";
      }
    }

    function next() {
      engine.next();
    }

    return {
      model,
      codeText,
      showBox,
      codeBox,
      consoleBox,
      submit,
      next,
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
  border: 2px solid yellow;
  box-sizing: border-box;
  background-color: #333;
}

.control {
  flex: 1;
}

.control .input {
  height: 100%;
}

.control textarea,
.control .display .code {
  width: 100%;
  height: 40%;
  border: 0px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 30px;
  color: #eee;
  background-color: #666;
  overflow-y: scroll;
  resize: none;
}

.control .display {
  height: 100%;
}

.control .display .console {
  height: 40%;
  background-color: #666;
  border: 2px solid yellow;
  border-left: 0px;
  font-size: 24px;
  color: #eee;
}

.control .display .console .title {
  padding: 10px;
  box-sizing: border-box;
  background-color: #333;
}

.control .display .console .consoleBox {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #666;
}
</style>
