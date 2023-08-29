import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useRetailersAvgResaleValueStore = defineStore(
  'retailersAvgResaleValue',
  {
    persist: true,
    state: () => {
      return {
        graph: [],
        is: {
          fetching: false,
        },
      };
    },
    getters: {},
    actions: {
      fetch(monthsAgo = 6) {
        return new Promise((resolve, reject) => {
          this.is.fetching = true;
          api
            .get('retailers/reporting/avg-resale-value/graph', {
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
  }
);
