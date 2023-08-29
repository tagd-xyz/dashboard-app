<template>
  <div>
    <Lines
      class="q-mb-lg"
      :labels="labels"
      :data="values"
      color="#70798c"
      label="Total Items"
      v-if="!isLoading"
      style="height: 23rem"
    />
  </div>
</template>

<script setup>
import Lines from 'components/Charts/Lines.vue';
import { useRetailersTagsIssuedStore } from 'stores/retailers/tagsIssued';
import { computed, onMounted, watch } from 'vue';
import { date } from 'quasar';

const retailersTagsIssuedStore = useRetailersTagsIssuedStore();

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
  status: {
    type: String,
    required: false,
    default: () => {
      return null;
    },
  },
  customerRegistered: {
    type: Boolean,
    required: false,
    default: () => {
      return null;
    },
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
  return retailersTagsIssuedStore.graph.map((row) => {
    return date.formatDate(row.datetime_interval, 'MMM Do');
  });
});

const values = computed(() => {
  return retailersTagsIssuedStore.graph.map((row) => {
    return row.total;
  });
});

const isLoading = computed(() => {
  return retailersTagsIssuedStore.is.fetchingGraph;
});

const tansfersCountFilter = computed(() => {
  switch (props.transfersCount) {
    case 'None':
      return 'none';
    case 'One':
      return 'one';
    case 'Two':
      return 'two';
    case 'Three':
      return 'three';
    case 'Four':
      return 'four';
    case 'Five or more':
      return 'five_or_more';
    default:
      return null;
  }
});

const customerRegisteredFilter = computed(() => {
  switch (props.customerRegistered) {
    case 'Registered':
      return true;
    case 'Unregistered':
      return false;
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
      status: props.status,
      transfersCount: tansfersCountFilter.value,
      customerRegistered: customerRegisteredFilter.value,
      brands: brandsFilter.value,
    },
  };
});

watch(filter, () => {
  fetch();
});

function fetch() {
  if (filter.value.dateFrom != '' && filter.value.dateTo != '') {
    retailersTagsIssuedStore.fetchGraph(filter.value);
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
