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
      meta: { requiresAuth: false },
    },
    {
      path: "/watch/:title",
      name: "Anime Info",
      component: () => import("@/pages/AnimeInfo.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { requiresAuth: false },
    },
    {
      path: "/most-popular-anime",
      name: "Most Popular",
      component: () => import("@/pages/MostPopular.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/manga",
      name: "Manga",
      component: () => import("@/pages/Manga.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      meta: { requiresAuth: false },
    },
    {
      path: "/schedule",
      name: "Schedule",
      component: () => import("@/pages/Schedule.vue"),
      meta: { requiresAuth: false },
    },
    {
      path : '/sign-in',
      name : "SignIn",
      component : () => import("@/pages/Signin.vue"),
      meta: { requiresAuth: false },
    },
    {
      path : '/sign-up',
      name : "SignUp",
      component : () => import("@/pages/Signup.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: '/mangaDetails/:id',
      name: "Manga Details",
      component: () => import("@/pages/MangaDetails.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: '/account-information',
      name: "Account Information",
      component: () => import("@/pages/AccountInformation.vue"),
      meta: { requiresAuth: true },
    }
    // {
    //   path : '/bad-request-500',
    //   name : "Bad Request",
    //   component : () => import("@/pages/BadRequest.vue")
    // }
  ],
});

const authList = ["SignIn", "SignUp"];
router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') as string) : null;
  if(auth && auth.user.hasOwnProperty("uid") && authList.includes(to.name as string)) {
    next({ name: 'Home' })
  }
  else if(!auth && to.name !== 'SignIn' && to.meta.requiresAuth){
    next({ name: 'SignIn' })
  }
  else next()
})
export default router;
