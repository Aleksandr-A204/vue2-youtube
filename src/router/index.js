import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      meta: { layout: "main" },
      component: () => import("../views/HomeView.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: { layout: "empty" },
      component: () => import("../views/LoginView.vue")
    },
    {
      path: "/categories",
      name: "categories",
      meta: { layout: "main" },
      component: () => import("../views/CategoriesView.vue")
    },
    {
      path: "/history",
      name: "history",
      meta: { layout: "main" },
      component: () => import("../views/HistoryView.vue")
    },
    {
      path: "/planning",
      name: "planning",
      meta: { layout: "main" },
      component: () => import("../views/PlanningView.vue")
    },
    {
      path: "/profile",
      name: "profile",
      meta: { layout: "main" },
      component: () => import("../views/ProfileView.vue")
    },
    {
      path: "/record",
      name: "record",
      meta: { layout: "main" },
      component: () => import("../views/RecordView.vue")
    },
    {
      path: "/register",
      name: "register",
      meta: { layout: "empty" },
      component: () => import("../views/RegisterView.vue")
    },
    {
      path: "/detail/:id",
      name: "detail",
      meta: { layout: "main" },
      component: () => import("../views/DetailView.vue")
    }
  ]
});
