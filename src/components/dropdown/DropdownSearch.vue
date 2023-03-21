<script setup lang="ts">
import { useRouter } from "vue-router";
import slugify from "slugify";

defineProps({
  open : {
    type : Boolean
  },
  dropdownItems: {
    type: Object,
  },
  width: {
    type: Number,
  },
});

const router = useRouter();



</script>

<template>
  <div v-if="open" style="position: absolute; top: 50px;z-index: 9999;">
    <v-card
      style="position: relative"
      v-if="dropdownItems?.response.totalResults !== 0"
      :width="width"
      height="410"
      :text="`We found ${dropdownItems?.response.totalResults} anime in this keyword.`"
    >
      <v-btn
        @click="$emit('closeDropdown')"
        icon="mdi-close"
        size="x-small"
        color="error"
        variant="text"
        style="position: absolute; right: 5px;top:10px;z-index: 2;"
      ></v-btn>
      <v-list lines="one">
        <v-list-item
          @click="
            router.push(
              `/watch/${item.id}/${slugify(item.title.userPreferred)}`
            )
          "
          class="search-items"
          v-for="item in dropdownItems?.response.results"
          :key="item.id"
          :title="item.title.userPreferred"
          :prepend-avatar="item.image"
        ></v-list-item>
      </v-list>
      <v-card-actions style="position: absolute; bottom: 5px; right: 0px">
        <v-btn variant="flat" color="error">See more</v-btn>
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
