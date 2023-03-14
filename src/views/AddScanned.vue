<template>
  <q-page-container>
    <q-page class="q-pa-md">
      <q-page-sticky position="top-left" class="q-mt-lg q-ml-lg">
        <q-btn to="/" round color="secondary"><img style="margin-left: -4px;" src="/images/chevron-left.svg" /></q-btn>
      </q-page-sticky>
      <div class="text-h5 text-center text-bold q-mt-md">{{ food?.product_name }}</div>
      <div class="text-center q-mt-sm"><q-img width="70%" class="rounded-borders" :src="food?.image_url" /></div>
      <div class="text-h6 text-center text-bold q-mt-md">Nutrition Facts</div>
      <div class="info">
        <div class=""><span class="text-bold">Serving Size: </span>{{ food?.serving_size }}</div>
        <div class=""><span class="text-bold">Calories: </span>{{ food?.nutriments?.['energy-kcal_100g'] }}kcal</div>
        <div class=""><span class="text-bold">Fat: </span>{{ food?.nutriments?.fat }}g</div>
        <div class=""><span class="text-bold">Carbs: </span>{{ food?.nutriments?.carbohydrates }}g</div>
        <div class=""><span class="text-bold">Protein: </span>{{ food?.nutriments?.proteins }}g</div>
      </div>
      <div class="text-center q-mt-lg"><q-btn class="" @click="showModal = true" rounded color="secondary">Add to
          Log</q-btn></div>
      <q-dialog v-model="showModal">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6 text-center text-bold q-mt-md q-mb-lg">Add to Log</div>
            <div class="info">
              <div class=""><span class="text-bold">Serving Size: </span>{{ food?.serving_size }}</div>
              <q-input label="Portion (grams)" type="number" v-model="portion"></q-input>
              <q-select id="meal" label="Meal" :options="['breakfast', 'lunch', 'dinner', 'snack']" v-model="meal">
              </q-select>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="secondary" v-close-popup />
            <q-btn label="Add" color="secondary" v-close-popup @click="addItem" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </q-page-container>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '../router';
import { useProductStore } from '../stores/productStore';
import { addFood } from '@/indexedDB';

const store = useProductStore();

const food = ref();
const showModal = ref(false);
//addFood
const portion = ref();
const meal = ref();

const addItem = async () => {
  const item = {
    name: food.value.product_name,
    portionSize: Number(portion.value),
    fat: food.value.nutriments.fat_100g,
    protein: food.value.nutriments.proteins_100g,
    carbs: food.value.nutriments.carbohydrates_100g,
    kcal: food.value.nutriments['energy-kcal_100g'],
    meal: meal.value,
    timestamp: Date.now(),
  };
  console.log(item);
  try {
    await addFood(item);
    // Clear form fields
    portion.value = 0;
    meal.value = 'breakfast';
  }
  catch (err) {
    router.push('/');
    console.log(err);
  }
};

let foodData;

const props = defineProps({
  barcode: {
    type: String,
    required: true,
  },
});

const query = 'https://world.openfoodfacts.org/api/v0/product/'
onMounted(async () => {
  console.log(props.barcode);
  await findFood(props.barcode)
})

async function findFood(barcode) {
  const response = await axios.get(query + barcode + '.json');
  console.log(response);
  food.value = response.data.product;
  foodData = response.data.product;
  return response.data;
}

</script>
<style>
.info {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
}
</style>