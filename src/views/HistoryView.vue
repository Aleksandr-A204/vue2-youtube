<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />

    <Loader v-if="loading" />

    <p
      v-else-if="!categories.length"
      class="center"
    >
      Записей пока нет
    </p>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable.vue";
import paginationsMixins from "@/mixins/paginations.mixins";
import { Bar } from "vue-chartjs";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { mapGetters } from "vuex";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  metaInfo() {
    return {
      title: this.$title("Menu_History")
    };
  },

  name: "History",

  components: {
    HistoryTable,
    Bar
  },

  mixins: [paginationsMixins],

  data() {
    return {
      chartOptions: {
        responsive: true
      }
    };
  },

  computed: {
    ...mapGetters({
      categories: "category/categories",
      records: "record/records"
    }),

    mapedRecords() {
      return this.categories.length ? this.records.map(record => {
        return {
          ...record,
          categoryName: this.categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === "income" ? "green" : "red",
          typeText: record.type === "income" ? "Доход" : "Расход"
        };
      }) : [];
    },

    loading() {
      return this.mapedRecords.length ? false : true;
    },

    chartData() {
      return {
        labels: this.categories.map(c => c.title),
        datasets: [{
          label: "Расходы по категориям",
          data: this.categories.map(c =>{
            return this.records.reduce((total, r)=>{
              if (r.categoryId === c.Id && r.type === "outcome") {
                total += +r.amount;
              }
              return total;
            }, 0);
          })
        }]
      };
    }
  },

  async created() {
    await this.$store.dispatch("record/fetchRecords");
    await this.$store.dispatch("category/fetchCategories");
  },

  mounted() {
    this.setupPagination(this.mapedRecords);
  }
};
</script>

<style scoped>

</style>
