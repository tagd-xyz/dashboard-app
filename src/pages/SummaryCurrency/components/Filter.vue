<template>
  <Brands
    :options="props.brands"
    @selected="onBrandsSelected"
    class="q-mb-md"
  />
  <Model @updated="onModelUpdated" />
  <Countries
    :options="props.countries"
    @selected="onCountriesSelected"
    class="q-mb-md"
  />
  <City @updated="onCityUpdated" />
</template>

<script setup>
import { onMounted } from 'vue';
import Brands from './Brands.vue';
import Countries from './Countries.vue';
import City from './City.vue';
import Model from './Model.vue';

const emit = defineEmits([
  'brandsSelected',
  'countriesSelected',
  'modelUpdated',
  'cityUpdated',
  'transfersCountSelected',
]);

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  brands: {
    type: Array,
    required: true,
    default: () => {
      return [];
    },
  },
  countries: {
    type: Array,
    required: true,
    default: () => {
      return [];
    },
  },
});

onMounted(() => {
  // data.value = props.selected;
});

function onBrandsSelected(brands) {
  emit('brandsSelected', brands);
}

function onCountriesSelected(countries) {
  emit('countriesSelected', countries);
}

function onCityUpdated(model) {
  emit('cityUpdated', model);
}

function onModelUpdated(model) {
  emit('modelUpdated', model);
}
</script>
