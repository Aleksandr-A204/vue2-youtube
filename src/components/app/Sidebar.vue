<template>
  <ul
    class="sidenav app-sidenav"
    :class="{open: value}"
  >
    <li
      v-for="link of links"
      :key="link.url"
    >
      <RouterLink
        active-class="active"
        :to="link.url"
        custom
        :exact="link.exact"
      >
        {{ link.title }}
      </RouterLink>
    </li>
  </ul>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      links: [
        { title: localizeFilter("Menu_Bill"), url: "/", exact: true },
        { title: localizeFilter("Menu_History"), url: "/history" },
        { title: localizeFilter("Menu_Planning"), url: "/planning" },
        { title: localizeFilter("Menu_NewRecord"), url: "/record" },
        { title: localizeFilter("Menu_Categories"), url: "/categories" }
      ]
    };
  }
};
</script>

<style scoped>

</style>
