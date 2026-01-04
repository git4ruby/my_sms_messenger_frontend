<template>
  <div class="min-h-screen p-6 bg-gray-50 flex flex-col items-center justify-center">
    <h1 class="text-2xl font-bold mb-6">Send Message</h1>

    <form @submit.prevent="handleSubmit" class="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label class="block text-gray-700 font-semibold mb-1" for="to">To:</label>
        <input type="text" id="to" v-model="to" placeholder="+1xxxxxxxxxx"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required />
      </div>

      <div>
        <label class="block text-gray-700 font-semibold mb-1" for="body">Message:</label>
        <textarea id="body" v-model="body" placeholder="Type your message..."
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4" required></textarea>
      </div>

      <button type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        :disabled="sending">
        {{ sending ? "Sending..." : "Send Message" }}
      </button>

      <p v-if="success" class="text-green-600 font-semibold mt-2">Message sent successfully!</p>
      <p v-if="error" class="text-red-600 font-semibold mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMessagesStore } from "@/store/messages";

export default {
  setup() {
    const messagesStore = useMessagesStore();

    const to = ref("");
    const body = ref("");
    const sending = ref(false);
    const success = ref(false);
    const error = ref("");

    const handleSubmit = async () => {
      sending.value = true;
      success.value = false;
      error.value = "";

      try {
        await messagesStore.sendMessage(to.value, body.value);
        success.value = true;
        to.value = "";
        body.value = "";
      } catch (err) {
        error.value = "Failed to send message.";
        console.error(err);
      } finally {
        sending.value = false;
      }
    };

    return { to, body, sending, success, error, handleSubmit };
  },
};
</script>
