import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "@mdi/font/css/materialdesignicons.css"; //
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'
const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
})
createApp(App)

.use(vuetify)
.use(router)
.use(pinia)
.mount('#app')
