<template>
  <div>
    <div class="text-h6">Highest resale frequency (WIP)</div>
    <q-table
      dense
      flat
      :rows="rows"
      :columns="columns"
      row-key="name"
      :hide-bottom="true"
      :loading="isFetching"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            <span class="text-bold">
              {{ props.row.name }}
            </span>
            <br />
            <small class="text-grey-7">{{ props.row.type }}</small>
          </q-td>
          <q-td key="total" :props="props">
            <span class="text-bold">
              {{ props.row.total }}
              <q-icon
                size="xs"
                name="north_east"
                color="positive"
                v-if="props.row.delta > 0"
              />
              <q-icon
                size="xs"
                name="south_east"
                color="negative"
                v-if="props.row.delta < 0"
              />
            </span>
            <br />
            <small>Resale Frequency</small>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRetailersResaleFrequencyStore } from 'stores/retailersResaleFrequency';
import { useResellersResaleFrequencyStore } from 'stores/resellersResaleFrequency';
import { useMeStore } from 'stores/me';

const retailersResaleFrequencyStore = useRetailersResaleFrequencyStore();
const resellersResaleFrequencyStore = useResellersResaleFrequencyStore();
const storeMe = useMeStore();

const isRetailer = computed(() => {
  return storeMe.isRetailer;
});

const resaleFrequencyStore = ref(null);

const columns = ref([
  {
    name: 'image',
    required: true,
    field: 'image',
    sortable: false,
  },
  {
    name: 'name',
    required: true,
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'total',
    align: 'right',
    field: 'total',
    sortable: true,
  },
]);

const rows = computed(() => {
  if (!resaleFrequencyStore.value) {
    return [];
  }

  return resaleFrequencyStore.value.details.map((item) => {
    return {
      name: item.name,
      type: item.type,
      total: item.total,
      delta: 0,
    };
  });
});

const isFetching = computed(() => {
  return resaleFrequencyStore.value && resaleFrequencyStore.value.isFetching;
});

watch (isRetailer, (current) => {
  resaleFrequencyStore.value = current
    ? retailersResaleFrequencyStore
    : resellersResaleFrequencyStore;
});

watch(resaleFrequencyStore, (current) => {
  current.fetch();
});

onMounted(() => {});
</script>
