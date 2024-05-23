import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {lazyPlugin} from "@/directives";
import {componentPlugin} from '@/components/compbase';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'



const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(ElementPlus)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')
