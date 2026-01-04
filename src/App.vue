<template>
  <div>
    <Header v-if="isAuthenticated" />
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/store/user';
import Header from "@/components/Header.vue";

const userStore = useUserStore();
const isAuthenticated = computed(() => !!userStore.jwt);
</script>