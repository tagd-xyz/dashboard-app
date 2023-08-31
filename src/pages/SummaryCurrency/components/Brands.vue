<template>
  <div>
    <div class="text-h6">By brand</div>
    <q-select v-model="data" multiple :options="options" color="accent" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';

const emit = defineEmits(['selected']);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => {
      return [];
    },
  },
});

const data = ref(['Any']);

const options = computed(() => {
  return ['Any'].concat(props.options);
});

onMounted(() => {});

watch(data, (current, before) => {
  if (
    0 == current.length ||
    (current.includes('Any') && !before.includes('Any'))
  ) {
    // 'Any' hast just been selected?
    data.value = ['Any'];
  } else if (
    before.includes('Any') &&
    1 == before.length &&
    !(current.includes('Any') && 1 == current.length)
  ) {
    // Something different than 'Any' has just been selected
    data.value = data.value.filter((e) => e !== 'Any');
  }

  emit('selected', data.value);
});
</script>
