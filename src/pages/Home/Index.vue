<template>
  <div class="q-pa-lg">
    <div class="text-h6">Monthly summary</div>
    <div class="row">
      <div class="col q-ma-sm" v-if="isRetailer">
        <return-rate />
      </div>
      <div class="col q-ma-sm">
        <avg-resale-value />
      </div>
    </div>
    <div class="row q-mt-lg">
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

onMounted(() => {
});
</script>
