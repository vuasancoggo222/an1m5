<script setup lang="ts">
import convertToSlug from "@/helper/convertToSlug";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const nowPath = computed(() => route.query.type);
defineProps({
    tagData : {
        type : Array
    },
    custom : {
      type : String
    }
})


</script>

<template>
  <v-chip-group class="mx-2 my-4">
    <v-chip
      :style="custom"
      :class="[nowPath == convertToSlug(tag) ? 'choose-genres' : '']"
      @click="$emit('onRedirect',tag)"
      label
      v-for="tag in tagData as any"
      :key="tag"
      >{{ tag }}</v-chip
    >
  </v-chip-group>

</template>
<style lang="css">
.choose-genres {
  background-color: #34568b;
  color: #ffff;
}
</style>