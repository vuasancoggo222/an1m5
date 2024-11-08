import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css"; //
import { createPinia } from "pinia";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "./router";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/constants/local-config";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import mitt from 'mitt';
import { VueMasonryPlugin } from "vue-masonry";
const emitter = mitt()

export const firebaseApp = initializeApp(firebaseConfig);
const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
});
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)
.use(vuetify)
.use(router)
.use(pinia)
.use(VueMasonryPlugin)

app.config.globalProperties.$emitter = emitter;
app.mount('#app')
