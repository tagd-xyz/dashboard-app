import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useRetailersTimeToTransferStore = defineStore(
  'retailersTimeToTransfer',
  {
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
    getters: {
      isFetching() {
        return this.is.fetchingDetails || this.is.fetchingGraph;
      },
      isEmpty() {
        return this.details.length === 0 && this.graph.length === 0;
      },
    },
    actions: {
      fetchList(page = 1, perPage = 10, filter = {}) {
        return new Promise((resolve, reject) => {
          this.is.fetchingDetails = true;
          api
            .get('retailers/reporting/time-to-transfer/list', {
              params: {
                ...filter,
                page,
                perPage,
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
      fetchGraph(filter = {}) {
        return new Promise((resolve, reject) => {
          this.is.fetchingGraph = true;
          api
            .get('retailers/reporting/time-to-transfer/graph', {
              params: filter,
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
              this.is.fetchingGraph = false;
            });
        });
      },
    },
  }
);
