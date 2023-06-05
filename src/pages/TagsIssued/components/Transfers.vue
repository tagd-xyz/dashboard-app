<template>
  <div>
    <div class="text-h6">By transfers count</div>
    <q-select
      v-model="data"
      :options="options"
      color="accent"
      @update:model-value="onSelected"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['selected']);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  // options: {
  //   type: Array,
  //   required: true,
  //   default: () => {
  //     return [];
  //   },
  // },
  // selected: {
  //   type: Array,
  //   required: true,
  //   default: () => {
  //     return [];
  //   },
  // },
});

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

onMounted(() => {
  // data.value = props.options;
});

function onSelected() {
  emit('selected', data.value);
}
</script>
