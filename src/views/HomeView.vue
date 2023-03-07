<script setup>
import { ref, onMounted, toRaw } from 'vue';
import { useProductStore } from '../stores/productStore';
import { useSettingsStore } from '../stores/settingsStore';

const store = useProductStore();
const settingsStore = useSettingsStore();

const goal = ref();
const current = ref();

const currentValue = ref(current);
const percentage = ref();

let tdFood;

const todaysFood = ref()

const breakfast = ref();
const lunch = ref();
const dinner = ref();
const snacks = ref();

onMounted(async () => {
  const storedGoal = settingsStore.getGoal;
  goal.value = storedGoal;
  
  await store.fetchTodaysFoods();
  tdFood = toRaw(store.getFooods);
  todaysFood.value = store.getFooods;
  
  let total = 0;
  for(let i = 0; i < tdFood.length; i++) {
    total += calculateCalories(tdFood[i].kcal, tdFood[i].portionSize);
  }
  current.value = total;
  
  percentage.value = Math.round((toRaw(current.value) / toRaw(goal.value) * 100));
  console.log(tdFood)
  
  if(tdFood) {
    const bf = tdFood.filter((item) => item.meal === 'Breakfast');
    const lc = tdFood.filter((item) => item.meal === 'Lunch');
    const dn = tdFood.filter((item) => item.meal === 'Dinner');
    const sn = tdFood.filter((item) => item.meal === 'Snack');

    console.log(bf)
    console.log(lc)

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
    <div class="row justify-end"><q-btn to="/settings" round color="secondary" class="q-mr-md q-mt-md"><img  src="/images/settings.svg"/></q-btn></div>
    <div class="row justify-center">
      <span class="text-h5 text-center">Your Tracked Food <br />Today</span>
    </div>
    <div class="justify-center text-center q-mt-xl">
      <vep :progress="percentage" :angle="0" color="#e94f37ff" emptyColor="#ffffff" :size="300" :thickness="3" emptyThickness="3%" :legend="currentValue" fontColor="black" :half="true" fontSize="3rem"> </vep>
    </div>
    <q-list class="log">
      <span class="text-caption text-bold q-ml-sm">Breakfast</span><br />
      <span v-if="breakfast && breakfast.length === 0" class="q-ml-sm text-grey">No entries yet</span>
          <q-item class="product-item" v-for="(p, i) in breakfast" :key="i">
            <q-item-section>
              <q-item-label
                ><span class="text-subtitle1 q-mr-sm">{{ p.name }}</span
                ><span class="text-caption">{{ p.portionSize }} g</span></q-item-label
              >
              <q-item-label caption>{{ calculateCalories(p.kcal, p.portionSize) }} kcal</q-item-label>
              <q-btn></q-btn>
            </q-item-section>
          </q-item>
    </q-list>
    <q-list class="log">
      <span  class="text-caption text-bold q-ml-sm">Lunch</span><br />
      <span v-if="lunch && lunch.length === 0" class="q-ml-sm text-grey">No entries yet</span>
          <q-item class="product-item" v-for="(l, i) in lunch" :key="i">
            <q-item-section>
              <q-item-label
                ><span class="text-subtitle1 q-mr-sm">{{ l.name }}</span
                ><span class="text-caption">{{ l.portionSize }} g</span></q-item-label
              >
              <q-item-label caption>{{ calculateCalories(l.kcal, l.portionSize) }} kcal</q-item-label>
            </q-item-section>
          </q-item>
    </q-list>
    <q-list class="log">
      <span class="text-caption text-bold q-ml-sm">Dinner</span><br />
      <span v-if="dinner && dinner.length === 0" class="q-ml-sm text-grey">No entries yet</span>
      <q-item class="product-item" v-for="(d, i) in dinner" :key="i">
            <q-item-section>
              <q-item-label
                ><span class="text-subtitle1 q-mr-sm">{{ d.name }}</span
                ><span class="text-caption">{{ d.portion }} g</span></q-item-label
              >
              <q-item-label caption> {{ calculateCalories(d.calories, d.portion) }} kcal</q-item-label>
            </q-item-section>
          </q-item>
    </q-list>
    <q-list class="log">
      <span class="text-caption text-bold q-ml-sm">Snacks</span><br />
      <span v-if="snacks && snacks.length === 0" class="q-ml-sm text-grey">No entries yet</span>
          <q-item class="product-item" v-for="(s, i) in snacks" :key="i">
            <q-item-section>
              <q-item-label
                ><span class="text-subtitle1 q-mr-sm">{{ s.name }}</span
                ><span class="text-caption">{{ s.portionSize }} g</span></q-item-label
              >
              <q-item-label caption>{{ calculateCalories(s.kcal, s.portionSize) }} kcal</q-item-label>
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
