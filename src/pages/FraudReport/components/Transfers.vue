<template>
  <div>
    <div class="text-h6">By x<sup>th</sup> transfer</div>
    <q-select v-model="data" :options="options" color="accent" @update:model-value="onSelected" />
  </div>
</template>

<script setup>
import {
  ref
} from 'vue';

const emit = defineEmits(['selected']);

// eslint-disable-next-line no-unused-vars

const data = ref(['First']);

const options = ref([
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
  'Sixth',
  'Seventh',
  'Eighth',
  'Ninth',
  'Tenth',
]);

function onSelected() {
  emit('selected', data.value);
}
</script>
