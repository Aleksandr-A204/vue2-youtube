import Vue from "vue";
import VueRouter from "vue-router";
import { getAuth } from "firebase/auth";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      meta: { layout: "main", auth: true },
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
      meta: { layout: "main", auth: true },
      component: () => import("../views/CategoriesView.vue")
    },
    {
      path: "/history",
      name: "history",
      meta: { layout: "main", auth: true },
      component: () => import("../views/HistoryView.vue")
    },
    {
      path: "/planning",
      name: "planning",
      meta: { layout: "main", auth: true },
      component: () => import("../views/PlanningView.vue")
    },
    {
      path: "/profile",
      name: "profile",
      meta: { layout: "main", auth: true },
      component: () => import("../views/ProfileView.vue")
    },
    {
      path: "/record",
      name: "record",
      meta: { layout: "main", auth: true },
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
      meta: { layout: "main", auth: true },
      component: () => import("../views/DetailView.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login?message=login");
  }
  else {
    next();
  }
});

export default router;
