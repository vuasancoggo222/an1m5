import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import NotFound from "@/pages/404Page.vue";
const router = createRouter({
  scrollBehavior() {
    return { top: window.pageYOffset ?? 0, behavior: "smooth" };
  },
  history: createWebHistory(),
  routes: [
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
      path: "/watch/:title",
      name: "Anime Info",
      component: () => import("@/pages/AnimeInfo.vue"),
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
      path: "/filter/:action",
      name: "FilterPage",
      component: () => import("@/pages/FilterValuePage.vue"),
    },
  ],
});

export default router;
