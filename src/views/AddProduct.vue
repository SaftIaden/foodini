<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';

const food = ref()

const store = useProductStore();

const props = defineProps({
  barcode: {
    type: String,
    required: true,
  },
});

onMounted(async () => {
  console.log(store);
  console.log(store.product);
});

</script>
<template>
  <div>
    {{ props.barcode }}
    {{ food }}
  </div>
</template>
<style>
</style>