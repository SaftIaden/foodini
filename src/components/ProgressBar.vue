<script setup>
import { ref } from 'vue';

const goal = 2200;
const current = 1846;

const legendValue = ref('1846/2200')
const currentValue = ref(current);
const percentage = ref(Math.round((current/goal)*100));

</script>
<template>
  <div class="justify-center">

  </div>
</template>
<style></style>

