<template>
  <div class="q-pa-lg">
    <div class="text-h5 q-mx-md text-bold">Welcome, {{ myName }}</div>
    <div class="text-accent q-mx-md">This is your dashboard at {{ today }}</div>
    <q-separator class="q-my-lg"/>
    <div class="row">
      <div class="col q-ma-sm" v-if="isRetailer">
        <return-rate/>
      </div>
      <div class="col q-ma-sm">
        <avg-resale-value />
      </div>
    </div>
    <div class="row">
      <div class="col q-ma-sm">
        <popular-categories />
      </div>
      <div class="col q-ma-sm">
        <highest-resale-freq />
      </div>
      <div class="col q-ma-sm">
        <popular-resale-platforms />
      </div>
    </div>
    <!-- <div class="row q-mt-lg">
      <div class="col q-ma-sm">
        <div class="q-pa-md text-primary text-bold">primary color</div>
        <div class="q-pa-md text-secondary text-bold">secondary color</div>
        <div class="q-pa-md text-accent text-bold">accent color</div>
        <div class="q-pa-md text-dark text-bold">dark color</div>
        <div class="q-pa-md text-positive text-bold">positive color</div>
        <div class="q-pa-md text-negative text-bold">negative color</div>
        <div class="q-pa-md text-info text-bold">info color</div>
        <div class="q-pa-md text-warning text-bold">warning color</div>
      </div>
      <div class="col q-ma-sm">
        <div class="q-pa-md bg-primary text-bold text-white">primary color</div>
        <div class="q-pa-md bg-secondary text-bold">secondary color</div>
        <div class="q-pa-md bg-accent text-bold">accent color</div>
        <div class="q-pa-md bg-dark text-bold">dark color</div>
        <div class="q-pa-md bg-positive text-bold">positive color</div>
        <div class="q-pa-md bg-negative text-bold">negative color</div>
        <div class="q-pa-md bg-info text-bold">info color</div>
        <div class="q-pa-md bg-warning text-bold">warning color</div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import AvgResaleValue from './components/AvgResaleValue.vue';
import ReturnRate from './components/ReturnRate.vue';
import PopularCategories from './components/PopularCategories.vue';
import HighestResaleFreq from './components/HighestResaleFreq.vue';
import PopularResalePlatforms from './components/PopularResalePlatforms.vue';
import { useMeStore } from 'stores/me';

const storeMe = useMeStore();

const isRetailer = computed(() => {
  return storeMe.isRetailer;
});

const myName = computed(() => {
  return storeMe.data.name;
});

const today = computed(() => {
  return new Date().toLocaleDateString() + new Date().toLocaleTimeString();
});

onMounted(() => {});
</script>
