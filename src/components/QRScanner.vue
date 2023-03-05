<template>
  <div id="qr-code-full-region"></div>
</template>

<script setup>
import { defineProps, onMounted, emit } from 'vue';

const props = defineProps({
  qrbox: {
    type: Number,
    default: 250
  },
  fps: {
    type: Number,
    default: 10
  },
});

onMounted(() => {
  const config = {
    fps: props.fps,
    qrbox: props.qrbox,
  };
  const html5QrcodeScanner = new Html5QrcodeScanner('qr-code-full-region', config);
  html5QrcodeScanner.render(onScanSuccess);
});

const onScanSuccess = (decodedText, decodedResult) => {
  emit('result', decodedText, decodedResult);
};
</script>
