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
            >Average Resale Value</span
          >
        </div>
        <div class="text-caption text-accent">
          Average resale value in the previous 6 months
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
        <div class="q-ma-sm text-h5 text-bold">{{ average }}%</div>
        <div class="q-ma-sm text-subtitle2" style="min-height: 3rem">
          <span v-if="hasIncreased || hasDecreased">
            The average resale value of your products is
            {{ hasDecreased ? 'decreased' : 'increased' }}
            by {{ Math.abs(average) }}%
          </span>
          <span v-else>
            The average resale value of your products has not changed
          </span>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useRetailersAvgResaleValueStore } from 'stores/retailers/avgResaleValue';
import { useResellersAvgResaleValueStore } from 'stores/resellers/avgResaleValue';
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
  Filler,
} from 'chart.js';
import { Line } from 'vue-chartjs';
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

const retailersAvgResaleValueStore = useRetailersAvgResaleValueStore();
const resellersAvgResaleValueStore = useResellersAvgResaleValueStore();
const meStore = useMeStore();

const isRetailer = computed(() => {
  return meStore.isRetailer;
});

const isReseller = computed(() => {
  return meStore.isReseller;
});

const avgResaleValuesStore = computed(() => {
  if (isRetailer.value) {
    return retailersAvgResaleValueStore;
  } else if (isReseller.value) {
    return resellersAvgResaleValueStore;
  } else {
    return null;
  }
});

watch(avgResaleValuesStore, (current) => {
  if (current && current.isEmpty && !current.isFetching) {
    current.fetch();
  }
});

const data = computed(() => {
  return {
    labels: labels.value,
    datasets: [
      {
        label: 'Avg. Resale Value',
        backgroundColor: color.value,
        data: values.value,
        tension: 0.3,
        showLine: true,
        borderWidth: 6,
        fill: 'origin',
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
    maintainAspectRatio: false,
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
  return average.value > 0;
});

const hasDecreased = computed(() => {
  return average.value < 0;
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
  return avgResaleValuesStore.value && avgResaleValuesStore.value.isFetching;
});

onMounted(() => {});
</script>
