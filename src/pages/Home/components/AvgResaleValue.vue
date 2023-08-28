<template>
  <div>
    <q-card class="my-card">
      <q-card-section v-if="isLoading">
        <q-spinner color="primary" />
        loading, please wait ...
      </q-card-section>
      <q-card-section v-if="!isLoading">
        <Line :data="data" :options="options" />
      </q-card-section>
      <q-card-section v-if="!isLoading" horizontal vertical-middle>
        <div class="q-ma-sm">
          <q-icon
            size="lg"
            name="north_east"
            color="positive"
            v-if="hasIncreased"
          />
          <q-icon
            size="lg"
            name="south_east"
            color="negative"
            v-if="hasDecreased"
          />
        </div>
        <div class="q-ma-sm text-h5 text-bold">{{ average }}%</div>
        <div class="q-ma-sm text-subtitle2">
          The average resale value of your products is
          {{ hasDecreased ? 'decreased' : 'increased' }}
          by {{ average }}%
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useRetailersAvgResaleValueStore } from 'stores/retailersAvgResaleValue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { computed, onMounted } from 'vue';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const retailersAvgResaleValueStore = useRetailersAvgResaleValueStore();

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  label: {
    type: String,
    default: 'label',
  },
});

const data = computed(() => {
  return {
    title: 'test',
    labels: labels.value,
    fill: true,
    datasets: [
      {
        label: props.label,
        backgroundColor: color.value,
        data: values.value,
        tension: 0.7,
        showLine: true,
      },
    ],
  };
});

const average = computed(() => {
  if (values.value.length === 0) return 0;

  const avg = values.value.reduce((x, y) => x + y) / values.value.length;
  return Math.round(avg * 100) / 100;
});

const labels = computed(() => {
  return retailersAvgResaleValueStore.graph.map((item) => {
    const date = new Date(Date.parse(item.since));
    return date.toLocaleString('default', { month: 'long' });
  });
});

const values = computed(() => {
  return retailersAvgResaleValueStore.graph.map((item) => {
    return item.value;
  });
});

const options = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: true,
  };
});

const hasIncreased = computed(() => {
  return average.value > 0;
});

const hasDecreased = computed(() => {
  return average.value < 0;
});

const color = computed(() => {
  return hasIncreased.value ? '#60d394' : '#ee6055';
});

const isLoading = computed(() => {
  return retailersAvgResaleValueStore.is.fetching;
});

onMounted(() => {
  retailersAvgResaleValueStore.fetch();
});
</script>
