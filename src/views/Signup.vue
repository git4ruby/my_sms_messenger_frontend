<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md p-6 border rounded">
      <h1 class="text-xl font-bold mb-4">Sign Up</h1>
      <input v-model="email" class="input" placeholder="Enter Email" /> <br />
      <input v-model="password" type="password" class="input" placeholder="Enter Password" /> <br />
      <input v-model="passwordConfirmation" type="password" class="input" placeholder="Confirm Password" />
      <p v-if="success" class="text-green-600 mt-2">{{ success }}</p>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      <button class="btn-primary mt-4 w-full" @click="signup">
        Create Account
      </button>
      <p class="mt-4 text-sm text-center">
        Already have an account?
        <router-link to="/login" class="text-blue-600">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const error = ref("");
const success = ref("");

const router = useRouter();

const signup = async () => {
  error.value = ""
  try {
    const res = await api.post("/users", {
      user: {
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value
      }
    });

    success.value = "Account created successfully. Redirecting to login page";
    setTimeout(() => {
      router.push("/login")
    }, 2000);
  } catch (e) {
    error.value =
      e.response?.data?.errors?.join(",") ||
      "Signup failed"
  }
}
</script>