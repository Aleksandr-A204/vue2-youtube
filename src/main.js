import App from "./App.vue";
import router from "./router";
import Vue from "vue";

import dateFilter from "@/filters/date.filter";
import "materialize-css/dist/js/materialize.min.js";

import components from "@/components/extended/components.js";

Vue.config.productionTip = false;
Vue.use(components);

Vue.filter("date", dateFilter);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
