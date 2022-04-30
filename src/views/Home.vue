<template>
  <div class="homeRoot">
    <div class="show"></div>
    <div class="control"></div>
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {},
  setup() {},
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
