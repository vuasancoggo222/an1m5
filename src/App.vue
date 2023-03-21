<script setup lang="ts">
import Header from "./components/layout/Header.vue";


</script>

<template>
  <v-container class="wrapper">
    <Header />
    <RouterView/>
  </v-container>
</template>

<style scoped>
.wrapper {
  max-width: 1440px;
}

</style>
