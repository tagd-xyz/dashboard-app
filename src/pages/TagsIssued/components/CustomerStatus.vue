<template>
  <div>
    <div class="text-h6">By customer status</div>
    <q-select v-model="data" :options="options" color="accent" @update:model-value="onSelected" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['selected']);

const data = ref(['Any']);

const options = ref(['Any', 'Registered', 'Unregistered']);

function onSelected() {
  emit('selected', data.value);
}
</script>
