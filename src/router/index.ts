import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
const router = createRouter({
    scrollBehavior() {
        return { top: 0 };
      },
    history: createWebHistory(),
    routes : [
      {
        path : '/',
        name : 'Home',
        component : Home
      },
      {
        path : '/most-popular',
        name : "Most Popular",
        component : () =>  import('@/pages/MostPopular.vue')
      }
    ]
})


export default router;