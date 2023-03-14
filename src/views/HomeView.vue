<script setup>
import { ref, onMounted, toRaw } from 'vue';
import { useProductStore } from '../stores/productStore';
import { useSettingsStore } from '../stores/settingsStore';
import { sub, add, fromUnixTime, format, isSameDay } from 'date-fns';
import FoodModal from '../components/FoodModal.vue';

const store = useProductStore();
const settingsStore = useSettingsStore();

const goal = ref();
const current = ref();

const currentValue = ref(current);
const percentage = ref();
const templateDate = ref();

let tdFood;

const todaysFood = ref()

const breakfast = ref();
const lunch = ref();
const dinner = ref();
const snacks = ref();

const selectedDate = ref(new Date());

const yesterdaysDate = sub(new Date(), { days: 1 });

const swipeLeft = () => {
  if (selectedDate.value.toDateString() === new Date().toDateString()) {
    return;
  }
  console.log('swipe left');
  selectedDate.value = add(selectedDate.value, { days: 1 });
  updateFood();
};

const swipeRight = () => {
  //don't allow swipe past 7 days
  if (selectedDate.value.toDateString() === sub(new Date(), { days: 7 }).toDateString()) {
    return;
  }
  console.log('swipe right');
  selectedDate.value = sub(selectedDate.value, { days: 1 });
  updateFood();
};

onMounted(async () => {
  const storedGoal = settingsStore.getGoal;
  goal.value = storedGoal;

  await store.fetchTodaysFoods();
  const allFood = toRaw(store.getFooods);
  console.log(allFood);

  tdFood = allFood.filter((item) => fromUnixTime(item.timestamp / 1000).toDateString() === selectedDate.value.toDateString());
  todaysFood.value = store.getFooods;

  let total = 0;
  for (let i = 0; i < tdFood.length; i++) {
    total += calculateCalories(tdFood[i].kcal, tdFood[i].portionSize);
  }
  current.value = total;

  percentage.value = Math.round((toRaw(current.value) / toRaw(goal.value) * 100));
  console.log(tdFood)

  if (tdFood) {
    const bf = tdFood.filter((item) => item.meal === 'breakfast');
    const lc = tdFood.filter((item) => item.meal === 'lunch');
    const dn = tdFood.filter((item) => item.meal === 'dinner');
    const sn = tdFood.filter((item) => item.meal === 'snack');

    console.log(bf)
    console.log(lc)

    breakfast.value = bf;
    lunch.value = lc;
    dinner.value = dn;
    snacks.value = sn;
  }
  if (selectedDate.value.toDateString === new Date().toDateString) {
    templateDate.value = 'Today'
    return;
  }
  else {
    templateDate.value = format(selectedDate.value, 'ccc, d MMM')
  }
  console.log(breakfast.value)
  console.log(lunch.value)
});

function updateFood() {
  const allFood = toRaw(store.getFooods);
  tdFood = allFood.filter((item) => fromUnixTime(item.timestamp / 1000).toDateString() === selectedDate.value.toDateString());
  todaysFood.value = store.getFooods;

  let total = 0;
  for (let i = 0; i < tdFood.length; i++) {
    total += calculateCalories(tdFood[i].kcal, tdFood[i].portionSize);
  }
  current.value = total;

  percentage.value = Math.round((toRaw(current.value) / toRaw(goal.value) * 100));
  console.log(tdFood)

  if (tdFood) {
    const bf = tdFood.filter((item) => item.meal === 'breakfast');
    const lc = tdFood.filter((item) => item.meal === 'lunch');
    const dn = tdFood.filter((item) => item.meal === 'dinner');
    const sn = tdFood.filter((item) => item.meal === 'snack');

    console.log(bf)
    console.log(lc)

    breakfast.value = bf;
    lunch.value = lc;
    dinner.value = dn;
    snacks.value = sn;
  }
  if (isSameDay(selectedDate.value, new Date())) {
    templateDate.value = 'Today'
    return;
  }
  if(isSameDay(selectedDate.value, yesterdaysDate)){
    templateDate.value = 'Yesterday'
    return;
  }
  else {
    templateDate.value = format(selectedDate.value, 'ccc, d MMM')
  }
  console.log(breakfast.value)
  console.log(lunch.value)
}

