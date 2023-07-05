import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useMeStore = defineStore('me', {
  persist: true,
  state: () => {
    return {
      data: {},
      is: {
        fetching: false,
        updating: false,
      },
    };
  },
  getters: {
    isReseller() {
      return this.data?.actors?.some((actor) => actor.type === 'reseller');
    },
    isRetailer() {
      return this.data?.actors?.some((actor) => actor.type === 'retailer');
    },
  },
  actions: {
    fetch() {
      return new Promise((resolve, reject) => {
        this.is.fetching = true;
        api
          .get('me')
          .then((response) => {
            this.data = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            this.data = null;
            reject(error);
          })
          .finally(() => {
            this.is.fetching = false;
          });
      });
    },
    update(resellerId, payload) {
      return new Promise((resolve, reject) => {
        this.is.updating = true;
        api
          .put('resellers/' + resellerId, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            this.is.updating = false;
          });
      });
    },
    requestAvatarUpload(resellerId, fileName) {
      return new Promise((resolve, reject) => {
        api
          .post('resellers/' + resellerId + '/uploads', {
            fileName: fileName,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
