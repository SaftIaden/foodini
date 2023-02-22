<script setup>
import { ref } from 'vue';

const goal = 2200;
const current = 1846;

const currentValue = ref(current);
const percentage = ref(Math.round((current / goal) * 100));

const log = [
  {
    meal: 'breakfast',
    products: [
      {
        name: "Kellogg's Cereal",
        portion: '120g',
        calories: 212,
      },
      {
        name: 'Milk',
        portion: '89g',
        calories: 98,
      },
    ],
  },
  {
    meal: 'lunch',
    products: [
      {
        name: 'Chicken',
        portion: '100g',
        calories: 200,
      },
      {
        name: 'Potatoes',
        portion: '100g',
        calories: 200,
      },
    ],
  },
  {
    meal: 'dinner',
    products: [
      {
        name: 'Salmon',
        portion: '100g',
        calories: 200,
      },
      {
        name: 'Rice',
        portion: '100g',
        calories: 200,
      },
    ],
  },
];
</script>

<template>
  <div class="">
    <div class="row justify-center">
      <span class="text-h5 text-center" style="margin-top: 100px">Your tracked food <br />today</span>
    </div>
    <div class="justify-center text-center q-mt-xl">
      <vep :progress="[percentage, 100]" :angle="0" color="#e94f37ff" emptyColor="#4c5c68ff" :size="300" :thickness="3" emptyThickness="3%" :legend="currentValue" fontColor="black" :half="true" fontSize="3rem"> </vep>
    </div>
    <q-list bordered class="log">
      <q-item class="product-item" v-for="(p, i) in products" :key="i">
        <q-item-section>
          <q-item-label
            ><span class="text-subtitle1 q-mr-sm">{{ p.name }}</span
            ><span class="text-caption">{{ p.portion }}</span></q-item-label
          >
          <q-item-label caption>{{ p.calories }}kCal</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-page-sticky position="bottom" class="q-mb-lg">
      <q-btn to="/scan" round color="secondary"><img src="/images/plus.svg" /></q-btn>
    </q-page-sticky>
  </div>
</template>
<style>
.product-item {
  border: 1px solid #4c5c68ff;
  border-radius: 10px;
  width: 80 95%;
  margin: 5px auto 5px;
}
</style>

