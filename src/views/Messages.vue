<template>
  <div class="min-h-screen p-6 bg-gray-50">
    <h1 class="text-2xl font-bold mb-4">Messages</h1>
    <div v-if="loading" class="text-gray-500">Loading messages...</div>
    <div v-else>
      <div v-if="messages.length === 0" class="text-gray-400">No messages yet.</div>
      <div class="space-y-4">
        <div v-for="msg in messages" :key="msg._id"
          class="p-4 rounded-lg shadow-md bg-white flex justify-between items-center">
          <div>
            <p class="font-semibold">To: {{ msg.to }}</p>
            <p class="text-gray-700">{{ msg.body }}</p>
            <p class="text-xs text-gray-400">{{ formatDate(msg.created_at) }}</p>
          </div>
          <div class="text-sm text-gray-500">{{ msg.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed, watch } from "vue";
import { useMessagesStore } from "@/store/messages";
import { useUserStore } from "@/store/user";

export default {
  setup() {
    const messagesStore = useMessagesStore();
    const userStore = useUserStore();
    const loading = ref(true);

    const messages = computed(() => messagesStore.messages);

    const fetchMessages = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.log("No JWT found, skipping fetchMessages");
        loading.value = false;
        return;
      }

      try {
        await messagesStore.fetchMessages();
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchMessages();
    });

    watch(
      () => userStore.jwt,
      (newToken) => {
        if (newToken) {
          fetchMessages();
        }
      }
    );

    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleString();
    };

    return {
      messages,
      loading,
      formatDate,
    };
  },
};
</script>