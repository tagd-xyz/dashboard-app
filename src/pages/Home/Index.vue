<template>
  <div class="q-pa-lg">
    <div class="text-h6">Monthly summary</div>
    <div class="row">
      <div class="col q-ma-sm">
        <return-rate label="Return Rate" />
      </div>
      <div class="col q-ma-sm">
        <avg-resale-value label="Avg. Resale Value" />
      </div>
    </div>
    <!-- row -->
    <div class="row q-mt-lg">
      <div class="col q-ma-sm">
        <div class="text-h6">Popular categories</div>
        <popular-categories />
      </div>
      <div class="col q-ma-sm">
        <div class="text-h6">Highest resale frequency (WIP)</div>
        <highest-resale-freq />
      </div>
      <div class="col q-ma-sm">
        <div class="text-h6">Popular re-sale platforms</div>
        <popular-resale-platforms />
      </div>
    </div>
  </div>
</template>

<script setup>
import AvgResaleValue from './components/AvgResaleValue.vue';
import ReturnRate from './components/ReturnRate.vue';
import PopularCategories from './components/PopularCategories.vue';
import HighestResaleFreq from './components/HighestResaleFreq.vue';
import PopularResalePlatforms from './components/PopularResalePlatforms.vue';
// import { useCurrencyStore } from 'stores/retailersCurrency';
import { onMounted } from 'vue';

// const currencyStore = useCurrencyStore();

onMounted(() => {
  // currencyStore.fetch();
});
</script>
