<template>
  <div>
    <div class="text-h6">By transfers count</div>
    <q-select v-model="data" :options="options" color="accent" @update:model-value="onSelected" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['selected']);

const data = ref(['Any']);

const options = ref([
  'Any',
  'None',
  'One',
  'Two',
  'Three',
  'Four',
  'Five or more',
]);

function onSelected() {
  emit('selected', data.value);
}
</script>
