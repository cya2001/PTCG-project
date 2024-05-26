import { createRouter, createWebHistory } from 'vue-router';
import ptcg from '../App.vue';
import test from '../components/compbase/test/test.vue'



const routes = [

    {
        path: '/',
        component: ptcg
    },
    {
        path: '/test',
        component:test
    },
   
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(){
    return{
        top:0
    }
  }
});

export default router;