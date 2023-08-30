<template>
  <div>
    <q-card class="q-py-sm">
      <q-table
        dense
        :rows="rows"
        :columns="columns"
        row-key="name"
        :hide-header="true"
        :hide-bottom="true"
        :loading="isLoading"
      >
        <template #top-left>
          <div class="text-h6">Popular Re-Sale Items</div>
          <div class="text-caption text-accent">Top 5 items in the last 6 months</div>
        </template>
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
    </q-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRetailersResaleFrequencyStore } from 'stores/retailers/resaleFrequency';
import { useResellersResaleFrequencyStore } from 'stores/resellers/resaleFrequency';
import { useMeStore } from 'stores/me';

const retailersResaleFrequencyStore = useRetailersResaleFrequencyStore();
const resellersResaleFrequencyStore = useResellersResaleFrequencyStore();
const meStore = useMeStore();

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

const isRetailer = computed(() => {
  return meStore.isRetailer;
});

const isReseller = computed(() => {
  return meStore.isReseller;
});

const resaleFrequencyStore = computed(() => {
  if (isRetailer.value) {
    return retailersResaleFrequencyStore;
  } else if (isReseller.value) {
    return resellersResaleFrequencyStore;
  } else {
    return null;
  }
});

watch(resaleFrequencyStore, (current) => {
  if (current && 0 == current.details.length && !current.isFetching) {
    current.fetch();
  }
});

const isLoading = computed(() => {
  return resaleFrequencyStore.value && resaleFrequencyStore.value.isFetching;
});

onMounted(() => {});
</script>
