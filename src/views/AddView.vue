<template>
  <q-page-container>
    <q-page class="q-pa-md">
      <div class="row justify-center q-mt-xl">
        <span class="text-h5 text-center">Add a Food Item to your Log</span>
      </div>
      <div style="height:70px"></div>
      <div class="row justify-center q-mt-xl">
        <span class="text-h6 text-weight-regular text-center" style="width:80%;">You can add a custom Item using your own values or scan the barcode of a product!</span>
      </div>
      <q-page-sticky position="bottom-left" class="q-mb-lg q-ml-lg">
        <q-btn to="/add/custom" round color="secondary"><img src="/images/sliders.svg" /></q-btn>
      </q-page-sticky>
      <q-page-sticky position="bottom-right" class="q-mb-lg q-mr-lg">
        <q-btn to="/scan" round color="secondary"><img src="/images/camera.svg" /></q-btn>
      </q-page-sticky>
    </q-page>
  </q-page-container>
</template>
<script>
import { onMounted } from 'vue';
import { useProductStore } from '../stores/productStore';


const store = useProductStore();

onMounted(async () => {
  console.log(store);
  console.log(store.product);
});

</script>
<style>
</style>
