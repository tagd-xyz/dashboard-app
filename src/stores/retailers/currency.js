import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useCurrencyStore = defineStore('retailersCurrency', {
  persist: true,
  state: () => {
    return {
      details: [],
      graph: [],
      is: {
        fetchingDetails: false,
        fetchingGraph: false,
      },
    };
  },
  getters: {},
  actions: {
    fetch(filter = {}) {
      return new Promise((resolve, reject) => {
        this.is.fetchingDetails = true;
        api
          .get('retailers/reporting/currency', {
            params: {
              ...filter,
            },
          })
          .then((response) => {
            this.details = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            this.details = [];
            reject(error);
          })
          .finally(() => {
            this.is.fetchingDetails = false;
          });
      });
    },
  },
});
