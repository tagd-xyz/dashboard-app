<template>
  <div class="q-pa-lg">
    <div class="text-h4 q-mb-md">Time to transfer</div>

    <q-card flat>
      <q-card-section horizontal>
        <q-card-section>
          <!-- <div class="text-subtitle1 q-mb-sm">
            <q-icon name="tune" class="q-mr-sm" />Filter
          </div> -->
          <Dates
            :from="aMonthAgo"
            :to="today"
            class="q-ma-sm"
            @selected="onDatesSelected"
          />

          <Filter
            :brands="brands"
            @brands-selected="onBrandsSelected"
            @transfersCountSelected="onTransfersCountSelected"
          />
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="full-width">
          <q-card bordered>
            <q-card-section>
              <Graph
                :date-from="dateFrom"
                :date-to="dateTo"
                :brands="brandsSelected"
                :transfers-count="transfersCountSelected"
              />
            </q-card-section>
          </q-card>

          <q-card bordered class="q-mt-sm">
            <q-card-section>
              <Details
                :date-from="dateFrom"
                :date-to="dateTo"
                :brands="brandsSelected"
                :transfers-count="transfersCountSelected"
              />
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
import { useReferenceStore } from 'stores/reference';
import { computed, onMounted, ref } from 'vue';
import { date } from 'quasar';

const referenceStore = useReferenceStore();

const dateFrom = ref('');
const dateTo = ref('');
const brandsSelected = ref(null);
const transfersCountSelected = ref('First');

const today = computed(() => {
  return date.formatDate(Date.now(), 'YYYY/MM/DD');
});

const aMonthAgo = computed(() => {
  return date.formatDate(
    date.subtractFromDate(Date.now(), { months: 1 }),
    'YYYY/MM/DD'
  );
});

const brands = computed(() => {
  return referenceStore.brands.map((brand) => {
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
  referenceStore.fetchBrands();
}

onMounted(() => {
  dateTo.value = today.value;
  dateFrom.value = aMonthAgo.value;
  fetch();
});
</script>

<style scoped>
/* canvas {
  width: 100% !important;
} */
</style>
