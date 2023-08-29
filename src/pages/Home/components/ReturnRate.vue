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
        <div class="q-ma-sm text-h5 text-bold">{{ competitorsRate }}%</div>
        <div class="q-ma-sm text-subtitle2">
          Your competitors have a {{ competitorsRate }}%
          {{ hasDecreased ? 'less' : 'more' }} return rate.
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useRetailersReturnRateStore } from 'stores/retailersReturnRate';
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

const retailersReturnRateStore = useRetailersReturnRateStore();

const data = computed(() => {
  return {
    title: 'test',
    labels: labels.value,
    fill: true,
    datasets: [
      {
        label: 'Return Rate',
        backgroundColor: color.value,
        data: values.value,
        tension: 0.7,
        showLine: true,
      },
    ],
  };
});

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
  return mineTotal.value ? Math.round(mineReturned.value / mineTotal.value * 100, 2) : 0;
});

const othersReturned = computed(() => {
  return retailersReturnRateStore.graph.reduce((x, y) => x + y.othersReturned, 0);
});

const othersTotal = computed(() => {
  return retailersReturnRateStore.graph.reduce((x, y) => x + y.othersTotal, 0);
});

const othersRate = computed(() => {
  return othersTotal.value ? Math.round(othersReturned.value / othersTotal.value * 100, 2) : 0;
});

const competitorsRate = computed(() => {
  return othersRate.value - mineRate.value;
});

const options = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: true,
  };
});

const hasIncreased = computed(() => {
  return competitorsRate.value > 0;
});

const hasDecreased = computed(() => {
  return competitorsRate.value < 0;
});

const color = computed(() => {
  return hasIncreased.value ? '#60d394' : '#ee6055';
});

const isLoading = computed(() => {
  return retailersReturnRateStore.is.fetching;
});

onMounted(() => {
  retailersReturnRateStore.fetch();
});
</script>
