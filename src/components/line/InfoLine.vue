<script setup lang="ts">
defineProps({
    title: {
        type : String 
    },
    data : {

    }
})

</script>

<template>
  <div class="info-line">
                  <span>{{title}}</span> : <span>{{ data }}</span>
                  <slot></slot>
 </div>

</template>

<style>
.info-line {
  margin-top: 10px;
  line-height: 16px;
  color: black;
  font-weight: 600;
  font-style: normal;
}

.info-title {
  color: #5b5ea6;
}
</style>