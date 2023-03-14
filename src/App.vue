
<script setup>
import { ref, onMounted } from 'vue';


const update = ref(false);
const isOnline = ref(true);

const onlineTest = async () => {
  try {
    await fetch(window.location.origin, { method: 'HEAD' });
    return true;
  } catch (error) {
    return false;
  }
};
const onRestart = async () => {
  isOnline.value = await onlineTest();
  window.addEventListener('online', () => (isOnline.value = true));
  window.addEventListener('offline', () => (isOnline.value = false));
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
  window.location.reload();
};
onMounted(async () => {
  isOnline.value = await onlineTest();
  window.addEventListener('online', () => (isOnline.value = true));
  window.addEventListener('offline', () => (isOnline.value = false));
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    console.log('registration failed!');
    return;
  }
  registration.addEventListener('updatefound', () => (update.value = true));
  if (registration.waiting) update.value = true;
});
</script>

<template>
  <q-layout view="hHh lpR fFf" class="bg-primary">
    <q-page-container>
      <div class="column justify-center items-center" v-if="update">
        <p style="font-family: Poppins">New update is available!!!</p>
        <q-btn style="font-family: Poppins" color="red text-primary" label="Restart Now!" @click="onRestart" />
      </div>
      <div style="font-family: Poppins" class="column justify-center items-center q-mt-md" v-if="!isOnline">
        <p style="font-family: Poppins">You are offline!!!</p>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style></style>

