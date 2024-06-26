import { Icon } from "@iconify/vue2";

import Loader from "./Loader.vue";
import Paginate from "vuejs-paginate";

const Components = {
  Icon,
  Loader,
  Paginate
};

const install = function(Vue) {
  for (const prop in Components) {
    Vue.component(prop, Components[prop]);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

Components.install = install;
export default Components;
