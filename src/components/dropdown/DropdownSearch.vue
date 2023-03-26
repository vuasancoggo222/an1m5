<script setup lang="ts">
import { useRouter } from "vue-router";
import convertToSlug from "@/helper/convertToSlug";

defineProps({
  open: {
    type: Boolean,
  },
  dropdownItems: {
    type: Object,
  },
  width: {
    type: Number,
  },
  keyword:{
    type : String
  }
});
const emit = defineEmits (['closeDropdown'])
const router = useRouter();
const redirectToInfoPage = (title: string, id: number) => {
  router.push(`/info/${convertToSlug(title)}?id=${id}`);
  emit('closeDropdown')
};
const redirectToSearchPage = (keyword : string) => {
  router.push(`/filter/search?keyword=${keyword}`)
  emit('closeDropdown')
}
</script>

<template>

  <div v-if="open" style="position: absolute; top: 50px; z-index: 9999">
    <v-card
      style="position: relative"
      v-if="dropdownItems?.response?.totalResults !== 0"
      :width="width"
      height="410"
      :text="`We found ${
        dropdownItems?.response?.totalResults ?? 0
      }  anime in this keyword.`"
    >
      <v-btn
        @click="$emit('closeDropdown',true)"
        icon="mdi-close"
        size="x-small"
        color="error"
        variant="text"
        style="position: absolute; right: 5px; top: 10px; z-index: 2"
      ></v-btn>
      <v-list lines="one">
        <v-list-item
          @click="redirectToInfoPage(item.title.romaji || item.title.userPreferred, item.id)"
          class="search-items"
          v-for="item in dropdownItems?.response?.results"
          :key="item.id"
          :title="item.title.romaji"
          :prepend-avatar="item.image"
        ></v-list-item>
      </v-list>
      <v-card-actions style="position: absolute; bottom: 5px; right: 0px">
        <v-btn variant="flat" color="error" @click="redirectToSearchPage(keyword)">See more</v-btn>
      </v-card-actions>
    </v-card>
    <v-card
      v-else
      class="empty-card"
      :width="width"
      height="400"
      text="No data found."
    >
    </v-card>
  </div>
</template>

<style>
.search-items :hover {
  cursor: pointer;
  text-decoration: underline;
}
.search-items .v-list-item-title {
  font-size: 12px !important;
  font-weight: bold !important;
}
</style>
