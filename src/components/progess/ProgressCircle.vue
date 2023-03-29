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
  <div class="progess-circular">
    <v-progress-circular
      :size="size"
      :indeterminate="indeterminate"
      :color="color"
  ></v-progress-circular>
  </div>

</template>
<style>
.progess-circular{
    display: flex;
    justify-content: center;
}
</style>