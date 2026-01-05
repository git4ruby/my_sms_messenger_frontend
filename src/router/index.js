import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Messages from "@/views/Messages.vue";
import SendMessage from "@/views/SendMessage.vue";
import Signup from "@/views/Signup.vue";

const routes = [
  { path: "/", redirect: "/login", meta: { guestOnly: true } },
  { path: "/login", component: Login, meta: { guestOnly: true } },
  { path: "/signup", component: Signup, meta: { guestOnly: true } },
  { path: "/messages", component: Messages, meta: { requiresAuth: true } },
  { path: "/send", component: SendMessage, meta: { requiresAuth: true } },
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
