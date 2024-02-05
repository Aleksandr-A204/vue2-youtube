<template>
  <div>
    <Loader v-if="loading" />
    <div
      v-else
      class="app-main-layout"
    >
      <Navbar @click="isOpen=!isOpen" />

      <Sidebar :value="isOpen" />

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
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";

import { mapGetters } from "vuex";

import _ from "lodash";

export default {
  name: "MainLayout",

  components: {
    Navbar,
    Sidebar
  },

  data() {
    return {
      isOpen: true,
      loading: true
    };
  },

  computed: {
    ...mapGetters({
      info: "info/info"
    })
  },

  async mounted() {
    if (_.isEmpty(this.info)) {
      await this.$store.dispatch("info/fetchInfo");
    }

    this.loading = false;
  }
};
</script>

<style scoped>

</style>
