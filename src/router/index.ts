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
      path: "/most-popular-anime",
      name: "Most Popular",
      component: () => import("@/pages/MostPopular.vue"),
    },
    {
      path: "/manga",
      name: "Manga",
      component: () => import("@/pages/Manga.vue"),
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
      name : "SignIn",
      component : () => import("@/pages/Signin.vue")
    },
    {
      path : '/sign-up',
      name : "SignUp",
      component : () => import("@/pages/Signup.vue")
    },
    // {
    //   path : '/bad-request-500',
    //   name : "Bad Request",
    //   component : () => import("@/pages/BadRequest.vue")
    // }
  ],
});

export default router;
