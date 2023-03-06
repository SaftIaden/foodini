import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';

import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import quasarIconSet from 'quasar/icon-set/material-icons';
import VueEllipseProgress from 'vue-ellipse-progress';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from './router';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Quasar, {
  plugins: {},
  iconSet: quasarIconSet,
});
app.use(VueEllipseProgress, "vep");
app.mount('#app');
