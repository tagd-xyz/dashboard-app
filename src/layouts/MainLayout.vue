<template>
  <q-layout view="hHh lpR fFf" class="layout">
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <logo-component variant="dark" />
          Tagd Dashboard
        </q-toolbar-title>
        <q-btn-dropdown flat icon="person" :label="userName">
          <q-list bordered separator>
            <q-item
              clickable
              v-close-popup
              v-for="actor in me.actors"
              :key="actor.id"
              @click="onProfileClicked(actor.id)"
            >
              <q-item-section>
                <q-item-label>{{ actor.name }}</q-item-label>
                <q-item-label caption class="actor">{{
                  actor.type
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="showDialog = true">
              <q-item-section>
                <q-item-label>Sign Out</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>

      <q-tabs align="left" v-if="isRetailer">
        <q-route-tab to="/home" label="Home" />
        <q-route-tab to="/tags-issued" label="Tags Issued" />
        <q-route-tab to="/time-to-transfer" label="Time to transfer" />
        <q-route-tab to="/fraud-report" label="Fraud report" />
      </q-tabs>

      <q-tabs align="left" v-if="isReseller">
        <q-route-tab to="/home" label="Home" />
        <q-route-tab to="/time-to-transfer" label="Time to transfer" />
        <q-route-tab to="/fraud-report" label="Fraud report" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer style="background-color: transparent">
      <div class="q-ma-lg text-accent text-right">
        &copy; 2023 Tagd &nbsp;|&nbsp;
        <a href="support@tagd.co.uk" class="text-accent">support@tagd.co.uk</a>
        &nbsp;|&nbsp;
        <version />
      </div>
    </q-footer>

    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Do you want to sign out?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn
            flat
            label="Yes, sign out"
            color="primary"
            v-close-popup
            @click="onSignOutClicked"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LogoComponent from 'components/LogoComponent.vue';
import Version from 'components/Version.vue';
import { auth } from 'boot/firebase';
import { useAuthStore } from 'stores/auth';
import { useMeStore } from 'stores/me';

const router = useRouter();
const showDialog = ref(false);
const store = useAuthStore();
const storeMe = useMeStore();

const userName = computed(() => {
  return store.user.displayName;
});

const me = computed(() => {
  return storeMe.data;
});

const isReseller = computed(() => {
  return storeMe.isReseller;
});

const isRetailer = computed(() => {
  return storeMe.isRetailer;
});

function onSignOutClicked() {
  auth.signOut().then(() => {
    router.push({ name: 'signIn' });
  });
}

function onProfileClicked(actorId) {
  router.push({
    name: 'profileShow',
    params: {
      id: actorId,
    },
  });
}

onMounted(() => {
  storeMe.fetch();
});
</script>

<style scoped>
.actor {
  text-transform: capitalize;
}
</style>
