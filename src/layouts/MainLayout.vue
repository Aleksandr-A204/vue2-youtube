<template>
  <div class="app-main-layout">
    <Navbar @click="isOpen=!isOpen" />

    <Sidebar v-model="isOpen" />

    <main
      class="app-content"
      :class="{full: !isOpen}"
    >
      <div class="app-page">
        <RouterView />
      </div>
    </main>

    <div class="fixed-action-btn">
      <RouterLink
        class="btn-floating btn-large blue"
        to="/record"
      >
        <Icon
          icon="material-symbols:add"
          width="24"
          height="24"
        />
      </RouterLink>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";


export default {
  name: "MainLayout",

  components: {
    Navbar,
    Sidebar
  },

  data() {
    return {
      isOpen: true
    };
  }
};
</script>

<style scoped>

</style>
