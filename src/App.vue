<script setup lang="ts">

import Header from "./components/layout/Header.vue";
</script>

<template>
  <v-app>
    <v-container class="wrapper">
      <Header />
      <RouterView />
      <Footer />
    </v-container>
  </v-app>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  position: relative;
  max-width: 1440px;
}
</style>
