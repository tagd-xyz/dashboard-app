<template>
  <div>
    <q-card class="q-py-sm">
      <q-card-section v-if="isLoading">
        <q-spinner color="primary" />
        loading, please wait ...
      </q-card-section>
      <q-card-section v-if="!isLoading">
        <div class="text-h6">
          <span
            :class="{
              'text-negative': hasDecreased,
              'text-positive': hasIncreased,
            }"
            >Return Rate</span
          >
        </div>
        <div class="text-caption text-accent">
          Return rate in the previous 6 months
        </div>
        <Line :data="data" :options="options" style="max-height: 20rem" />
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
          <q-icon
            size="lg"
            name="trending_flat"
            v-if="!hasDecreased && !hasIncreased"
          />
        </div>
        <div class="q-ma-sm text-h5 text-bold">{{ competitorsRate }}%</div>
        <div class="q-ma-sm text-subtitle2" style="min-height: 3rem">
          <span v-if="hasIncreased || hasDecreased">
            Your competitors have a {{ Math.abs(competitorsRate) }}%
            {{ hasDecreased ? 'less' : 'more' }} return rate.
          </span>
          <span v-else> Your competitors have the same return rate. </span>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useRetailersReturnRateStore } from 'stores/retailers/returnRate';
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
import { computed, onMounted } from 'vue';
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

const retailersReturnRateStore = useRetailersReturnRateStore();

const data = computed(() => {
  return {
    labels: labels.value,
    datasets: [
      {
        backgroundColor: [color.value],
        label: 'Return Rate',
        data: values.value,
        tension: 0.5,
        showLine: true,
        borderWidth: 6,
        fill: 'origin',
      },
    ],
  };
});
1;
const labels = computed(() => {
  return retailersReturnRateStore.graph.map((item) => {
    const date = new Date(Date.parse(item.since));
    return date.toLocaleString('default', { month: 'long' });
  });
});

const values = computed(() => {
  return retailersReturnRateStore.graph.map((item) => {
    return item.mineRate;
  });
});

const mineReturned = computed(() => {
  return retailersReturnRateStore.graph.reduce((x, y) => x + y.mineReturned, 0);
});

const mineTotal = computed(() => {
  return retailersReturnRateStore.graph.reduce((x, y) => x + y.mineTotal, 0);
});

const mineRate = computed(() => {
  return mineTotal.value
    ? Math.round((mineReturned.value / mineTotal.value) * 100, 2)
    : 0;
});

const othersReturned = computed(() => {
  return retailersReturnRateStore.graph.reduce(
    (x, y) => x + y.othersReturned,
    0
  );
});

const othersTotal = computed(() => {
  return retailersReturnRateStore.graph.reduce((x, y) => x + y.othersTotal, 0);
});

const othersRate = computed(() => {
  return othersTotal.value
    ? Math.round((othersReturned.value / othersTotal.value) * 100, 2)
    : 0;
});

const competitorsRate = computed(() => {
  return othersRate.value - mineRate.value;
});

const options = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        // ticks: {
        //   stepSize: 1,
        // },
      },
    },
  };
});

const hasIncreased = computed(() => {
  return competitorsRate.value > 0;
});

const hasDecreased = computed(() => {
  return competitorsRate.value < 0;
});

const color = computed(() => {
  if (hasIncreased.value) {
    return 'rgba(96, 211, 148, 0.7)';
  } else if (hasDecreased.value) {
    return 'rgba(238, 96, 85, 0.7)';
  } else {
    return 'grey';
  }
});

const isLoading = computed(() => {
  return retailersReturnRateStore.is.fetching;
});

onMounted(() => {
  retailersReturnRateStore.fetch();
});
</script>
