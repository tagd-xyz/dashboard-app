<template>
  <div>
    <lines-multiple
      class="q-mb-lg"
      :labels="labels"
      :max-data="maxValues"
      :min-data="minValues"
      :mean-data="meanValues"
      :median-data="medianValues"
      :std-dev-data="stdDevValues"
      color="#70798c"
      v-if="!isLoading && '' != currency"
      style="height: 23rem"
      label="Max"
    />
  </div>
</template>

<script setup>
import LinesMultiple from './LinesMultiple.vue';
import { useRetailersCurrencyStore } from 'stores/retailers/currency';
import { useResellersCurrencyStore } from 'stores/resellers/currency';
import { useMeStore } from 'stores/me';
import { computed, onMounted, watch } from 'vue';

const retailersCurrencyStore = useRetailersCurrencyStore();
const resellersCurrencyStore = useResellersCurrencyStore();
const storeMe = useMeStore();

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  currency: {
    type: String,
    required: false,
    default: '',
  },
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
  brands: {
    type: Array,
    required: false,
    default: () => {
      return null;
    },
  },
  countries: {
    type: Array,
    required: false,
    default: () => {
      return null;
    },
  },
  city: {
    type: String,
    required: false,
    default: () => {
      return null;
    },
  },
  model: {
    type: String,
    required: false,
    default: () => {
      return null;
    },
  },
});

const labels = computed(() => {
  if (!currencyStore.value) {
    return [];
  }

  const data = [];
  // eslint-disable-next-line no-unused-vars
  Object.entries(currencyStore.value.graph).forEach(([key, value]) => {
    data.push(key);
  });

  return data;
});

const maxValues = computed(() => {
  if (!currencyStore.value) {
    return [];
  }

  const data = [];
  // eslint-disable-next-line no-unused-vars
  Object.entries(currencyStore.value.graph).forEach(([key, value]) => {
    data.push(value.max);
  });

  return data;
});

const minValues = computed(() => {
  if (!currencyStore.value) {
    return [];
  }

  const data = [];
  // eslint-disable-next-line no-unused-vars
  Object.entries(currencyStore.value.graph).forEach(([key, value]) => {
    data.push(value.min);
  });

  return data;
});

const meanValues = computed(() => {
  if (!currencyStore.value) {
    return [];
  }

  const data = [];
  // eslint-disable-next-line no-unused-vars
  Object.entries(currencyStore.value.graph).forEach(([key, value]) => {
    data.push(value.mean);
  });

  return data;
});

const medianValues = computed(() => {
  if (!currencyStore.value) {
    return [];
  }

  const data = [];
  // eslint-disable-next-line no-unused-vars
  Object.entries(currencyStore.value.graph).forEach(([key, value]) => {
    data.push(value.median);
  });

  return data;
});

const stdDevValues = computed(() => {
  if (!currencyStore.value) {
    return [];
  }

  const data = [];
  // eslint-disable-next-line no-unused-vars
  Object.entries(currencyStore.value.graph).forEach(([key, value]) => {
    data.push(value.stdDev);
  });

  return data;
});

const currencyStore = computed(() => {
  return isRetailer.value ? retailersCurrencyStore : resellersCurrencyStore;
});

const isRetailer = computed(() => {
  return storeMe.isRetailer;
});

const isLoading = computed(() => {
  return currencyStore.value.is.fetchingGraph;
});

const brandsFilter = computed(() => {
  if (props.brands?.includes('Any') && 1 == props.brands?.length) {
    return null;
  } else {
    return props.brands;
  }
});

const countriesFilter = computed(() => {
  if (props.countries?.includes('Any') && 1 == props.countries?.length) {
    return null;
  } else {
    return props.countries;
  }
});

const filter = computed(() => {
  return {
    currency: props.currency,
    dateFrom: props.dateFrom,
    dateTo: props.dateTo,
    filter: {
      brands: brandsFilter.value,
      countries: countriesFilter.value,
      city: props.city,
      model: props.model,
    },
  };
});

watch(filter, () => {
  fetch();
});

function fetch() {
  if (
    filter.value.dateFrom != '' &&
    filter.value.dateTo != '' &&
    props.currency != ''
  ) {
    currencyStore.value.fetchGraph(filter.value);
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
