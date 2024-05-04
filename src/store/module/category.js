import { child, getDatabase, onValue, push, ref, update } from "firebase/database";

export default {
  namespaced: true,

  state: {
    byId: {},
    title: "",
    categories: []
  },

  mutations: {
    setCategoryById(state, id) {
      state.byId = id;
    },

    setCategory(state, title) {
      state.title = title;
    },

    setCategories(state, categories) {
      state.categories = categories;
    }
  },

  actions: {
    async createCategory({ commit }, { title, limit }) {
      try {
        const uid = await this.dispatch("authentication/getUid");
        const category = await push(ref(getDatabase(), `/users/${uid}/categories`), { title, limit });
        return { title, limit, id: category.key };
      }
      catch (err) {
        this.commit("setError", err);
        console.log(commit);
        throw err;
      }
    },

    async updateCategory({ commit }, { id, limit, title }) {
      try {
        const uid = await this.dispatch("authentication/getUid");
        await update(child(ref(getDatabase(), `/users/${uid}/categories`), id), { title, limit });
      }
      catch (error) {
        this.commit("setError", error);
        console.log(commit);
        throw error;
      }
    },

    async fetchCategories({ commit }) {
      try {
        const uid = await this.dispatch("authentication/getUid");

        return onValue(ref(getDatabase(), `/users/${uid}/categories`), async snapshot => {
          const categories = snapshot.val() || {};
          await commit("setCategories", Object.keys(categories).map(key => ({ ...categories[key], id: key })));
        },
        {
          onlyOnce: true
        });
      }
      catch (err) {
        this.commit("setError", err);
        throw err;
      }
    },

    async fetchCategoryById({ commit }, id) {
      try {
        const uid = await this.dispatch("authentication/getUid");

        onValue(child(ref(getDatabase(), `/users/${uid}/categories`), id), async snapshot => {
          const category = snapshot.val() || {};
          await commit("setCategoryById", category);
        },
        {
          onlyOnce: true
        });
      }
      catch (err) {
        this.commit("setError", err);
        throw err;
      }
    }
  },

  getters: {
    categories(state) {
      return state.categories;
    },

    categoryById(state) {
      return state.byId;
    }
  }
};
