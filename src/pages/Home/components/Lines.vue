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
    default: 'label',
  },
});

const data = computed(() => {
  return {
    title: 'test',
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    fill: true,
    datasets: [
      {
        label: props.label,
        backgroundColor: props.color,
        data: [40, 39, 10, 40, 39, 80, 40],
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
  };
});
</script>