function calculateCalories(per100g, weight) {
  const unrounded = (Number(per100g) / 100) * Number(weight);
  return Math.round(unrounded);
}

const foodModal = ref(false);
const selectedFood = ref();

function showFoodModal(food) {
  console.log(food);
  selectedFood.value = food;
  foodModal.value = true;
}

function closeModal() {
  updateFood();
  foodModal.value = false;
}

function speakCurrentValue () {
  const msg = new SpeechSynthesisUtterance();
  console.log('speaking');
  msg.text = currentValue.value;
  speechSynthesis.speak(msg);
}

</script>

<template>
  <div ref="slideable" class="">
    <div class="row justify-end"><q-btn to="/settings" round color="secondary" class="q-mr-md q-mt-md"><img
          src="/images/settings.svg" /></q-btn>
    </div>
    <div class="row justify-center text-center text-black text-h6 q-mt-xl" style="">
      {{ templateDate }}
    </div>
    <div v-touch:swipe.right="swipeRight" v-touch:swipe.left="swipeLeft">
      <div class="justify-center text-center q-mt-md" style="" @click="speakCurrentValue">
        <vep :progress="percentage" :angle="0" color="#e94f37ff" emptyColor="#ffffff" :size="300" :thickness="3"
          emptyThickness="3%" :legend="currentValue" fontColor="black" :half="true" fontSize="3rem"> </vep>
      </div>
      <q-list class="log">
        <span class="text-caption text-bold q-ml-sm">Breakfast</span><br />
        <span v-if="breakfast && breakfast.length === 0" class="q-ml-sm text-grey">No entries yet</span>
        <q-item class="product-item" v-for="(p, i) in breakfast" :key="i">
          <q-item-section @click="showFoodModal(p)">
            <q-item-label><span class="text-subtitle1 q-mr-sm">{{ p.name }}</span><span class="text-caption">{{
              p.portionSize }} g</span></q-item-label>
            <q-item-label caption>{{ calculateCalories(p.kcal, p.portionSize) }} kcal</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list class="log">
        <span class="text-caption text-bold q-ml-sm">Lunch</span><br />
        <span v-if="lunch && lunch.length === 0" class="q-ml-sm text-grey">No entries yet</span>
        <q-item class="product-item" v-for="(l, i) in lunch" :key="i">
          <q-item-section @click="showFoodModal(l)">
            <q-item-label><span class="text-subtitle1 q-mr-sm">{{ l.name }}</span><span class="text-caption">{{
              l.portionSize }} g</span></q-item-label>
            <q-item-label caption>{{ calculateCalories(l.kcal, l.portionSize) }} kcal</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list class="log">
        <span class="text-caption text-bold q-ml-sm">Dinner</span><br />
        <span v-if="dinner && dinner.length === 0" class="q-ml-sm text-grey">No entries yet</span>
        <q-item class="product-item" v-for="(d, i) in dinner" :key="i">
          <q-item-section @click="showFoodModal(d)">
            <q-item-label><span class="text-subtitle1 q-mr-sm">{{ d.name }}</span><span class="text-caption">{{
              d.portion
            }} g</span></q-item-label>
            <q-item-label caption> {{ calculateCalories(d.calories, d.portion) }} kcal</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list class="log">
        <span class="text-caption text-bold q-ml-sm">Snacks</span><br />
        <span v-if="snacks && snacks.length === 0" class="q-ml-sm text-grey">No entries yet</span>
        <q-item class="product-item" v-for="(s, i) in snacks" :key="i">
          <q-item-section @click="showFoodModal(s)">
            <q-item-label><span class="text-subtitle1 q-mr-sm">{{ s.name }}</span><span class="text-caption">{{
              s.portionSize }} g</span></q-item-label>
            <q-item-label caption>{{ calculateCalories(s.kcal, s.portionSize) }} kcal</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <FoodModal :food="selectedFood" v-model="foodModal" @closeDialog="closeModal"/>
    <q-page-sticky position="bottom" class="q-mb-lg">
      <q-btn to="/add" round color="secondary"><img src="/images/plus.svg" /></q-btn>
    </q-page-sticky>
  </div>
</template>
<style scoped>
.product-item {
  border: 1px solid #4c5c68ff;
  border-radius: 10px;
  width: 95%;
  margin: 5px auto 5px;
}
</style>