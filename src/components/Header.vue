<template>
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <h1 class="text-xl font-bold">SMS Messenger</h1>

    <div class="space-x-4">
      <router-link to="/messages"
        class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">Messages</router-link>
      <router-link to="/send" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">Send
        Message</router-link>
      <button @click="logout" class="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Logout</button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

const router = useRouter();
const userStore = useUserStore();

const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>
