<template>
  <div class="q-pa-lg">
    <div class="text-h5 q-mx-md text-bold">Tags issued over time</div>
    <div class="text-accent q-mx-md">
      Filter and visualize the tags you have issued over a period of time
    </div>
    <q-separator class="q-my-lg" />

    <q-card flat>
      <q-card-section horizontal>
        <q-card-section>
          <!-- <div class="text-subtitle1 q-mb-sm">
            <q-icon name="tune" class="q-mr-sm" />Filter
          </div> -->
          <Dates :from="someTimeAgo" :to="today" class="q-ma-sm" @selected="onDatesSelected" />

          <Filter :brands="brands" @brands-selected="onBrandsSelected" @tags-status-selected="onTagsStatusSelected"
            @customer-status-selected="onCustomerStatusSelected" @transfers-count-selected="onTransfersCountSelected" />
        </q-card-section>

        <q-separator vertical />
        <q-card-section class="full-width">
          <q-card flat>
            <q-card-section>
              <Graph :date-from="dateFrom" :date-to="dateTo" :status="statusSelected"
                :customer-registered="customerStatusSelected" :transfers-count="transfersCountSelected"
                :brands="brandsSelected" />
            </q-card-section>
          </q-card>

          <q-card flat class="q-mt-sm">
            <q-card-section>
              <Details :date-from="dateFrom" :date-to="dateTo" :status="statusSelected"
                :customer-registered="customerStatusSelected" :transfers-count="transfersCountSelected"
                :brands="brandsSelected" />
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
import { computed, onMounted, ref } from 'vue';
import { date } from 'quasar';

const referenceStore = useRetailersReferenceStore();

const dateFrom = ref('');
const dateTo = ref('');
const statusSelected = ref(null);
const customerStatusSelected = ref(null);
const transfersCountSelected = ref(null);
const brandsSelected = ref(null);

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
  return referenceStore.brands.map((brand) => {
    return brand.name;
  });
});

function onBrandsSelected(brands) {
  brandsSelected.value = brands;
}

function onTagsStatusSelected(tagdsStatus) {
  switch (tagdsStatus) {
    case 'Active':
    case 'Inactive':
      statusSelected.value = tagdsStatus;
      break;
    case 'Any':
    default:
      statusSelected.value = null;
      break;
  }
}

function onDatesSelected(range) {
  dateFrom.value = range?.from ?? null;
  dateTo.value = range?.to ?? null;
}

function onCustomerStatusSelected(customerStatus) {
  customerStatusSelected.value = customerStatus;
}

function onTransfersCountSelected(transfersCount) {
  transfersCountSelected.value = transfersCount;
}

function fetch() {
  referenceStore.fetchBrands();
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
