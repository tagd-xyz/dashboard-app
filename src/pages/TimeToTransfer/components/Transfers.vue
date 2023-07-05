<template>
  <div>
    <div class="text-h6">By x<sup>th</sup> transfer</div>
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

onMounted(() => {
  // data.value = props.options;
});

function onSelected() {
  emit('selected', data.value);
}
</script>
