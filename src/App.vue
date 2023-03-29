<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const Header = defineAsyncComponent(() => import('@/components/layout/Header.vue'))

</script>

<template>
    <v-container class="wrapper">
      <Header />
      <RouterView />
    </v-container>

</template>

<style scoped>
.wrapper {
  font-family:Arial, Helvetica, sans-serif;
  min-height: 100vh;
  position: relative;
  max-width: 1440px;
}
</style>
