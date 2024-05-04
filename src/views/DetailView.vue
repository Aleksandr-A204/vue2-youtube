<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="validRecord">
      <div class="breadcrumb-wrap">
        <RouterLink
          to="/history"
          class="breadcrumb"
        >
          История
        </RouterLink>
        <a
          class="breadcrumb"
          @click.prevent
        >
          {{ validRecord.type ==="income" ? "Доход" : "Расход" }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{'red': validRecord.type === 'outcome', 'green': validRecord.type === 'income'}"
          >
            <div class="card-content white-text">
              <p>Описание: {{ validRecord.description }}</p>
              <p>Сумма: {{ validRecord.amount }}</p>
              <p>Категория: {{ validRecord.categoryName }}</p>

              <small>{{ validRecord.date | date("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p
      v-else
      class="center"
    >
      Запись с id={{ $route.params.id }} не найдена
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  metaInfo() {
    return {
      title: this.$title("Detail_Title")
    };
  },

  name: "Detail",

  data: () => {
    return {
      loading: true
    };
  },

  computed: {
    ...mapGetters({
      record: "record/recordById",
      category: "category/categoryById"
    }),

    validRecord() {
      return { ...this.record, categoryName: this.category.title };
    }
  },

  watch: {
    record: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch("category/fetchCategoryById", value.categoryId);
        }
      }
    }
  },

  async mounted() {
    await this.fetchRecordById(this.$route.params.id);

    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchRecordById: "record/fetchRecordById",
      fetchCategoryById: "category/fetchCategoryById"
    })
  }
};
</script>

<style scoped>

</style>
