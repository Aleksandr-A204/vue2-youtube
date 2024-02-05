import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default {
  namespaced: true,

  actions: {
    async login({ commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
      }
      catch (err) {
        this.commit("setError", err);
        console.log(commit);
        throw err;
      }
    },

    async register({ dispatch }, { email, password, name }) {
      try {
        await createUserWithEmailAndPassword(getAuth(), email, password);
        const uid = await dispatch("getUid");
        await set(ref(getDatabase(), `/users/${uid}/info`), {
          bill: 10000,
          name: name
        });
      }
      catch (err) {
        this.commit("setError", err);
        throw err;
      }
    },

    getUid() {
      const user = getAuth().currentUser;
      return user ? user.uid : null;
    },

    async logout() {
      await signOut(getAuth());

      this.commit("info/clearInfo");
    }
  }
};
