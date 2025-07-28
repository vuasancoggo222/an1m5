<script setup lang="ts">
import CardSlideGroup from "@/components/slide/CardSlideGroup.vue";
import { ref } from "vue";
import  getRecentAnimeFunction  from "@/api/recent-anime";
import { useTrendingSelectStore } from "@/store/trendingSelectStore";
import CustomCard from "@/components/card/CustomCard.vue";
import { getTrendingAnimeFunction } from "@/api/trending-anime";
import useDebounce from "@/uses/useDebounce";
import FilmCard from "@/components/card/FilmCard.vue";

const trendingAnime = ref<any>([]);
const trending = useTrendingSelectStore();
const {debounce} = useDebounce()
const isDisabledBtn = ref<boolean>(false)
const { recentAnimeData ,recentIsFinished } =  getRecentAnimeFunction();

const getTrendingAnime = async () => {
  try {
    console.log('abcd');
    
    const { data } = await getTrendingAnimeFunction(trending.page,trending.trendingLimit);
    trendingAnime.value = data.results;
    isDisabledBtn.value = false
    
  } catch (error) {
    console.log(error);
  }
};
trending.$subscribe(() => {
  isDisabledBtn.value = true
  debounce(getTrendingAnime,600)
});
getTrendingAnime();
</script>

<template>
  <div class="recent-anime-wrapper">
    <card-slide-group
      :data="recentAnimeData"
      card-title="Recent anime"
      card-title-icon="mdi-history"
      :style="recentIsFinished ? '' : 'opacity : 0.5'"
    />
  </div>
  <div class="mt-12">
    <custom-card
      @selectValue="trending.$patch({ trendingLimit: Number($event) })"
      title="Trending anime"
      :option="trending.limitOption"
      v-model="trending.trendingLimit"
      icon="mdi-trending-up"
    >
        <div class="trending-anime-grid">
          <film-card v-for="item in trendingAnime" :width="242" :item="item" :key="item.id" :height="200"/>
         
        </div>
    </custom-card>
  </div>
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation color="teal" grow>
      <v-btn @click="trending.$patch({ page : Number(trending.page) - 1})" :disabled="trending.page == 1 || isDisabledBtn">
        <v-icon>mdi-page-previous</v-icon>
        Previous page
      </v-btn>

      <v-btn >
        <v-icon>mdi-book-open-page-variant</v-icon>
         {{ trending.trendingLimit }} / page {{ trending.page  }}
      </v-btn>
      <v-btn :disabled="!trending.hasNextPage || isDisabledBtn" @click="trending.$patch({ page : Number(trending.page) + 1})" >
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
