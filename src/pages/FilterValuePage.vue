<script setup lang="ts">
import CustomCard from "@/components/card/CustomCard.vue";
import FilmCard from "@/components/card/FilmCard.vue";
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import { searchAnimeByGenresFunction, searchFunction } from "@/api/search";
import useDebounce from "@/uses/useDebounce";
import ProgressCircle from "@/components/progess/ProgressCircle.vue";
const action = ref<any>();
const { debounce } = useDebounce();
const animePerpage = ref<number>(20);
const title = computed(() =>
  action.value == "generes"
    ? `Movie ${route?.query?.type} generes`
    : `Search results for keyword '${route.query.keyword}'`
);
const route = useRoute();
const isLoading = ref(false);
const animeData = ref<any>([]);
const hasNextPage = ref<boolean>(false);
const getFilterAnime = async () => {
  isLoading.value = true;

  try {
    if (action.value == "generes") {
      if (route.query.mediaType == "anime") {
        const { data } = await searchAnimeByGenresFunction(
          route.query.type,
          animePerpage.value
        );
        animeData.value = data.results;
        hasNextPage.value = data.hasNextPage;
        isLoading.value = false;
      }
    } else if (action.value == "search") {
      const { data } = await searchFunction(route.query.keyword as any);
      animeData.value = data.results;
      hasNextPage.value = data.hasNextPage;
      isLoading.value = false;
    }
  } catch (error) {
    console.log(error);
    isLoading.value = false;
  }
};
const updatePerpage = () => {
  animePerpage.value += 10;
};
getFilterAnime();
watch(
  () => route.params.action,
  (value) => {
    action.value = value;
  },
  { immediate: true }
);
watch(
  () => route.query.type,
  () => {
    animeData.value = [];
    hasNextPage.value = false;
    getFilterAnime();
  },
  { immediate: true }
);
watch(animePerpage, () => {
  getFilterAnime();
});
watch(
  () => route.query.keyword,
  () => {
    animeData.value = [];
    hasNextPage.value = false;
    getFilterAnime();
  },
  { immediate: true }
);
</script>

<template>
  <custom-card
    @selectValue=""
    :title="title"
    :icon="action == 'generes' ? 'mdi-tag' : 'mdi-search-web'"
  >
    <div v-if="animeData.length" class="trending-anime-grid">
      <film-card
        v-for="item in animeData"
        :width="242"
        :item="item"
        :key="item.id"
        :height="200"
      />
    </div>
    <div v-else-if="!animeData.length && !isLoading" class="empty-anime">
      No {{ route.query.type }} data found.
    </div>
    <div v-else-if="!animeData.length && isLoading" class="empty-anime">
      <progress-circle :size="47" :indeterminate="true"></progress-circle>
    </div>
    <div class="see-more">
      <v-btn
        v-if="hasNextPage"
        @click="debounce(updatePerpage, 200)"
        variant="flat"
        color="error"
        >See more</v-btn
      >
    </div>
  </custom-card>
</template>

<style>
.see-more {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}
.empty-anime {
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
