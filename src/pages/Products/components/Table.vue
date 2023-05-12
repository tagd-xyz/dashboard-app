<template>
  <div>
    <div class="row q-mb-lg">
      <div class="col-8"></div>
      <div class="col-2">
        <q-input v-model="search" label="Search" :dense="true">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="col-2">
        <q-btn
          no-caps
          class="bg-secondary q-ml-sm"
          color="white"
          flat
          icon="tune"
          label="Filter"
        />
      </div>
    </div>
    <q-table dense flat :rows="rows" :columns="columns" row-key="name">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="image" :props="props">
            <q-img :src="props.row.image" style="height: 30px; width: 30px" />
          </q-td>
          <q-td key="brand" :props="props">
            <span class="text-bold">
              {{ props.row.brand }}
            </span>
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="tagd" :props="props">
            {{ props.row.tagd }}
          </q-td>
          <q-td key="rrp" :props="props">
            {{ props.row.rrp }}
          </q-td>
          <q-td key="avgReSalePrice" :props="props">
            <span
              class="text-bold"
              :class="props.row.delta > 0 ? 'text-positive' : 'text-negative'"
            >
              {{ props.row.avgReSalePrice }}
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
          </q-td>
          <q-td key="resaleFreq" :props="props">
            {{ props.row.resaleFreq }}
          </q-td>
          <q-td key="platforms" :props="props">
            <q-img
              :src="props.row.platforms"
              style="height: 20px"
              fit="contain"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const search = ref('');

const columns = ref([
  {
    name: 'image',
    label: 'Image',
    required: true,
    align: 'left',
    field: 'image',
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
    label: 'Model',
    required: true,
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    label: 'Item Code',
    name: 'tagd',
    align: 'center',
    field: 'tagd',
    sortable: true,
  },
  {
    label: 'RRP',
    name: 'rrp',
    align: 'center',
    field: 'rrp',
    sortable: true,
  },
  {
    label: 'Avg. Re-Selling price',
    name: 'avgReSalePrice',
    align: 'center',
    field: 'avgReSalePrice',
    sortable: true,
  },
  {
    label: 'Resale Freq.',
    name: 'resaleFreq',
    align: 'center',
    field: 'resaleFreq',
    sortable: true,
  },
  {
    label: 'Most popular platform(s)',
    name: 'platforms',
    align: 'left',
    field: 'platforms',
    sortable: true,
  },
]);

const rows = ref([
  {
    name: 'Item 1',
    brand: 'Zara',
    tagd: 'aaaa-bbbb-cccc-dddd',
    rrp: 1450,
    avgReSalePrice: 1000,
    delta: 1,
    resaleFreq: 'After 5 months',
    iron: '1%',
    image:
      'https://d3sfiwv4lracxf.cloudfront.net/eyJidWNrZXQiOiJ0b3RhbGx5LXRhZ2QtbWVkaWEtZGV2Iiwia2V5Ijoic3RvY2tJbWFnZXNcLzk4ZjhiNGIyLWZlYTgtNDliZC1hNWEzLTFmYjliMmYzMTcwNVwvemFyYV90b3RlX2JhZ19icm93bl8xLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NjQwLCJoZWlnaHQiOjY0MCwiZml0IjoiY292ZXIifX19',
    platforms:
      'https://d3sfiwv4lracxf.cloudfront.net/eyJidWNrZXQiOiJ0b3RhbGx5LXRhZ2QtbWVkaWEtZGV2Iiwia2V5IjoicmVzZWxsZXJBdmF0YXJcLzk4ZjhiYTRlLTA4OGEtNGJlZi1hYjg0LTRmOTY1MzA3OTU1N1wvZWJheV9sZy5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjY0MCwiaGVpZ2h0Ijo2NDAsImZpdCI6Imluc2lkZSJ9fX0=',
  },
  {
    name: 'Item 2',
    brand: 'Zara',
    tagd: 'aaaa-bbbb-cccc-dddd',
    rrp: 1450,
    avgReSalePrice: 1000,
    delta: -1,
    resaleFreq: 'After 5 months',
    iron: '1%',
    image:
      'https://d3sfiwv4lracxf.cloudfront.net/eyJidWNrZXQiOiJ0b3RhbGx5LXRhZ2QtbWVkaWEtZGV2Iiwia2V5Ijoic3RvY2tJbWFnZXNcLzk4ZjhiNGIzLTAwZmUtNDZiNC1hYmVlLWRhZmIzNWQ4MDBlYVwvemFyYV90b3RlX2JhZ18yLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NjQwLCJoZWlnaHQiOjY0MCwiZml0IjoiY292ZXIifX19',
    platforms:
      'https://d3sfiwv4lracxf.cloudfront.net/eyJidWNrZXQiOiJ0b3RhbGx5LXRhZ2QtbWVkaWEtZGV2Iiwia2V5IjoicmVzZWxsZXJBdmF0YXJcLzk4ZjhiYTRlLTA4OGEtNGJlZi1hYjg0LTRmOTY1MzA3OTU1N1wvZWJheV9sZy5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjY0MCwiaGVpZ2h0Ijo2NDAsImZpdCI6Imluc2lkZSJ9fX0=',
  },
]);

onMounted(() => {});
</script>
