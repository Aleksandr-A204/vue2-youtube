<template>
  <div class="page">
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div
        v-else
        class="row"
      >
        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit
          v-if="categories.length"
          :key="categories.length + updateCount"
          :categories="categories"
          @updated="updatedCategories"
        />
        <p
          v-else
          class="center"
        >
          Категорий пока нет
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate.vue";
import CategoryEdit from "@/components/CategoryEdit.vue";
import { mapGetters } from "vuex";

export default {
  metaInfo() {
    return {
      title: this.$title("Menu_Categories")
    };
  },

  components: {
    CategoryCreate,
    CategoryEdit
  },

  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    };
  },

  computed: {
    ...mapGetters({
      categoriesFromVuex: "category/categories"
    })
  },

  watch: {
    categoriesFromVuex: {
      immediate: true,
      handler(elements) {
        this.categories = elements;
      }
    }
  },

  async mounted() {
    await this.$store.dispatch("category/fetchCategories");
    this.loading = false;
  },

  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },

    updatedCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    }
  }
};
</script>

<style scoped>
</style>
