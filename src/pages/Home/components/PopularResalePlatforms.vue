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
          <div class="text-h6">Popular Re-Sale Platforms</div>
          <div class="text-caption text-accent">
            Top 5 resellers in the last 6 months
          </div>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="image" :props="props" :auto-width="true">
              <q-img v-if="props.row.file" :src="props.row.file" />
              <q-icon name="storefront" size="xs" />
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
              <small
                >{{ props.row.total > 1 ? 'Items' : 'Item' }} re-sold</small
              >
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRetailersPopularResellersStore } from 'stores/retailers/popularResellers';
import { useResellersPopularResellersStore } from 'stores/resellers/popularResellers';
import { useMeStore } from 'stores/me';

const retailersPopularResellersStore = useRetailersPopularResellersStore();
const resellersPopularResellersStore = useResellersPopularResellersStore();
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
  if (!popularResellersStore.value) {
    return [];
  }

  return popularResellersStore.value.details.map((item) => {
    return {
      name: item.name,
      total: item.total,
      delta: 0,
      image: item.file,
    };
  });
});

const isRetailer = computed(() => {
  return meStore.isRetailer;
});

const isReseller = computed(() => {
  return meStore.isReseller;
});

const popularResellersStore = computed(() => {
  if (isRetailer.value) {
    return retailersPopularResellersStore;
  } else if (isReseller.value) {
    return resellersPopularResellersStore;
  } else {
    return null;
  }
});

watch(popularResellersStore, (current) => {
  if (current && 0 == current.details.length && !current.isFetching) {
    current.fetch();
  }
});

const isLoading = computed(() => {
  return popularResellersStore.value && popularResellersStore.value.isFetching;
});

onMounted(() => {});
</script>
