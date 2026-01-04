import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    jwt: localStorage.getItem("jwt") || null,
  }),
  actions: {
    setUser(userData, token) {
      this.user = userData;
      this.jwt = token;
      localStorage.setItem("jwt", token);
    },
    logout() {
      this.user = null;
      this.jwt = null;
      localStorage.removeItem("jwt");
    },
  },
});
