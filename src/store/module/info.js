import { getDatabase, onValue, ref } from "firebase/database";

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
        console.error(error);
      }
    }
  },

  getters: {
    info: state => state.info
  }
};
