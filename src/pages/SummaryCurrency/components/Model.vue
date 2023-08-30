<template>
  <div>
    <div class="text-h6">By model</div>
    <q-input v-model="data" placeholder="Any" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const emit = defineEmits(['updated']);

const data = ref(null);

onMounted(() => {});

watch(data, (current) => {
  emit('updated', current);
});
</script>
