<script setup lang="ts">

</script>

<template>
  <div>
    <v-btn @click="$emit('onSignin')" color="success">
      Sign In with <v-icon icon="mdi-google" color="error"></v-icon>
    </v-btn>
  </div>
</template>