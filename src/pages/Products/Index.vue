<template>
  <div class="q-pa-lg">
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical>
          <q-tab
            name="fashion"
            :icon="tab == 'fashion' ? 'folder_open' : 'folder'"
            label="Fashion"
          />
          <q-tab
            name="shoes"
            :icon="tab == 'shoes' ? 'folder_open' : 'folder'"
            label="Shoes"
          />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="fashion">
            <div class="text-h4 q-mb-md">Fashion</div>
            <Table />
          </q-tab-panel>

          <q-tab-panel name="shoes">
            <div class="text-h4 q-mb-md">Shoes</div>
            <Table />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script setup>
import Table from './components/Table.vue';

import { onMounted, ref } from 'vue';

const tab = ref('fashion');
const splitterModel = ref(10);

onMounted(() => {});
</script>
