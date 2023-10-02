<template>
  <div>
    <Lines class="q-mb-lg" :labels="labels" :data="values" color="#70798c" v-if="!isLoading" style="height: 23rem"
      label="Total Items" />
  </div>
</template>

<script setup>
import Lines from 'components/Charts/Lines.vue';
import { useRetailersFraudReportStore } from 'stores/retailers/fraudReport';
import { useResellersFraudReportStore } from 'stores/resellers/fraudReport';
import { useMeStore } from 'stores/me';
import { computed, onMounted, watch } from 'vue';

const retailersFraudReportStore = useRetailersFraudReportStore();
const resellersFraudReportStore = useResellersFraudReportStore();
const storeMe = useMeStore();

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  dateFrom: {
    type: String,
    required: true,
    default: '',
  },
  dateTo: {
    type: String,
    required: true,
    default: '',
  },
  transfersCount: {
    type: String,
    required: false,
    default: () => {
      return null;
    },
  },
  brands: {
    type: Array,
    required: false,
    default: () => {
      return null;
    },
  },
});

const labels = computed(() => {
  return fraudReportStore.value.graph.map((row) => {
    const { t } = row;
    return `${t} score`;
  });
});

const values = computed(() => {
  return fraudReportStore.value.graph.map((row) => {
    return row.total;
  });
});

const fraudReportStore = computed(() => {
  return isRetailer.value
    ? retailersFraudReportStore
    : resellersFraudReportStore;
});

const isRetailer = computed(() => {
  return storeMe.isRetailer;
});

const isLoading = computed(() => {
  return fraudReportStore.value.is.fetchingGraph;
});

const transfersCountFilter = computed(() => {
  switch (props.transfersCount) {
    case 'First':
      return 1;
    case 'Second':
      return 2;
    case 'Third':
      return 3;
    case 'Fourth':
      return 4;
    case 'Fifth':
      return 5;
    case 'Sixth':
      return 6;
    case 'Seventh':
      return 7;
    case 'Eighth':
      return 8;
    case 'Ninth':
      return 9;
    case 'Tenth':
      return 10;
    default:
      return null;
  }
});

const brandsFilter = computed(() => {
  if (props.brands?.includes('Any') && 1 == props.brands?.length) {
    return null;
  } else {
    return props.brands;
  }
});

const filter = computed(() => {
  return {
    dateFrom: props.dateFrom,
    dateTo: props.dateTo,
    filter: {
      transfersCount: transfersCountFilter.value,
      brands: brandsFilter.value,
    },
  };
});

watch(filter, () => {
  fetch();
});

function fetch() {
  if (filter.value.dateFrom != '' && filter.value.dateTo != '') {
    fraudReportStore.value.fetchGraph(filter.value);
  }
}

onMounted(() => {
  fetch();
});
</script>

<style scoped>
/* canvas {
  width: 100% !important;
} */
</style>
