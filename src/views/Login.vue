<script setup>
import { ref } from 'vue'
import { login } from '@/services/auth'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const email = ref('');
const password = ref('');
const router = useRouter();
const userStore = useUserStore();

async function handleLogin() {
  try {
    const { token, user } = await login(email.value, password.value);
    if (!token) throw new Error("No token");
    userStore.setUser(user, token);
    router.push('/messages')
  } catch (error) {
    alert("Invalid credentials")
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-sm p-6 bg-white rounded-xl shadow">
      <h1 class="text-2xl font-bold mb-4 bg-gray-200 text-center">Welcome to SMS Messenger</h1>
      <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
      <input v-model="email" type="email" placeholder="Enter your email" class="w-full mb-3 p-2 border rounded" />
      <input v-model="password" type="password" placeholder="Enter your password"
        class="w-full mb-4 p-2 border rounded" />
      <button @click="handleLogin" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Login
      </button>
      <button @click="router.push('/signup')" class="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700">
        Signup
      </button>
    </div>
  </div>
</template>