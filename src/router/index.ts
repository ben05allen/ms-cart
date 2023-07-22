import { createRouter, createWebHistory } from "vue-router";

import Products from "@/views/products/products.vue";
import About from "@/views/about.vue";

const routes = [
  {
    path: "/",
    redirect: "/products",
  },
  {
    path: "/products",
    name: "products",
    component: Products,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
