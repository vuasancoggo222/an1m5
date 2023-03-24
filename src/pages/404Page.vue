<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
</script>

<template>
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto not-found-page" 
    elevation="4"
    height="400"
    rounded
    max-width="800"
    width="100%"
  >
    <div>
      <h2 class="text-h4 font-weight-black text-orange mb-2">Opps !</h2>

      <div class="text-h5 font-weight-medium mb-2">
       404 Not found !!
      </div>

      <p class="text-body-2 mb-4">
        This page is not available in the website,please check your url address.
      </p>

      <v-btn @click="router.push('/')" variant="outlined" color="orange">Go to Homepage</v-btn>
    </div>
  </v-sheet>

</template>
<style>
.not-found-page {
    margin: 32px 0;
    width: 100%;
    height: 500px;
}
</style>