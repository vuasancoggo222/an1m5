<script setup lang="ts">

defineProps(['customClass','title','description'])

</script>

<template>
  <v-card class="auth-card" :class="customClass">
     <h3 class="auth-card-title">{{ title }}</h3>
     <p class="auth-card-description">{{ description }}</p>
     <div class="input-wrapper">
        <slot/>
     </div>
   
  </v-card>

</template>
<style>
.auth-card {
    font-family: monospace;
}
.auth-card-title{
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 20px;
}
.auth-card-description{
    font-size: 18px;
}
.input-wrapper {
    margin-top: 40px;
}
</style>