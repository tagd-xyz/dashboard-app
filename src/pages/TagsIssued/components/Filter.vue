<template>
  <Brands
    :options="props.brands"
    @selected="onBrandsSelected"
    class="q-mb-md"
  />
  <CustomerStatus @selected="onCustomerStatusSelected" class="q-mb-md" />
  <Transfers @selected="onTransfersCountSelected" class="q-mb-md" />
  <TagsStatus @selected="onTagsStatusSelected" class="q-mb-md" />
</template>

<script setup>
import { onMounted } from 'vue';
import Brands from './Brands.vue';
import CustomerStatus from './CustomerStatus.vue';
import Transfers from './Transfers.vue';
import TagsStatus from './TagsStatus.vue';

const emit = defineEmits([
  'brandsSelected',
  'customerStatusSelected',
  'transfersCountSelected',
  'tagsStatusSelected',
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
});

onMounted(() => {
  // data.value = props.selected;
});

function onBrandsSelected(brands) {
  emit('brandsSelected', brands);
}

function onCustomerStatusSelected(customerStatus) {
  emit('customerStatusSelected', customerStatus);
}

function onTransfersCountSelected(transfers) {
  emit('transfersCountSelected', transfers);
}

function onTagsStatusSelected(tagsStatus) {
  emit('tagsStatusSelected', tagsStatus);
}
</script>
