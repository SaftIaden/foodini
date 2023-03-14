<template >
  <q-dialog>
    <q-card style="width: 70%">
      <q-card-section>
        <q-popup-edit v-model="props.food.name" title="Edit the Name" auto-save v-slot="scope">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
        </q-popup-edit>
        <div class="text-h6">{{ props.food?.name }}</div>
      </q-card-section>
      <q-card-section>
        <table>
          <tr>
            <td>
              Portion Size:
            </td>
            <td>
              <q-popup-edit v-model="props.food.portionSize" title="Edit the Portion Size" auto-save v-slot="scope">
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
              <div class="text-subtitle2">
                {{ props.food?.portionSize }}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              Calories/100g:
            </td>
            <td>
              <q-popup-edit v-model="props.food.kcal" title="Edit the Calories" auto-save v-slot="scope">
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
              <div class="text-subtitle2">{{ props.food?.kcal }}</div>
            </td>
          </tr>
          <tr>
            <td>
              Protein:
            </td>
            <td>
              <q-popup-edit v-model="props.food.protein" title="Edit the Protein" auto-save v-slot="scope">
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
              <div class="text-subtitle2">{{ props.food?.protein }}</div>
            </td>
          </tr>
          <tr>
            <td>
              Carbs:
            </td>
            <td>
              <q-popup-edit v-model="props.food.carbs" title="Edit the Carbs" auto-save v-slot="scope">
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
              <div class="text-subtitle2">{{ props.food?.carbs }}</div>
            </td>
          </tr>
          <tr>
            <td>
              Fat:
            </td>
            <td>
              <q-popup-edit v-model="props.food.fat" title="Edit the Fat" auto-save v-slot="scope">
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
              <div class="text-subtitle2">
                {{ props.food?.fat }}
              </div>
            </td>
          </tr>
        </table>
      </q-card-section>
      <q-card-section>
        <q-btn @click="updateFoodFn(props.food)" color="secondary" label="Update" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, toRaw } from 'vue';
import { updateFood } from '@/indexedDB';
import router from '../router';
const props = defineProps({
  food: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['closeDialog'])

const updateFoodFn = async (food) => {
  emits("closeDialog")
  console.log(toRaw(food));
  await updateFood(toRaw(food).timestamp, toRaw(food));
  router.push('/');
};


</script>