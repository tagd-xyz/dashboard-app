import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useResellersReferenceStore = defineStore(
  'resellersReference',
  {
    persist: true,
    state: () => {
      return {
        brands: [],
        countries: [],
        is: {
          fetchingBrands: false,
          fetchingCountries: false,
        },
      };
    },
    getters: {},
    actions: {
      fetchBrands() {
        return new Promise((resolve, reject) => {
          this.is.fetchingBrands = true;
          api
            .get('resellers/reporting/ref/brands')
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
      fetchCountries() {
        return new Promise((resolve, reject) => {
          this.is.fetchingCountries = true;
          api
            .get('resellers/reporting/ref/countries')
            .then((response) => {
              this.countries = response.data.data;
              resolve(response);
            })
            .catch((error) => {
              this.countries = [];
              reject(error);
            })
            .finally(() => {
              this.is.fetchingCountries = false;
            });
        });
      },
    },
  }
);
