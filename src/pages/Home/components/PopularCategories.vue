<template>
  <div>
    <q-card class="q-py-sm">
      <q-table dense :rows="rows" :columns="columns" row-key="name" :hide-header="true" :hide-bottom="true"
        :loading="isLoading">
        <template #top-left>
          <div class="text-h6">Popular Categories</div>
          <div class="text-caption text-accent">
            Top 5 categories in the last 6 months
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              <span class="text-bold">
                {{ props.row.name }}
              </span>
            </q-td>
            <q-td key="total" :props="props">
              <span class="text-bold">
                {{ props.row.total }}
                <q-icon size="xs" name="north_east" color="positive" v-if="props.row.delta > 0" />
                <q-icon size="xs" name="south_east" color="negative" v-if="props.row.delta < 0" />
              </span>
              <br />
              <small>{{ props.row.total > 1 ? 'Items' : 'Item' }} re-sold</small>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRetailersPopularTypesStore } from 'stores/retailers/popularTypes';
import { useResellersPopularTypesStore } from 'stores/resellers/popularTypes';
import { useMeStore } from 'stores/me';

const retailersPopularTypesStore = useRetailersPopularTypesStore();
const resellersPopularTypesStore = useResellersPopularTypesStore();
const meStore = useMeStore();

const columns = ref([
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
  if (!popularTypesStore.value) {
    return [];
  }

  return popularTypesStore.value.details.map((item) => {
    return {
      name: item.name,
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

const popularTypesStore = computed(() => {
  if (isRetailer.value) {
    return retailersPopularTypesStore;
  } else if (isReseller.value) {
    return resellersPopularTypesStore;
  } else {
    return null;
  }
});

watch(popularTypesStore, (current) => {
  if (current && 0 == current.details.length && !current.isFetching) {
    current.fetch();
  }
});

const isLoading = computed(() => {
  return popularTypesStore.value && popularTypesStore.value.isFetching;
});

onMounted(() => { });
</script>
