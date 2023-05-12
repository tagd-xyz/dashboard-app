<template>
  <q-table
    dense
    flat
    :rows="rows"
    :columns="columns"
    row-key="name"
    :hide-bottom="true"
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
          <small>Items re-sold</small>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { onMounted, ref } from 'vue';

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

const rows = ref([
  {
    name: 'Fashion',
    total: 2000,
    delta: 1,
  },
  {
    name: 'Shoes',
    total: 1750,
    delta: -1,
  },
]);

onMounted(() => {});
</script>
