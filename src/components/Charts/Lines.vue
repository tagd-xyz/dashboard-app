<template>
  <div>
    <Line :data="data" :options="options" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { computed } from 'vue';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  color: {
    type: String,
  },
  label: {
    type: String,
    default: '',
  },
  labels: {
    type: Array,
    required: true,
    default: () => {},
  },
  data: {
    type: Array,
    required: true,
    default: () => {},
  },
});

const data = computed(() => {
  return {
    title: '',
    labels: props.labels,
    datasets: [
      {
        responsive: true,
        label: props.label,
        backgroundColor: props.color,
        data: props.data,
        tension: 0.7,
        showLine: true,
        fill: 'origin',
      },
    ],
  };
});

const options = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: props.label != '',
      },
    },
  };
});
</script>
