<template>
  <q-page-container>
    <q-page class="q-pa-md">
      <div>
        <h6 class="q-mb-xs q-ml-lg">Add a Custom Food Item</h6>
        <q-form @submit.prevent="addFood">
          <div>
            <q-input class="form-item" type="text" id="name" label="Name" hint="Name of the product" v-model="name" />
          </div>
          <div>
            <q-input class="form-item" type="number" id="portionSize" label="Portion size (grams)"
              hint="The portion size in grams" v-model="portionSize" />
          </div>
          <div>
            <q-input class="form-item" type="number" id="fat" label="Fat (grams)" hint="Amount of fat per 100g in grams"
              v-model="fat" />
          </div>
          <div>
            <q-input class="form-item" type="number" id="protein" label="Protein (grams)"
              hint="Amount of protein per 100g in grams" v-model="protein" />
          </div>
          <div>
            <q-input class="form-item" type="number" id="carbs" label="Carbohydrates (grams)"
              hint="Amount of carbohydrates per 100g in grams" v-model="carbs" />
          </div>
          <div>
            <q-input class="form-item" type="number" id="kcal" label="Kcal per 100g"
              hint="Amount of Kilocalories per 100g" v-model="kcal" />
          </div>
          <div>
            <q-select class="form-item" id="meal" label="Meal" :options="['Breakfast', 'Lunch', 'Dinner', 'Snack']"
              v-model="meal">
            </q-select>
          </div>
          <q-btn class="q-mb-xl q-mr-xl" @click="addItem()" type="submit">Add Food</q-btn>
        </q-form>
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { ref, toRaw } from 'vue';
import { addFood } from '@/indexedDB';
import router from '../router';

const name = ref('');
const portionSize = ref(0);
const fat = ref(0);
const protein = ref(0);
const carbs = ref(0);
const kcal = ref(0);
const meal = ref('breakfast');

const addItem = async () => {
  const food = {
    name: name.value,
    portionSize: portionSize.value,
    fat: fat.value,
    protein: protein.value,
    carbs: carbs.value,
    kcal: kcal.value,
    meal: meal.value
  };
  console.log(food);
  await addFood(food);
  // Clear form fields
  name.value = '';
  portionSize.value = 0;
  fat.value = 0;
  protein.value = 0;
  carbs.value = 0;
  kcal.value = 0;
  meal.value = 'breakfast';
  router.push('/');
};

</script>
<style scoped>
.form-item {
  margin-bottom: 1rem;
  width: 80%;
  margin-left: 1.5em;
}
</style>