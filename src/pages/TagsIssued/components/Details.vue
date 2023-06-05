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
            <span class="capitalize">
              {{ props.row.status }}
            </span>
          </q-td>
          <q-td key="type" :props="props">
            {{ props.row.hasCustomerRegistered }}
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
          <q-td key="size" :props="props">
            {{ props.row.size }}
          </q-td>
          <q-td key="transfersCount" :props="props">
            {{ props.row.transfersCount }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useRetailersTagsIssuedStore } from 'stores/retailersTagsIssued';
import { computed, onMounted, ref, watch } from 'vue';
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

const pagination = ref({
  sortBy: 'tagdCount',
  descending: true,
  page: 1,
  rowsPerPage: 50,
  // rowsNumber: props.rows.length,
});

const isLoading = computed(() => {
  return retailersTagsIssuedStore.is.fetchingDetails;
});

const rows = computed(() => {
  return retailersTagsIssuedStore.details.map((row) => {
    return {
      soldOn: row.createdAt,
      hasCustomerRegistered:
        null == row.hasCustomerRegistered
          ? 'Unknown'
          : row.hasCustomerRegistered
          ? 'Registered'
          : 'Unregistered',
      status: row.status,
      name: row.item.name,
      type: row.item.type,
      transfersCount: row.stats?.count?.transferred_consumer ?? 0,
      brand: row.item.properties?.brand ?? '',
      model: row.item.properties?.model ?? '',
      size: row.item.properties?.size ?? '',
    };
  });
});

const columns = ref([
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
    align: 'center',
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
    name: 'transfersCount',
    label: 'Transfers',
    required: true,
    align: 'center',
    field: 'transfersCount',
    sortable: true,
  },
]);

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
    retailersTagsIssuedStore.fetchList(1, 9999, filter.value);
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
