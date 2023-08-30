import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useRetailersReturnRateStore = defineStore('retailersReturnRate', {
  persist: true,
  state: () => {
    return {
      graph: [],
      is: {
        fetching: false,
      },
    };
  },
  getters: {
    isFetching() {
      return this.is.fetching;
    },
    isEmpty() {
      return this.graph.length === 0;
    },
  },
  actions: {
    fetch(monthsAgo = 6) {
      return new Promise((resolve, reject) => {
        this.is.fetching = true;
        api
          .get('retailers/reporting/return-rate/graph', {
            params: {
              monthsAgo,
            },
          })
          .then((response) => {
            this.graph = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            this.graph = [];
            reject(error);
          })
          .finally(() => {
            this.is.fetching = false;
          });
      });
    },
  },
});
