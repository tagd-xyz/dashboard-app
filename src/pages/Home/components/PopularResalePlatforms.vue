<template>
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
        <q-td key="image" :props="props">
          <q-img :src="props.row.image" />
        </q-td>
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
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRetailersPopularResellersStore } from 'stores/retailersPopularResellers';
import { useResellersPopularResellersStore } from 'stores/resellersPopularResellers';
import { useMeStore } from 'stores/me';

const retailersPopularResellersStore = useRetailersPopularResellersStore();
const resellersPopularResellersStore = useResellersPopularResellersStore();
const storeMe = useMeStore();

const popularResellersStore = computed(() => {
  return isRetailer.value
    ? retailersPopularResellersStore
    : resellersPopularResellersStore;
});

const isRetailer = computed(() => {
  return storeMe.isRetailer;
});

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
  return popularResellersStore.value.details.map((item) => {
    console.log(item);
    return {
      name: item.name,
      total: item.total,
      delta: 0,
      image: item.file,
    };
  });
});

const isFetching = computed(() => {
  return popularResellersStore.value.isFetching;
});

watch(popularResellersStore, (current) => {
  current.fetch();
});

onMounted(() => {
});
</script>
