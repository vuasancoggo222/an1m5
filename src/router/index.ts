import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import NotFound from "@/pages/404Page.vue";

const router = createRouter({
  scrollBehavior(){
    const scrollTop = localStorage.getItem('scrollTop')
    return {top: Number(scrollTop) ||  0}
  },
  history: createWebHistory(),
  routes: [
    {
      path: "/filter/:action",
      name: "FilterPage",
      component: () => import("@/pages/FilterValuePage.vue"), 
    },
    {
      path: "/watch/:title",
      name: "Anime Info",
      component: () => import("@/pages/AnimeInfo.vue"),
    },
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/most-popular",
      name: "Most Popular",
      component: () => import("@/pages/MostPopular.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
    {
      path: "/schedule",
      name: "Schedule",
      component: () => import("@/pages/Schedule.vue"),
    },
    {
      path : '/sign-in',
      name : "Signin",
      component : () => import("@/pages/Signin.vue")
    },
    {
      path : '/sign-up',
      name : "Signup",
      component : () => import("@/pages/Signup.vue")
    }
  ],
});

export default router;
