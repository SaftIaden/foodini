<script setup>
import { StreamBarcodeReader } from 'vue-barcode-reader';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// import QrcodeScanner from  '../components/QRScanner.vue';

// const onScanResult = (decodedText, decodedResult) => {
//   console.log('Scan result:', decodedText, decodedResult);
// };

const runScanner = ref(false);

const router = useRouter();

const props = defineProps({
	barcode: {
		type: String,
		required: true,
	},
});

const onDecode = async (result) => {
	runScanner.value = false;
	console.log(result);
	window.navigator.vibrate(1000);

	router.push(`add/${result}`);
};
const onLoaded = () => {
	console.log('loaded');
};
</script>
<template>
	<q-page-sticky position="top-left" class="q-mt-lg q-ml-lg">
		<q-btn to="/" round color="secondary"><img style="margin-left: -4px;" src="/images/chevron-left.svg" /></q-btn>
	</q-page-sticky>
	<q-btn class="btn" @click="runScanner = !runScanner">SCAN</q-btn>
	<div>
		<div class="box"></div>
		<div class="barcode-reader-wrapper">
			<StreamBarcodeReader v-if="runScanner" @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
		</div>
		<!-- <QrcodeScanner v-if="runScanner" :qrbox="250" :fps="10" @result="onScanResult"></QrcodeScanner> -->
	</div>
</template>
<style scoped>
.btn {
	position: absolute;
	bottom: calc(33.33% - 30px);
	/* Position button at bottom third of screen, with some padding */
	left: 50%;
	/* Position button in the horizontal center of the container */
	transform: translateX(-50%);
	/* Move button back to the left by half its own width */
	width: 90px;
	/* Set button width */
	height: 50px;
	/* Set button height */
}

.barcode-reader-wrapper {
	display: flex;
	justify-content: center;
}

.box {
	height: 200px;
}
</style>
