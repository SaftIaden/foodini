<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';

const food = ref()

const store = useProductStore();

const values = [ 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80 ]

</script>
<template>
  <div>
    {{ store.product }}
    <!--x <Picker :options="values" v-model="currentYear" /> -->
  </div>
  <q-page-sticky position="bottom-left" class="q-mb-lg">
      <q-btn to="/add/custom" round color="secondary"><img src="/images/plus.svg" /></q-btn>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" class="q-mb-lg">
      <q-btn to="/add/scan" round color="secondary"><img src="/images/plus.svg" /></q-btn>
    </q-page-sticky>
</template>
<style>
</style>