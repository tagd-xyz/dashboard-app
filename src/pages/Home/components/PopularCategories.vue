<template>
  <div>
    <div class="text-h6">Popular categories</div>
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
            <small>{{ props.row.total > 1 ? 'Items' : 'Item' }} re-sold</small>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRetailersPopularTypesStore } from 'stores/retailers/popularTypes';
import { useResellersPopularTypesStore } from 'stores/resellers/popularTypes';
import { useMeStore } from 'stores/me';

const retailersPopularTypesStore = useRetailersPopularTypesStore();
const resellersPopularTypesStore = useResellersPopularTypesStore();
const storeMe = useMeStore();

const isRetailer = computed(() => {
  return storeMe.isRetailer;
});

const popularTypesStore = ref(null);

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

const isFetching = computed(() => {
  return popularTypesStore.value && popularTypesStore.value.isFetching;
});

watch(isRetailer, (current) => {
  popularTypesStore.value = current
    ? retailersPopularTypesStore
    : resellersPopularTypesStore;
});

watch(popularTypesStore, (current) => {
  current.fetch();
});

onMounted(() => {});
</script>
