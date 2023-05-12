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
          <small>Items Re-Sold</small>
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
    name: 'ebay',
    total: '100',
    delta: 1,
    image:
      'https://d3sfiwv4lracxf.cloudfront.net/eyJidWNrZXQiOiJ0b3RhbGx5LXRhZ2QtbWVkaWEtZGV2Iiwia2V5IjoicmVzZWxsZXJBdmF0YXJcLzk4ZjhiYTRlLTA4OGEtNGJlZi1hYjg0LTRmOTY1MzA3OTU1N1wvZWJheV9sZy5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjY0MCwiaGVpZ2h0Ijo2NDAsImZpdCI6Imluc2lkZSJ9fX0=',
  },
]);

onMounted(() => {});
</script>
