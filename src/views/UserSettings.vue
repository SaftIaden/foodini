<template>
  <q-page-container>
    <q-page class="q-pa-md">
      <q-page-sticky position="top-left" class="q-mt-md q-ml-md">
        <q-btn to="/" round color="secondary"><img style="margin-left: -4px;" src="/images/chevron-left.svg" /></q-btn>
        <div class="q-ml-lg">
          <div class="text-h5 text-bold q-mt-md q-mb-md">Settings</div>
          <q-form>
            <input label="kcal" hint="Your daily calorie goal" v-model="goal"/>
          </q-form>
          <q-btn color="secondary" class="q-mt-md q-mb-md" @click="setGoal()" type="submit">Save</q-btn>
        </div>
        <div>
        </div>
      </q-page-sticky>
    </q-page>
  </q-page-container>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useSettingsStore } from '../stores/settingsStore';

const store = useSettingsStore();

const goal = ref();

function setGoal() {
  store.updateGoal(goal.value);
}

onMounted(async () => {
  const storedGoal = store.getGoal;
  goal.value = storedGoal;
});

</script>