import { getDatabase, push, ref } from "firebase/database";

export default {
  namespaced: true,

  actions: {
    async createRecord({ dispanch, commit }, record) {
      try {
        const uid = await dispanch("getUid");
        return await push(ref(getDatabase(), `/users/${uid}/categories`), record);
      }
      catch (e) {
        commit("setError", e);
        throw e;
      }
    }
  }
};
