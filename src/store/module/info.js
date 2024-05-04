import { getDatabase, onValue, ref, update } from "firebase/database";

export default {
  namespaced: true,

  state: {
    info: {}
  },

  mutations: {
    setInfo(state, info) {
      state.info = info;
    },

    clearInfo(state) {
      state.info = {};
    }
  },

  actions: {
    async updateInfo({ commit, getters }, toUpdate) {
      try {
        const uid = await this.dispatch("authentication/getUid");
        const updateData = { ...getters.info, ...toUpdate };
        commit("setInfo", updateData);
        return update(ref(getDatabase(), `/users/${uid}/info`), updateData);
      }
      catch (error) {
        this.commit("setError", error);
        throw error;
      }
    },

    async fetchInfo() {
      try {
        const uid = await this.dispatch("authentication/getUid");
        return onValue(ref(getDatabase(), `/users/${uid}/info`), snapshot => {
          this.commit("info/setInfo", snapshot.val());
        }, {
          onlyOnce: true
        });
      }
      catch (error) {
        this.commit("setError", error);
        throw error;
      }
    }
  },

  getters: {
    info: state => state.info
  }
};
