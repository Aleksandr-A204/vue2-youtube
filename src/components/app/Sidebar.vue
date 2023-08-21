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
        { title: "Счет", url: "/", exact: true },
        { title: "История", url: "/history" },
        { title: "Планирование", url: "/planning" },
        { title: "Новая запись", url: "/record" },
        { title: "Категории", url: "/categories" }
      ]
    };
  }
};
</script>

<style scoped>

</style>
