<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <logo-component height="3rem" />
      <q-space />
      <div class="q-mt-sm q-mb-lg text-caption">
        <b>DASHBOARD</b>
        &nbsp;
        <version />
      </div>
      <q-space />
      <q-btn-toggle
        v-model="tenant"
        color="light-grey"
        text-color="dark-grey"
        toggle-color="white"
        toggle-text-color="primary"
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
import Version from 'components/Version.vue';

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
