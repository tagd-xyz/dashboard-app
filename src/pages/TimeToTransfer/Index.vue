<template>
  <div class="q-pa-lg">
    <div class="text-h5 q-mx-md text-bold">Time to transfer</div>
    <div class="text-accent q-mx-md">
      Filter and visualize the number of items by the x<sup>th</sup> transfer
    </div>
    <q-separator class="q-my-lg" />

    <q-card flat>
      <q-card-section horizontal>
        <q-card-section>
          <!-- <div class="text-subtitle1 q-mb-sm">
            <q-icon name="tune" class="q-mr-sm" />Filter
          </div> -->
          <Dates :from="someTimeAgo" :to="today" class="q-ma-sm" @selected="onDatesSelected" />

          <Filter :brands="brands" @brands-selected="onBrandsSelected"
            @transfersCountSelected="onTransfersCountSelected" />
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="full-width">
          <q-card flat>
            <q-card-section>
              <Graph :date-from="dateFrom" :date-to="dateTo" :brands="brandsSelected"
                :transfers-count="transfersCountSelected" />
            </q-card-section>
          </q-card>

          <q-card flat class="q-mt-sm">
            <q-card-section>
              <Details :date-from="dateFrom" :date-to="dateTo" :brands="brandsSelected"
                :transfers-count="transfersCountSelected" />
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import Graph from './components/Graph.vue';
import Details from './components/Details.vue';
import Filter from './components/Filter.vue';
import Dates from './components/Dates.vue';
import { useRetailersReferenceStore } from 'stores/retailers/reference';
import { useResellersReferenceStore } from 'stores/resellers/reference';
import { useMeStore } from 'stores/me';
import { computed, onMounted, ref } from 'vue';
import { date } from 'quasar';

const retailersReferenceStore = useRetailersReferenceStore();
const resellersReferenceStore = useResellersReferenceStore();
const storeMe = useMeStore();

const dateFrom = ref('');
const dateTo = ref('');
const brandsSelected = ref(null);
const transfersCountSelected = ref('First');

const referenceStore = computed(() => {
  return isRetailer.value ? retailersReferenceStore : resellersReferenceStore;
});

const isRetailer = computed(() => {
  return storeMe.isRetailer;
});

const today = computed(() => {
  return date.formatDate(Date.now(), 'YYYY/MM/DD');
});

const someTimeAgo = computed(() => {
  return date.formatDate(
    date.subtractFromDate(Date.now(), { months: 3 }),
    'YYYY/MM/DD'
  );
});

const brands = computed(() => {
  return referenceStore.value.brands.map((brand) => {
    return brand.name;
  });
});

function onBrandsSelected(brands) {
  brandsSelected.value = brands;
}

function onTransfersCountSelected(transfersCount) {
  transfersCountSelected.value = transfersCount;
}

function onDatesSelected(range) {
  dateFrom.value = range?.from ?? null;
  dateTo.value = range?.to ?? null;
}

function fetch() {
  referenceStore.value.fetchBrands();
}

onMounted(() => {
  dateTo.value = today.value;
  dateFrom.value = someTimeAgo.value;
  fetch();
});
</script>

<style scoped>
/* canvas {
  width: 100% !important;
} */
</style>
