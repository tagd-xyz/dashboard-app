import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useRetailersResaleFrequencyStore = defineStore(
  'retailersResaleFrequency',
  {
    persist: true,
    state: () => {
      return {
        details: [],
        is: {
          fetching: false,
        },
      };
    },
    getters: {},
    actions: {
      fetch() {
        return new Promise((resolve, reject) => {
          this.is.fetching = true;
          api
            .get('retailers/reporting/resale-frequency/list')
            .then((response) => {
              this.details = response.data.data;
              resolve(response);
            })
            .catch((error) => {
              this.details = [];
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
