import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useRetailersPopularResellersStore = defineStore(
  'retailersPopularResellers',
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
    getters: {
      isFetching() {
        return this.is.fetching;
      },
      isEmpty() {
        return this.details.length === 0;
      },
    },
    actions: {
      fetch() {
        return new Promise((resolve, reject) => {
          this.is.fetching = true;
          api
            .get('retailers/reporting/popular-resellers/list')
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
