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
        <q-td key="image" :props="props">
          <q-img :src="props.row.image" />
        </q-td>
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
</template>

<script setup>
import { onMounted, ref } from 'vue';

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

const rows = ref([
  {
    name: 'Item 1',
    type: 'Fashion',
    total: '5 Mo',
    delta: 1,
    image:
      'https://d3sfiwv4lracxf.cloudfront.net/eyJidWNrZXQiOiJ0b3RhbGx5LXRhZ2QtbWVkaWEtZGV2Iiwia2V5Ijoic3RvY2tJbWFnZXNcLzk4ZjhiNGIyLWZlYTgtNDliZC1hNWEzLTFmYjliMmYzMTcwNVwvemFyYV90b3RlX2JhZ19icm93bl8xLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NjQwLCJoZWlnaHQiOjY0MCwiZml0IjoiY292ZXIifX19',
  },
  {
    name: 'Item 2',
    type: 'Shoes',
    total: '6 Mo',
    delta: -1,
    image:
      'https://d3sfiwv4lracxf.cloudfront.net/eyJidWNrZXQiOiJ0b3RhbGx5LXRhZ2QtbWVkaWEtZGV2Iiwia2V5Ijoic3RvY2tJbWFnZXNcLzk4ZjhiNGIzLTAwZmUtNDZiNC1hYmVlLWRhZmIzNWQ4MDBlYVwvemFyYV90b3RlX2JhZ18yLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NjQwLCJoZWlnaHQiOjY0MCwiZml0IjoiY292ZXIifX19',
  },
]);

onMounted(() => {});
</script>
