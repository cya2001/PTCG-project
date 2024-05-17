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
const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')
