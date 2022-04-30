<template>
  <div class="homeRoot">
    <div class="show" ref="show"></div>
    <div class="control">
      <div class="input" v-if="model == 'input'">
        <textarea v-model="codeText"></textarea>
        <button @click="submit">确定</button>
      </div>
      <div class="display" v-else>
        <div class="code"></div>
        <button @click="next">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";
import { ref, nextTick } from "vue";
import { create } from "@/core/core.js";

export default {
  name: "Home",
  components: {},
  setup() {
    let model = ref("input");
    let show = ref();
    let engine;

    nextTick(() => {
      engine = create(show.value);
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
      show,
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
  background-color: pink;
}

.control {
  flex: 1;
  background-color: skyblue;
}

.control .input {
  height: 100%;
}

.control textarea {
  width: 100%;
  height: 40%;
  font-size: 30px;
}

.control button {
  font-size: 30px;
}
</style>
