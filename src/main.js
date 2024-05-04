import App from "./App.vue";
import currencyFilter from "@/filters/currencyFilter";
import dateFilter from "@/filters/date.filter";
import localizeFilter from "@/filters/localize.filter";
import router from "./router";
import tooltipDirective from "@/directives/tooltip.directive";
import Vue from "vue";
import Vuelidate from "vuelidate";
import VueMeta from "vue-meta";

import "materialize-css/dist/js/materialize.min.js";

import components from "@/components/extended/components.js";
import messagePugin from "./utils/message.pugin";
import titlePlugin from "./utils/title.plugin";

import store from "./store/index.js";

import firebaseConfig from "./firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

Vue.config.productionTip = false;
Vue.use(components);

Vue.use(titlePlugin);
Vue.use(messagePugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);

Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);

Vue.directive("tooltip", tooltipDirective);

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
