<template>
  <q-page-container>
    <q-page class="q-pa-md">
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';

const food = ref();

const store = useProductStore();

onMounted(async () => {
  console.log(store);
  console.log(store.product);
});

</script>
<style>
</style>
