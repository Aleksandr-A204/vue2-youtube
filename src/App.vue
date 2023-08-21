<template>
  <div id="app">
    <Component :is="layout">
      <RouterView />
    </Component>
  </div>
</template>

<script>
import EmptyLayout from "./layouts/EmptyLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";

import M from "materialize-css";

export default {
  components: {
    MainLayout,
    EmptyLayout
  },

  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    }
  },

  mounted() {
    M.AutoInit();
  }
};
</script>

<style scoped lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
