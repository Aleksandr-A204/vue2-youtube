<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p
          v-for="currency of currencies"
          :key="currency"
          class="currency-line"
        >
          <span>{{ getCurrency(currency) | currency(currency) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    rates: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      currencies: ["RUB", "USD", "EUR"]
    };
  },

  computed: {
    ...mapGetters({
      info: "info/info"
    }),

    base() {
      return this.info.bill / (this.rates["RUB"] / this.rates["EUR"]);
    }
  },

  methods: {
    getCurrency(currency) {
      //console.log(currency);
      return Math.floor(this.base * this.rates[currency]);
    }
  }
};
</script>

<style scoped>

</style>
