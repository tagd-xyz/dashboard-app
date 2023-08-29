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
import { computed, onMounted, ref, watch } from 'vue';
import { useRetailersAvgResaleValueStore } from 'stores/retailersAvgResaleValue';
import { useResellersAvgResaleValueStore } from 'stores/resellersAvgResaleValue';
import { useMeStore } from 'stores/me';
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
const resellersAvgResaleValueStore = useResellersAvgResaleValueStore();
const storeMe = useMeStore();

const avgResaleValuesStore = ref(null);

const isRetailer = computed(() => {
  return storeMe.isRetailer;
});

const data = computed(() => {
  return {
    title: '',
    labels: labels.value,
    fill: true,
    datasets: [
      {
        label: 'Avg. Resale Value',
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
  if (!avgResaleValuesStore.value) {
    return [];
  }

  return avgResaleValuesStore.value.graph.map((item) => {
    const date = new Date(Date.parse(item.since));
    return date.toLocaleString('default', { month: 'long' });
  });
});

const values = computed(() => {
  if (!avgResaleValuesStore.value) {
    return [];
  }
  return avgResaleValuesStore.value.graph.map((item) => {
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
  return avgResaleValuesStore.value && avgResaleValuesStore.value.isFetching;
});


watch (isRetailer, (current) => {
  avgResaleValuesStore.value = current
    ? retailersAvgResaleValueStore
    : resellersAvgResaleValueStore;
});

watch(avgResaleValuesStore, (current) => {
  current.fetch();
});

onMounted(() => {
});
</script>
