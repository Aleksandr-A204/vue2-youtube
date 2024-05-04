<template>
  <div class="grey darken-1 empty-layout">
    <RouterView />
  </div>
</template>

<script>
import messages from "@/utils/messages";

export default {
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },

  watch: {
    error(fbError) {
      this.$error(messages[fbError.toString()] || "Что-то пошло не так");
    }
  }
};
</script>

<style scoped>

</style>
