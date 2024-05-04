<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill | currency('RUB') }}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categoires.length">
      Категорий пока нет. <RouterLink to="/categories">
        Добавить новую категорию
      </RouterLink>
    </p>

    <section v-else>
      <div
        v-for="category of categoires"
        :key="category.id"
      >
        <p>
          <strong>{{ category.title }}:</strong>
          {{ category.spend | currency }} из {{ category.limit | currency }}
        </p>
        <div
          v-tooltip="category.tooltip"
          class="progress"
        >
          <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{width: category.progressPercent + '%'}"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import currencyFilter from "@/filters/currencyFilter";
import { mapGetters } from "vuex";

export default {
  metaInfo() {
    return {
      title: this.$title("Menu_Planning")
    };
  },

  name: "Planning",

  data: () => ({
    loading: true
  }),

  computed: {
    ...mapGetters({
      categories: "category/categories",
      records: "record/records",
      info: "info/info"
    }),

    categoires() {
      return this.categories.map(cat => {
        const spend = this.records
          .filter(r => r.categoryId === cat.id)
          .filter(r => r.type === "outcome")
          .reduce((total, record) => {
            return total += +record.amount;
          }, 0);

        const percent = 100 * spend / cat.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor = percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

        const tooltipValue = cat.limit - spend;
        const tooltip = `${tooltipValue < 0 ? "Превышение на" : "Осталось"} ${currencyFilter(Math.abs(tooltipValue))}`;

        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip
        };
      });
    }
  },

  async created() {
    await this.$store.dispatch("record/fetchRecords");
    await this.$store.dispatch("category/fetchCategories");

    this.loading = false;
  }
};
</script>

<style scoped>

</style>
