<template>
  <q-dialog v-model="showModal">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6 text-center text-bold q-mt-md q-mb-lg">Add to Log</div>
        <div class="info">
          <div class=""><span class="text-bold">Serving Size: </span>{{ food?.serving_size }}</div>
          <q-input label="Portion (grams)" type="number" v-model="portion"></q-input>
          <q-select id="meal" label="Meal" :options="['Breakfast', 'Lunch', 'Dinner', 'Snack']" v-model="meal">
          </q-select>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="secondary" v-close-popup />
        <q-btn label="Add" color="secondary" v-close-popup @click="addItem" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue';

</script>