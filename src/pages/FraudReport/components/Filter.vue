<template>
  <Brands
    :options="props.brands"
    @selected="onBrandsSelected"
    class="q-mb-md"
  />
</template>

<script setup>
import { onMounted } from 'vue';
import Brands from './Brands.vue';

const emit = defineEmits(['brandsSelected', 'transfersCountSelected']);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  brands: {
    type: Array,
    required: true,
    default: () => {
      return [];
    },
  },
});

onMounted(() => {
  // data.value = props.selected;
});

function onBrandsSelected(brands) {
  emit('brandsSelected', brands);
}
</script>
