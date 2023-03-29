<script setup lang="ts">
defineProps({
    color : {
        type : String,
        default : 'secondary'
    },
    indeterminate : {
        type : Boolean
    }
    
})

</script>

<template>
  <v-progress-circular
      :indeterminate="indeterminate"
      :color="color"
  ></v-progress-circular>

</template>