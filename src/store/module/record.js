import { child, getDatabase, onValue, push, ref } from "firebase/database";

export default {
  namespaced: true,

  state: {
    records: [],
    byId: null
  },

  mutations: {
    setRecords(state, records) {
      state.records = records;
    },

    setRecord(state, byId) {
      state.byId = byId;
    }
  },

  actions: {
    async createRecord({ commit }, record) {
      try {
        const uid = await this.dispatch("authentication/getUid");
        return await push(ref(getDatabase(), `/users/${uid}/records`), record);
      }
      catch (e) {
        console.log(commit);
        this.commit("setError", e);
        throw e;
      }
    },

    async fetchRecords({ commit }) {
      try {
        const uid = await this.dispatch("authentication/getUid");

        return onValue(ref(getDatabase(), `/users/${uid}/records`), async snapshot => {
          const records = snapshot.val() || {};
          await commit("setRecords", Object.keys(records).map(key => ({ ...records[key], id: key })));
        },
        {
          onlyOnce: true
        });
      }
      catch (e) {
        this.commit("setError", e);
        throw e;
      }
    },

    async fetchRecordById({ commit }, id) {
      try {
        const uid = await this.dispatch("authentication/getUid");

        onValue(child(ref(getDatabase(), `/users/${uid}/records`), id), async snapshot => {
          const record = snapshot.val() || {};
          await commit("setRecord", record);
        },
        {
          onlyOnce: true
        });
      }
      catch (e) {
        this.commit("setError", e);
        throw e;
      }
    }
  },

  getters: {
    records(state) {
      return state.records;
    },

    recordById(state) {
      return state.byId;
    }
  }
};
