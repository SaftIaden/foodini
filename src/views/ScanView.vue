<script setup>
import { StreamBarcodeReader } from 'vue-barcode-reader';
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';

const runScanner = ref(false);

const store = useProductStore();

const router = useRouter();

const props = defineProps({
  barcode: {
    type: String,
    required: true,
  },
});


/* const worldOFF = new off();
const atOFF = worldOFF.country("at"); */
const query = 'https://world.openfoodfacts.org/api/v0/product/'

async function findFood(barcode) {
  const response = await axios.get(query + barcode + '.json');
  console.log(response);
  return response.data;
};


const onDecode = async (result) => {
  runScanner.value = false;
  console.log(result);
  store.$state.barcode = result;

  await store.fetchProduct();

  router.push(`add/${result}`);
/*window.navigator.vibrate(1000); */
};
const onLoaded = () => {
  console.log('loaded');
};

</script>
<template>
  <q-btn @click="runScanner = !runScanner">SCAN</q-btn>
  <StreamBarcodeReader v-if="runScanner" @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
</template>
<style></style>
