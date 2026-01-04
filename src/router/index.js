import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Messages from "@/views/Messages.vue";
import SendMessage from "@/views/SendMessage.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/messages", component: Messages },
  { path: "/send", component: SendMessage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const token = localStorage.getItem("jwt");

  if (to.meta.requiresAuth && !token) {
    return "/login";
  }

  if (to.path === "/login" && token) {
    return "/messages";
  }
});

export default router;
