import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { router } from "@/router";
import { useAlertStore } from "@/stores";

import axios from "axios";
const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const user = await axios.post(
          `http://localhost:7104/api/Authenticate/login`,
          {
            username,
            password,
          }
        );

        // update pinia state
        this.user = user;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("username", JSON.stringify(username));

        // redirect to previous url or default to home page
        router.push(this.returnUrl || "/");
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async register(username, email, password) {
      try {
        const user = await axios.post(
          `http://localhost:7104/api/Authenticate/register`,
          {
            username,
            email,
            password,
          }
        );

        router.push(this.returnUrl || "/");
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/account/login");
    },
  },
});
