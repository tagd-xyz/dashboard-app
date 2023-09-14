<template>
    <div
      class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
    >
      <div>
        <q-icon name="cloud_off" size="xl" style="opacity: 0.4" />

        <!-- <div style="font-size: 30vh">Error</div> -->

        <div class="text-h4" style="opacity: 0.4">We have a little problem.</div>

        <div class="text-h6 q-ma-xl" style="opacity: 0.4">
          Our servers are currently down, please wait a few minutes.
        </div>

        <q-btn
          color="white"
          text-color="primary"
          unelevated
          label="Check"
          @click="check"
          :loading="isChecking"
        />
      </div>
    </div>
  </template>

  <script setup>
  import { useNetworkStore } from 'stores/network';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const store = useNetworkStore();
  const router = useRouter();

  const isChecking = ref(false);

  function check() {
    isChecking.value = true;
    store
      .fetchApiStatus()
      .then(() => {
        router.push('/splash');
      })
      .finally(() => {
        isChecking.value = false;
      });
  }
  </script>
