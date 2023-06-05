<template>
  <div>
    <!-- <div class="row q-mb-lg">
      <div class="col-8"></div>
      <div class="col-2">
        <q-input v-model="search" label="Search" :dense="true">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div> -->
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
          <q-td key="image" :props="props">
            <q-img :src="props.row.image" style="height: 30px; width: 30px" />
          </q-td>
          <q-td key="type" :props="props">
            <span>
              {{ props.row.type }}
            </span>
          </q-td>
          <q-td key="brand" :props="props">
            <span class="text-bold">
              {{ props.row.brand }}
            </span>
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="model" :props="props">
            {{ props.row.model }}
          </q-td>
          <q-td key="size" :props="props">
            {{ props.row.size }}
          </q-td>
          <q-td key="tagdCount" :props="props">
            {{ props.row.tagdCount }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// const search = ref('');

const pagination = ref({
  sortBy: 'tagdCount',
  descending: true,
  page: 1,
  rowsPerPage: 50,
  // rowsNumber: props.rows.length,
});

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  columns: {
    type: Array,
  },
  rows: {
    type: Array,
  },
  isLoading: {
    type: Boolean,
    default: () => {
      true;
    },
  },
});

onMounted(() => {});
</script>
