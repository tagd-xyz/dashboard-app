<template>
  <div>
    <q-table
      dense
      flat
      :rows="rows"
      :columns="columns"
      row-key="name"
      :loading="isLoading"
      :pagination="pagination"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="soldOn" :props="props">
            {{
              date.formatDate(
                Date.parse(props.row.soldOn),
                'DD-MM-YYYY HH:mm:ss'
              )
            }}
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.status }}
          </q-td>
          <q-td key="hasCustomerRegistered" :props="props">
            {{ props.row.hasCustomerRegistered }}
          </q-td>
          <q-td key="retailer" :props="props">
            {{ props.row.retailer }}
          </q-td>
          <q-td key="type" :props="props">
            <span class="capitalize">
              {{ props.row.type }}
            </span>
          </q-td>
          <q-td key="brand" :props="props">
            <span class="text-bold">
              {{ props.row.brand }}
            </span>
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}.
            <small>
              {{ props.row.model }}
            </small>
          </q-td>
          <q-td key="model" :props="props"> </q-td>
          <q-td key="size" :props="props">{{ props.row.size }}</q-td>
          <q-td key="trust" :props="props">{{props.row.trust?.score}}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useRetailersFraudReportStore } from 'stores/retailersFraudReport';
import { useResellersFraudReportStore } from 'stores/resellersFraudReport';
import { useMeStore } from 'stores/me';
import { computed, onMounted, ref, watch } from 'vue';
import { date } from 'quasar';

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
  brands: {
    type: Array,
    required: false,
    default: () => {
      return null;
    },
  },
});

const pagination = ref({
  sortBy: 'tagdCount',
  descending: true,
  page: 1,
  rowsPerPage: 50,
  // rowsNumber: props.rows.length,
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
  return fraudReportStore.value.is.fetchingDetails;
});

const rows = computed(() => {
  return fraudReportStore.value.details.map((row) => {
    return {
      soldOn: row.createdAt,
      status: row.status,
      retailer: row.item.retailer,
      hasCustomerRegistered:
        null == row.hasCustomerRegistered
          ? 'Unknown'
          : row.hasCustomerRegistered
          ? 'Registered'
          : 'Unregistered',
      name: row.item.name,
      type: row.item.type.name,
      brand: row.item.properties?.brand ?? '',
      model: row.item.properties?.model ?? '',
      size: row.item.properties?.size ?? '',
      trust: row.trust,
    };
  });
});

const columns = computed(() => {
  const list = [
    {
      name: 'soldOn',
      label: 'Sold On',
      required: true,
      align: 'left',
      field: 'soldOn',
      sortable: true,
    },
    {
      name: 'status',
      label: 'Status',
      required: true,
      align: 'left',
      field: 'status',
      sortable: true,
    },
    {
      name: 'hasCustomerRegistered',
      label: 'Customer',
      required: true,
      align: 'left',
      field: 'hasCustomerRegistered',
      sortable: true,
    },
    {
      name: 'retailer',
      label: 'Retailer',
      required: true,
      align: 'left',
      field: 'retailer',
      sortable: true,
    },
    {
      name: 'type',
      label: 'Type',
      required: true,
      align: 'left',
      field: 'type',
      sortable: true,
    },
    {
      name: 'brand',
      label: 'Brand',
      required: true,
      align: 'left',
      field: 'brand',
      sortable: true,
    },
    {
      name: 'name',
      label: 'Name & Model',
      required: true,
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'size',
      label: 'Size',
      required: true,
      align: 'left',
      field: 'size',
      sortable: true,
    },
    {
      name: 'trust',
      label: 'Trust score',
      required: true,
      align: 'center',
      field: 'trust',
      sortable: true,
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

const filter = computed(() => {
  return {
    dateFrom: props.dateFrom,
    dateTo: props.dateTo,
    filter: {
      brands: brandsFilter.value,
    },
  };
});

watch(filter, () => {
  fetch();
});

function fetch() {
  if (filter.value.dateFrom != '' && filter.value.dateTo != '') {
    fraudReportStore.value.fetchList(1, 9999, filter.value);
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
