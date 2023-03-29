<script setup lang="ts">
import { defineAsyncComponent, watch } from "vue";
import An1m5Footer from "./components/layout/An1m5Footer.vue";
import { useRoute } from "vue-router";
import { useTitle } from "@vueuse/core";

const route = useRoute();
const An1m5Header = defineAsyncComponent(
  () => import("@/components/layout/An1m5Header.vue")
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
      <An1m5Header />
      <router-view />
    </v-container>
    <An1m5Footer v-if="route.name !== 'Home'" />
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
