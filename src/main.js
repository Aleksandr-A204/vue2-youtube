import App from "./App.vue";
import router from "./router";
import Vue from "vue";
import Vuelidate from "vuelidate";

import currencyFilter from "@/filters/currencyFilter";
import dateFilter from "@/filters/date.filter";

import "materialize-css/dist/js/materialize.min.js";

import components from "@/components/extended/components.js";

import messagePugin from "./utils/message.pugin";

import store from "./store/index.js";

import firebaseConfig from "./firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

Vue.config.productionTip = false;
Vue.use(components);

Vue.use(messagePugin);
Vue.use(Vuelidate);

Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);

initializeApp(firebaseConfig);

let app;

onAuthStateChanged(getAuth(), () => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
