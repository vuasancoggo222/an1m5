<script setup lang="ts">
import convertToSlug from "@/helper/convertToSlug";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter()
const nowPath = computed(() => route.query.type);
defineProps({
    tagData : {
        type : Array
    }
})

</script>

<template>
  <v-chip-group class="mx-2 my-4">
    <v-chip
      :class="[nowPath == convertToSlug(tag) ? 'choose-genere' : '']"
      @click="$emit('onRedirect',tag)"
      label
      v-for="tag in tagData as any"
      :key="tag"
      >{{ tag }}</v-chip
    >
  </v-chip-group>

</template>
<style>
.choose-genere {
  background-color: #34568b;
  color: #ffff;
}
</style>