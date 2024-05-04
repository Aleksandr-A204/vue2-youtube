<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button
        class="btn waves-effect waves-light btn-small"
        @click="refresh"
      >
        <Icon icon="material-symbols:refresh" />
      </button>
    </div>

    <Loader v-if="loading" />
    <div
      v-else
      class="row"
    >
      <HomeBill
        :rates="currency.rates"
      />

      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill.vue";
import HomeCurrency from "@/components/HomeCurrency.vue";

export default {
  metaInfo() {
    return {
      title: this.$title("Menu_Bill")
    };
  },

  components: {
    HomeBill,
    HomeCurrency
  },

  data() {
    return {
      loading: true,
      currency: null
    };
  },

  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  },

  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    }
  }
};
</script>

<style scoped>

</style>
