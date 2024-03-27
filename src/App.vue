<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import Navi from "./components/Navi.vue";
// import ptcg from "./components/ptcg.vue";

export default {
  name: "App",
  components: {
    Navi,
  },
};
</script>

<style>
/* 样式规则 */
</style>