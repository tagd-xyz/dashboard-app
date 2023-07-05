import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useReferenceStore = defineStore('reference', {
  persist: true,
  state: () => {
    return {
      brands: [],
      is: {
        fetchingBrands: false,
      },
    };
  },
  getters: {},
  actions: {
    fetchBrands() {
      return new Promise((resolve, reject) => {
        this.is.fetchingBrands = true;
        api
          .get('retailers/reporting/ref/brands')
          .then((response) => {
            this.brands = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            this.brands = [];
            reject(error);
          })
          .finally(() => {
            this.is.fetchingBrands = false;
          });
      });
    },
  },
});
