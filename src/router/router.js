import { createRouter, createWebHistory } from 'vue-router';
import Navi from '../components/Navi.vue';
import ptcg from '../components/ptcg.vue';
import canlendar from '../components/calendar.vue';
import todolist from '../components/todolist/App.vue';
import cardcart from '../components/cardcart/App.vue';
import App from '@/App.vue';

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
    {
        path: '/todolist',
        component:todolist
    },
    {
        path: '/cardcart',
        component:cardcart
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;