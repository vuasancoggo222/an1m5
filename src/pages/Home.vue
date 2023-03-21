<script setup lang="ts">
import CardSlideGroup from "@/components/slide/CardSlideGroup.vue";
import { onMounted, ref } from "vue";
import { getRecentAnimeFunction } from "@/api/recent-anime";
import { useTrendingSelectStore } from "@/store/trendingSelectStore";
import CustomCard from "@/components/card/CustomCard.vue";
import { getTrendingAnimeFunction } from "@/api/trending-anime";
import FilmCard from "@/components/card/FilmCard.vue";
const recentAnimeData = ref<any>([]);
const trendingAnime = ref<any>([]);
const trending = useTrendingSelectStore();
const apiTimeout = ref<any>(0);
onMounted(() => {
  (async () => {
    try {
      const { data } = await getRecentAnimeFunction();
      const recentAnime = data.results
        .filter((item: { type: string }) => item.type !== "ONA")
        .slice(0, 20);
      recentAnimeData.value = recentAnime;
    } catch (error) {
      console.log(error);
    }
  })();
  getTrendingAnime();
});

const getTrendingAnime = async () => {
  try {
    const { data } = await getTrendingAnimeFunction(trending.trendingLimit);
    trendingAnime.value = data.results;
  } catch (error) {
    console.log(error);
  }
};
trending.$subscribe(() => {
  clearTimeout(apiTimeout.value);
  apiTimeout.value = setTimeout(() => {
    getTrendingAnime();
  }, 600);
});
</script>

<template>
  <div class="recent-anime-wrapper">
    <CardSlideGroup
      :data="recentAnimeData"
      card-title="Recent anime"
      card-title-icon="mdi-history"
    />
  </div>
  <div class="mt-12">
    <CustomCard
      @selectValue="trending.$patch({ trendingLimit: Number($event) })"
      title="Trending anime"
      :option="trending.limitOption"
      v-model="trending.trendingLimit"
      icon="mdi-trending-up"
    >
        <div class="trending-anime-grid">
          <FilmCard v-for="item in trendingAnime" :width="242" :item="item" :key="item.id" :height="200"/>
         
        </div>
    </CustomCard>
  </div>
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation color="teal" grow>
      <v-btn>
        <v-icon>mdi-page-previous</v-icon>
        Previous page
      </v-btn>

      <v-btn>
        <v-icon>mdi-book-open-page-variant</v-icon>
        Limit {{ trending.trendingLimit }}
      </v-btn>
      <v-btn>
        <v-icon>mdi-page-next</v-icon>
        Next page
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<style>
.recent-anime-wrapper {
  margin-top: 30px;
}
.trending-anime-grid{
    margin-top: 20px;
    display: grid;
    grid-template-columns:  repeat(5,1fr);
    gap:16px;
}
.trending-anime-grid .v-card__overlay {
    background-color: none;
    opacity: 0.2;
}
</style>
