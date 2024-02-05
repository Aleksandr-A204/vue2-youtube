import Vue from "vue";
import Vuex from "vuex";

import authentication from "./module/authentication.js";
import category from "./module/category.js";
import info from "./module/info.js";
import record from "./module/record.js";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,

  state: {
    error: null
  },

  mutations: {
    setError(state, error) {
      state.error = error;
    },

    clearError(state) {
      state.error = null;
    }
  },

  actions: {
    async fetchCurrency() {
      const response = await fetch("http://data.fixer.io/api/latest?access_key=966a42fc3df71aac69d3d25ce905266c&format=1");

      return await response.json();
    }
  },

  getters: {
    error: state => state.error
  },

  modules: {
    authentication,
    category,
    info,
    record
  }
});
