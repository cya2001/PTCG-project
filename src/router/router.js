import { createRouter, createWebHistory } from 'vue-router';
import Navi from '../components/Navi.vue';
import ptcg from '../components/ptcg.vue';
import canlendar from '../components/calendar.vue';
import todolist from '../components/todolist/App.vue';
import cardcart from '../components/cardcart/App.vue';
import shop from '../components/shop/App.vue';
import Login from '../components/shop/src/Login/index.vue';
import Home from '../components/shop/src/Home/index.vue';
import Category from '../components/shop/src/Category/index.vue';
import Layout from '../components/shop/src/Layout/index.vue';


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
    {
        path: '/shop',
        component:shop,
        children:[
            {
                path:'',
                component:Layout,
                children:[
                    {
                        path:'',
                        component:Home
                    },
                    {
                        path:'category',
                        component:Category
                    }
                ]
            },
            {
                path:'login',
                component:Login
            }
        ]
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;