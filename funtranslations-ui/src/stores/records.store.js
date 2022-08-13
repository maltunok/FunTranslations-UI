import { defineStore } from "pinia";

import axios from "axios";

export const useRecordsStore = defineStore({
  id: "users",
  state: () => ({
    records: {},
    record: {},
  }),
  actions: {
    async getAll() {
      this.records = { loading: true };
      let url = `http://localhost:7104/api/Translations?perPage=10&page=1`;
      try {
        this.records = await axios.get(url);
      } catch (error) {
        this.records = { error };
      }
    },
    async get(text, apitype) {
      this.record = { loading: true };
      let url = `http://localhost:7104/api/Translations`;
      try {
        const record = await axios.post(`${url}`, {
          text,
          apitype,
        });
        this.record = record;
      } catch (error) {
        this.record = { error };
      }
    },
  },
});
