<script setup lang="ts">
import { defineAsyncComponent, watch } from "vue";
import Footer from "./components/layout/Footer.vue";
import { useRoute } from "vue-router";
import { useTitle } from "@vueuse/core";
const route = useRoute();
const Header = defineAsyncComponent(
  () => import("@/components/layout/Header.vue")
);
const title: any = useTitle();
watch(
  () => route.name,
  () => {
    title.value = route.name;
  }
);
</script>

<template>
  <div class="wrapper">
    <v-container class="container">
      <header />
      <router-view />
    </v-container>
    <footer v-if="route.name !== 'Home'" />
  </div>
</template>

<style scoped>
.container {
  font-family: Arial, Helvetica, sans-serif;
  min-height: 100vh;
  position: relative;
  max-width: 1440px;
}
</style>
