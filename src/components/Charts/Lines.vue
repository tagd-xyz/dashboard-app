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
  Legend
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
    title: 'test',
    labels: props.labels,
    fill: true,
    datasets: [
      {
        responsive: true,
        label: props.label,
        backgroundColor: props.color,
        data: props.data,
        tension: 0.7,
        showLine: true,
      },
    ],
  };
});

const options = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: props.label != '',
      },
    },
  };
});
</script>
