<template>
  <div>
    <div class="text-h6">By Dates</div>
    <div class="q-mt-sm">
      {{ rangeForHumans }}
    </div>
    <q-date v-model="range" range flat minimal color="primary" @update:model-value="onSelected" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { date } from 'quasar';

const emit = defineEmits(['selected']);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  from: {
    type: String,
    required: true,
    default: '',
  },
  to: {
    type: String,
    required: true,
    default: '',
  },
});

const range = ref({
  from: props.from,
  to: props.to,
});

const rangeForHumans = computed(() => {
  const from = range?.value?.from ?? null;
  const to = range?.value?.to ?? null;

  if (from && to) {
    const fromNice = date.formatDate(from, 'MMM Do');
    const toNice = date.formatDate(to, 'MMM Do');
    const diff = date.getDateDiff(to, from, 'days');
    const diffNice = 1 == diff ? 'day' : 'days';
    return `${diff} ${diffNice}. From ${fromNice} to ${toNice}`;
  } else {
    return '';
  }
});

onMounted(() => { });

function onSelected() {
  if (range.value) {
    emit('selected', range.value);
  }
}
</script>

<style scoped>
.q-date__header.bg-primary {
  background-color: white !important;
}
</style>
