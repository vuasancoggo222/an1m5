<script setup lang="ts">
import FilmCard from "../card/FilmCard.vue";
defineProps({
  data: {
    type: Array,
  },
  cardTitle: {
    type: String,
  },
  cardTitleIcon: {
    type: String,
  },
});
</script>

<template>
  <v-sheet class="mx-auto mt-12" style="border-radius: 12px;" elevation="6" max-width="100%">
    <v-chip style="margin: 16px" color="blue" label text-color="white">
      <v-icon start :icon="cardTitleIcon"></v-icon>
      {{ cardTitle }}
    </v-chip>
    <v-slide-group v-if="data?.length" class="pa-2" center-active>
      <v-slide-group-item
        v-for="item in data as any"
        :key="item.id"
        v-slot="{ isSelected }"
      >
        <film-card
          :height="251"
          :width="162.9"
          :isSelected="isSelected"
          :item="item"
        ></film-card>
      </v-slide-group-item>
    </v-slide-group>
    <div v-else style="min-height: 223px"></div>
  </v-sheet>
</template>

<style></style>
