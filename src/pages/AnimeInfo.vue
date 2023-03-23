<script setup lang="ts">
import { getAnimeInfoFunction } from "@/api/anime-info";
import CustomCard from "@/components/card/CustomCard.vue";
import { ref, watch } from "vue";
import convertToHours from "@/helper/convertToHours";
import { useRoute } from "vue-router";
const animeInfo = ref<any>({});
const route = useRoute();

const getAnimeInfo = async () => {
  try {
    if (route.query.id) {
      const { data } = await getAnimeInfoFunction(route.query.id);
      animeInfo.value = data;
    }
  } catch (error) {
    console.log(error);
  }
};
watch(
  () => route.query.id,
  () => {
    getAnimeInfo();
  },
  { immediate: true }
);
</script>

<template>
  <div class="info-breadcrum">
    <router-link to="/">Home</router-link> /
    <span>{{ animeInfo?.title?.romaji || animeInfo?.title?.english }}</span>
  </div>
  <div class="banner-wrapper">
    <v-img
      width="100%"
      class="mx-auto"
      :src="animeInfo.cover"
      :alt="animeInfo.id"
    ></v-img>
  </div>
  <div class="anime-detail-wrapper">
    <CustomCard title="Anime information" icon="mdi-information">
      <h3 class="info-title">{{ animeInfo?.title?.romaji || animeInfo?.title?.english }}</h3>
      <div class="infomation-content">
        <div class="info-image-wrapper">
            <img :src="animeInfo.image" alt="">
        </div>
        <div class="info-episode">
          <v-chip class="ma-2" style="background-color: #0b4778" label>
            {{ animeInfo.currentEpisode }} / {{ animeInfo.totalEpisodes }}
          </v-chip>
          <v-chip class="ma-2" color="pink">
            <v-icon start icon="mdi-clock-time-eight"></v-icon>
            {{ convertToHours(animeInfo.duration) }}
          </v-chip>
          <v-chip class="ma-2" style="background-color: #0b4778" label>
            {{ animeInfo.releaseDate }}
          </v-chip>
          <v-chip class="ma-2" style="background-color: #0b4778" label>
            {{ animeInfo.season }}
          </v-chip>
          <v-chip class="ma-2" icon="mdi-update" >
            {{ animeInfo.status }}
          </v-chip>
        </div>
      </div>
    </CustomCard>
  </div>
</template>
<style>
.infomation-content {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    gap:15px;
}
.info-image-wrapper {
    width: 200px;
    object-fit: cover;
    height: auto;
   
}
.info-image-wrapper img {
    max-width: 100%;
    height: 100%;
    border-radius: 8px;
}
.banner-wrapper {
  margin-top: 60px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.info-breadcrum {
  margin: 12px 22px;
  font-size: 14px;
}
.info-episode {
  color: #fff;
}
.anime-detail-wrapper {
  margin-top: 60px;
}
</style>
