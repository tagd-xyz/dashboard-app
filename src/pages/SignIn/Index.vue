<template>
  <q-page class="flex flex-center">
    <div class="text-right">
      <logo-component height="75px" class="q-ma-lg" />
      <h4 class="q-mr-lg text-primary">Dashboard</h4>
    </div>
    <div>
      <q-btn-toggle
        unelevated
        class="q-mb-sm"
        v-model="tenant"
        toggle-color="primary"
        :options="[
          { label: 'I am a Reseller', value: 'resellers' },
          { label: 'I am a Retailer', value: 'retailers' },
        ]"
        @update:model-value="onTenantChange"
      />
      <div id="firebaseui-auth-container"></div>
    </div>
  </q-page>
</template>

<script setup>
import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css';
import { ref, onMounted } from 'vue';
import { auth, authUI } from 'boot/firebase';
import { useRouter } from 'vue-router';
import LogoComponent from 'components/LogoComponent.vue';

const router = useRouter();

const tenant = ref('resellers');

function setAuthTenant() {
  const config = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/splash',
    callbacks: {
      signInSuccessWithAuthResult() {
        return true;
      },
    },
  };

  if ('resellers' == tenant.value) {
    auth.tenantId = process.env.FIREBASE_TENANT_ID_RESELLERS;
  } else {
    auth.tenantId = process.env.FIREBASE_TENANT_ID_RETAILERS;
  }
  authUI.reset();
  authUI.start('#firebaseui-auth-container', config);
}

function onTenantChange() {
  setAuthTenant();
}

onMounted(() => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // user is logged in, redirect
      router.push({ name: 'splash' });
    } else {
      // user is logged out, start FirebaseUI
      setAuthTenant();
    }
  });
});
</script>
