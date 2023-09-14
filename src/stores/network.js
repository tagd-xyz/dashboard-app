import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useNetworkStore = defineStore('network', {
  persist: true,
  state: () => {
    return {
      interval: null,
      is: {
        apiOk: null,
        networkOk: null,
      },
    };
  },
  getters: {
    isAllOk() {
      return (null!=this.is.networkOk && !this.is.networkOk)
        && (null!==this.is.apiOk && !this.is.apiOk);
    },
    isNetworkDown() {
      return null!=this.is.networkOk && !this.is.networkOk;
    },
    isApiDown() {
      return !this.isNetworkDown && null!==this.is.apiOk && !this.is.apiOk;
    },
  },
  actions: {
    setInterval(interval) {
      this.interval = interval;
    },
    setNetworkOk(value) {
      this.is.networkOk = value;
    },
    fetchApiStatus() {
      return new Promise((resolve, reject) => {
        api
          .get('status', {
            transformRequest: (data, headers) => {
              delete headers.Authorization;
              return data;
            }
          })
          .then((response) => {
            this.is.apiOk = (200 == response.status);
            resolve(response);
          })
          .catch((error) => {
            this.is.apiOk = false;
            reject(error);
          });
      });
    },
  },
});
