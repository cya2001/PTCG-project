import { createRouter, createWebHistory } from 'vue-router';
import Navi from '../components/Navi.vue';
import ptcg from '../components/ptcg.vue';
import canlendar from '../components/calendar.vue';

const routes = [
    {
        path: '/',
        component:Navi
    },
    {
        path: '/ptcg',
        component: ptcg
    },
    {
        path: '/calendar',
        component:canlendar
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;