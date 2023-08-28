<template>
  <div class="q-pa-lg">
    <div class="text-h6">Monthly summary</div>
    <div class="row">
      <div class="col q-ma-sm">
        <q-card class="my-card">
          <q-card-section>
            <Lines color="#ee6055" label="Return Rate (WIP)" />
          </q-card-section>
          <q-card-section horizontal vertical-middle>
            <div class="q-ma-sm">
              <q-icon size="lg" name="north_east" color="negative" />
            </div>
            <div class="q-ma-sm text-h5 text-bold">5%</div>
            <div class="q-ma-sm text-subtitle2">
              Your competitors have a return date 5% higher
            </div>
          </q-card-section>
        </q-card>
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
import Lines from './components/Lines.vue';
import AvgResaleValue from './components/AvgResaleValue.vue';
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
