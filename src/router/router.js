import { createRouter, createWebHistory } from 'vue-router';
import Navi from '../components/Navi.vue';
import ptcg from '../components/ptcg.vue';

const routes = [
    {
        path: '/',
        component:Navi
    },
    {
        path: '/ptcg',
        component: ptcg
    },

  // 其他路由规则
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;