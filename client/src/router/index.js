import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      layout: "main",
      auth: true,
      access: ["user", "admin", "god"],
    },
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../pages/AuthView.vue"),
    meta: {
      layout: "simple",
      auth: false,
      access: ["all", "user", "admin", "god"],
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../pages/SettingsView.vue"),
    meta: {
      layout: "main",
      auth: true,
      access: ["admin", "god"],
    },
  },
  {
    path: "/listeners",
    name: "listeners",
    component: () => import("../pages/ListenersView.vue"),
    meta: {
      layout: "main",
      auth: true,
      access: ["admin", "god", "user"],
    },
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../pages/UsersView.vue"),
    meta: {
      layout: "main",
      auth: true,
      access: ["admin", "god"],
    },
  },
  {
    path: "/orders-training-nk",
    name: "ordersTrainingNK",
    component: () => import("../pages/OrdersTrainingNKView.vue"),
    meta: {
      layout: "main",
      auth: true,
      access: ["admin", "god", "user"],
    },
  },
  {
    path: "/orders-training-nk/:id",
    name: "orderTrainingNK",
    component: () => import("../pages/OrderTrainingNKView.vue"),
    meta: {
      layout: "main",
      auth: false,
      access: ["all", "user", "admin", "god"],
    },
  },
  {
    path: "/add-order-training-nk",
    name: "createOrderTrainingNK",
    component: () => import("../pages/OrdersTrainingNKCreateView.vue"),
    meta: {
      layout: "main",
      auth: true,
      access: ["admin", "god", "user"],
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../pages/ProfileView.vue"),
    meta: {
      layout: "main",
      auth: true,
      access: ["user", "admin", "god"],
    },
  },
  {
    path: "/privacy-policy",
    name: "privacy Policy",
    component: () => import("../pages/PrivacyPolicyView.vue"),
    meta: {
      layout: "main",
      auth: false,
      access: ["all", "user", "admin", "god"],
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../pages/NotFoundView.vue"),
    meta: {
      layout: "main",
      auth: true,
      access: ["all", "user", "admin", "god"],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth;

  // если авторизация есть
  if (requireAuth && store.getters["auth/isAuthenticated"]) {
    //переходим на новую страницу
    next();
    //иначе если авторизация у пользователя отсутствует
  } else if (requireAuth && !store.getters["auth/isAuthenticated"]) {
    //пересылаем пользователя на страницу авторизации auth и выдаем сообщение
    next("/auth?message=auth");
  } else {
    next();
  }
});

router.resolve({
  name: "not-found",
  params: { pathMatch: ["not", "found"] },
}).href;

export default router;
