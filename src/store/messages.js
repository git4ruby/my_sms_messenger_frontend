import { defineStore } from "pinia";
import api from "@/services/api";

export const useMessagesStore = defineStore("messages", {
  state: () => ({
    messages: [],
  }),
  actions: {
    async fetchMessages() {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.log("No JWT found, skipping fetchMessages");
        return;
      }

      try {
        const res = await api.get("/api/messages");
        this.messages = res.data;
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    },

    async sendMessage(to, body) {
      try {
        const res = await api.post("/api/messages", { to, body });
        this.messages.unshift(res.data);
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    },
  },
});
