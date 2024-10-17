<script setup lang="ts">
defineProps({
    color : {
        type : String,
        default : 'secondary'
    },
    indeterminate : {
        type : Boolean
    },
    size : {
        type : Number
    }
})

</script>

<template>
  <div class="progress-circular">
    <v-progress-circular
      :size="size"
      :indeterminate="indeterminate"
      :color="color"
  ></v-progress-circular>
  </div>

</template>
<style>
progress-circular{
    display: flex;
    justify-content: center;
}
</style>