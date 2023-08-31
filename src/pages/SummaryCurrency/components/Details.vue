<template>
  <div>
    <q-table
      dense
      flat
      :rows="rows"
      :columns="columns"
      row-key="name"
      selection="single"
      v-model:selected="selected"
      :loading="isLoading"
      :pagination="pagination"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            <q-checkbox v-model="props.selected" />
          </q-td>
          <q-td key="currencyCode" :props="props">
            {{ props.row.currencyCode }}
          </q-td>
          <q-td key="items" :props="props">
            {{ props.row.itemsAffected }} affected
            <br />
            {{ props.row.itemsTransferred }} transferred
          </q-td>
          <q-td key="max" :props="props">
            {{ props.row.max }}
          </q-td>
          <q-td key="min" :props="props">
            {{ props.row.min }}
          </q-td>
          <q-td key="mean" :props="props">
            {{ props.row.mean }}
          </q-td>
          <q-td key="median" :props="props">
            {{ props.row.median }}
          </q-td>
          <q-td key="stdDev" :props="props">
            {{ props.row.stdDev }}
          </q-td>
          <q-td key="q1" :props="props">
            {{ props.row.quantiles.q1.value }}
            <br />
            <small> {{ props.row.quantiles.q1.items }} item(s) </small>
          </q-td>
          <q-td key="q2" :props="props">
            {{ props.row.quantiles.q2.value }}
            <br />
            <small> {{ props.row.quantiles.q2.items }} item(s) </small>
          </q-td>
          <q-td key="q3" :props="props">
            {{ props.row.quantiles.q3.value }}
            <br />
            <small> {{ props.row.quantiles.q3.items }} item(s) </small>
          </q-td>
          <q-td key="q4" :props="props">
            {{ props.row.quantiles.q4.value }}
            <br />
            <small> {{ props.row.quantiles.q4.items }} item(s) </small>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useRetailersCurrencyStore } from 'stores/retailers/currency';
import { useResellersCurrencyStore } from 'stores/resellers/currency';
import { useMeStore } from 'stores/me';
import { computed, onMounted, ref, watch } from 'vue';

const emit = defineEmits(['selected']);

const retailersCurrencyStore = useRetailersCurrencyStore();
const resellersCurrencyStore = useResellersCurrencyStore();
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

const selected = ref([]);

watch(selected, (current) => {
  emit('selected', current);
});

const pagination = ref({
  sortBy: 'tagdCount',
  descending: true,
  page: 1,
  rowsPerPage: 50,
  // rowsNumber: props.rows.length,
});

const currencyStore = computed(() => {
  return isRetailer.value ? retailersCurrencyStore : resellersCurrencyStore;
});

const isRetailer = computed(() => {
  return storeMe.isRetailer;
});

const isLoading = computed(() => {
  return currencyStore.value.is.fetchingDetails;
});

const rows = computed(() => {
  const data = [];

  Object.entries(currencyStore.value.details).forEach(([key, value]) => {
    data.push({
      ...value,
      currencyCode: key,
    });
  });

  return data;
});

const columns = computed(() => {
  const list = [
    {
      name: 'currencyCode',
      label: 'Currency',
      required: true,
      align: 'left',
      field: 'currencyCode',
      sortable: true,
    },
    {
      name: 'items',
      label: 'Items',
      required: true,
      align: 'left',
      field: 'items',
      sortable: false,
    },
    {
      name: 'max',
      label: 'Max.',
      required: true,
      align: 'left',
      field: 'max',
      sortable: true,
    },
    {
      name: 'min',
      label: 'Min.',
      required: true,
      align: 'left',
      field: 'min',
      sortable: true,
    },
    {
      name: 'mean',
      label: 'Mean',
      required: true,
      align: 'left',
      field: 'mean',
      sortable: true,
    },
    {
      name: 'median',
      label: 'Median',
      required: true,
      align: 'left',
      field: 'median',
      sortable: true,
    },
    {
      name: 'stdDev',
      label: 'Std. Dev.',
      required: true,
      align: 'left',
      field: 'stdDev',
      sortable: true,
    },
    {
      name: 'q1',
      label: 'Q1',
      required: true,
      align: 'left',
      field: 'qa',
      sortable: false,
    },
    {
      name: 'q2',
      label: 'Q2',
      required: true,
      align: 'left',
      field: 'qa',
      sortable: false,
    },
    {
      name: 'q3',
      label: 'Q3',
      required: true,
      align: 'left',
      field: 'qa',
      sortable: false,
    },
    {
      name: 'q4',
      label: 'Q4',
      required: true,
      align: 'left',
      field: 'qa',
      sortable: false,
    },
  ];

  if (isRetailer.value) {
    return list.filter((column) => {
      return column.name != 'retailer';
    });
  } else {
    return list.filter((column) => {
      return column.name != 'hasCustomerRegistered';
    });
  }
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
  if (filter.value.dateFrom != '' && filter.value.dateTo != '') {
    currencyStore.value.fetchList(filter.value).then(() => {
      // automatically select first row
      if (rows.value.length > 0) {
        selected.value = [rows.value[0]];
      }
    });
  }
}

onMounted(() => {
  fetch();
});
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
