<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '../stores/productStore';

const store = useProductStore();

const goal = 2200;
const current = 1846;

const currentValue = ref(current);
const percentage = ref(Math.round((current / goal) * 100));

let tdFood;

const todaysFood = ref()
const breakfast = ref();
const lunch = ref(null);
const dinner = ref();
const snacks = ref();

onMounted(async () => {
  await store.fetchTodaysFoods();
  tdFood = store.getFooods;
  todaysFood.value = store.getFooods;
  console.log(tdFood)

  if(tdFood) {
    const bf = tdFood.filter((item) => item.meal === 'Breakfast');
    const lc = tdFood.filter((item) => item.meal === 'Lunch');
    const dn = tdFood.filter((item) => item.meal === 'Dinner');
    const sn = tdFood.filter((item) => item.meal === 'Snack');

    console.log(breakfast)

    breakfast.value = bf;
    lunch.value = lc;
    dinner.value = dn;
    snacks.value = sn;
  }
  console.log(breakfast.value)
  console.log(lunch.value)
});

function calculateCalories(per100g, weight) {
  const unrounded = (Number(per100g) / 100) * Number(weight);
  return Math.round(unrounded);
}



</script>

<template>
  <div class="">
    {{ lunch }}
    <div class="row justify-center">
      <span class="text-h5 text-center" style="margin-top: 100px">Your tracked food <br />today</span>
    </div>
    <div class="justify-center text-center q-mt-xl">
      <vep :progress="percentage" :angle="0" color="#e94f37ff" emptyColor="#4c5c68ff" :size="300" :thickness="3" emptyThickness="3%" :legend="currentValue" fontColor="black" :half="true" fontSize="3rem"> </vep>
    </div>
    <q-list class="log">
      <span class="text-caption text-bold q-ml-sm">Breakfast</span><br />
          <q-item class="product-item" v-for="(p, i) in breakfast" :key="i">
            <q-item-section>
              <q-item-label
                ><span class="text-subtitle1 q-mr-sm">{{ p.name }}</span
                ><span class="text-caption">{{ p.portionSize }} g</span></q-item-label
              >
              <q-item-label caption>{{ calculateCalories(p.kcal, p.portionSize) }} kCal</q-item-label>
            </q-item-section>
          </q-item>
    </q-list>
    <q-list class="log">
      <span  class="text-caption text-bold q-ml-sm">Lunch</span><br />
          <q-item class="product-item" v-for="(l, i) in lunch" :key="i">
            <q-item-section>
              <q-item-label
                ><span class="text-subtitle1 q-mr-sm">{{ l.name }}</span
                ><span class="text-caption">{{ l.portionSize }} g</span></q-item-label
              >
              <q-item-label caption>{{ calculateCalories(l.kcal, l.portionSize) }} kCal</q-item-label>
            </q-item-section>
          </q-item>
    </q-list>
    <q-list class="log">
      <span class="text-caption text-bold q-ml-sm">Dinner</span><br />
          <q-item class="product-item" v-for="(d, i) in dinner" :key="i">
            <q-item-section>
              <q-item-label
                ><span class="text-subtitle1 q-mr-sm">{{ d.name }}</span
                ><span class="text-caption">{{ d.portion }} g</span></q-item-label
              >
              <q-item-label caption> {{ calculateCalories(d.calories, d.portion) }} kCal</q-item-label>
            </q-item-section>
          </q-item>
    </q-list>
    <q-list class="log">
      <span class="text-caption text-bold q-ml-sm">Snacks</span><br />
          <q-item class="product-item" v-for="(s, i) in snacks" :key="i">
            <q-item-section>
              <q-item-label
                ><span class="text-subtitle1 q-mr-sm">{{ s.name }}</span
                ><span class="text-caption">{{ s.portionSize }} g</span></q-item-label
              >
              <q-item-label caption>{{ calculateCalories(s.kcal, s.portionSize) }} kCal</q-item-label>
            </q-item-section>
          </q-item>
    </q-list>
    <q-page-sticky position="bottom" class="q-mb-lg">
      <q-btn to="/add" round color="secondary"><img src="/images/plus.svg" /></q-btn>
    </q-page-sticky>
  </div>
</template>
<style>
.product-item {
  border: 1px solid #4c5c68ff;
  border-radius: 10px;
  width: 95%;
  margin: 5px auto 5px;
}

</style>
