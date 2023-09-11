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
  labels: {
    type: Array,
    required: true,
    default: () => {},
  },
  maxData: {
    type: Array,
    required: true,
    default: () => {},
  },
  minData: {
    type: Array,
    required: true,
    default: () => {},
  },
  meanData: {
    type: Array,
    required: true,
    default: () => {},
  },
  medianData: {
    type: Array,
    required: true,
    default: () => {},
  },
  stdDevData: {
    type: Array,
    required: true,
    default: () => {},
  },
});

const data = computed(() => {
  const dataset = {
    responsive: true,
    tension: 0.25,
    showLine: true,
    borderWidth: 2,
    fill: false,
  };

  return {
    title: '',
    labels: props.labels,
    datasets: [
      {
        ...dataset,
        label: 'min.',
        backgroundColor: '#99AA38',
        borderColor: '#99AA38',
        data: props.minData,
      },
      {
        ...dataset,
        label: 'max.',
        backgroundColor: '#0A210F',
        borderColor: '#0A210F',
        data: props.maxData,
      },
      {
        ...dataset,
        label: 'mean',
        backgroundColor: '#14591D',
        borderColor: '#14591D',
        data: props.meanData,
      },
      {
        ...dataset,
        label: 'median',
        backgroundColor: '#E1E289',
        borderColor: '#E1E289',
        data: props.medianData,
      },
      {
        ...dataset,
        label: 'std.dev.',
        backgroundColor: '#ACD2ED',
        borderColor: '#ACD2ED',
        data: props.stdDevData,
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
        display: 'label' != '',
      },
    },
  };
});
</script>
