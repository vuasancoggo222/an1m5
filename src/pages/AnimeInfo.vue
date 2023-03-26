<script setup lang="ts">
import { getAnimeInfoFunction } from "@/api/anime-info";
import CustomCard from "@/components/card/CustomCard.vue";
import { ref, watch } from "vue";
import convertToHours from "@/helper/convertToHours";
import { useRoute, useRouter } from "vue-router";
import CardSlideGroup from "@/components/slide/CardSlideGroup.vue";
import InfoLine from "@/components/line/InfoLine.vue";
const isLatestEpisode = ref<boolean>(false);
const animeInfo = ref<any>({});
const route = useRoute();
const router = useRouter();
const isLoading = ref<boolean>(false);
const animeEpisodes = ref<any>();
const getAnimeInfo = async () => {
  try {
    isLoading.value = true;
    if (route.query.id) {
      const { data } = await getAnimeInfoFunction(route.query.id);
      isLoading.value = false;
      animeInfo.value = data;
      animeEpisodes.value = data.episodes;
    }
  } catch (error) {
    console.log(error);
  }
};
watch(
  () => route.query.id,
  () => {
    animeInfo.value = [];
    animeEpisodes.value = [];
    getAnimeInfo();
  },
  { immediate: true }
);
watch(isLatestEpisode, (status) => {
  if (status) animeEpisodes.value = animeInfo.value.episodes.reverse();
  else animeEpisodes.value = animeInfo.value.episodes.reverse();
});
</script>

<template>
  <div v-if="!isLoading">
    <div class="info-breadcrum">
      <router-link to="/">Home</router-link> /
      <span>{{ animeInfo?.title?.romaji || animeInfo?.title?.english }}</span>
    </div>
    <div class="banner-wrapper">
      <v-img
        width="100%"
        aspect-radio="16/9"
        class="mx-auto"
        cover
        :src="animeInfo.cover"
        :alt="animeInfo.id"
      ></v-img>
    </div>
    <div class="anime-detail-wrapper">
      <CustomCard title="Anime information" icon="mdi-information">
        <h2 class="mb-4 info-title">
          {{ animeInfo?.title?.romaji || animeInfo?.title?.english }}
        </h2>
        <div class="infomation-content">
          <div class="info-image-wrapper">
            <img :src="animeInfo.image" alt="" />
          </div>
          <div v-if="animeInfo" class="info-episode">
            <div class="mb-4">
              <v-chip class="mr-4" style="background-color: #0b4778" label>
               <span v-if="animeInfo.currentEpisode || animeInfo.totalEpisodes">
                {{ animeInfo.currentEpisode }} / {{ animeInfo.totalEpisodes }} 
               </span>
               <span v-else>Updating</span>
              </v-chip>
              <v-chip class="mr-4" color="pink">
                <v-icon start icon="mdi-clock-time-eight"></v-icon>
                <span v-if="animeInfo.duration">{{ convertToHours(animeInfo.duration) }}</span>
                <span v-else>Updating</span>
              </v-chip>
              <v-chip class="mr-4" style="background-color: #0b4778" label>
                <span v-if="animeInfo.releaseDate">{{ animeInfo.releaseDate }}</span>
                <span v-else>Updating</span>
              </v-chip>
              <v-chip class="mr-4" style="background-color: #0b4778" label>
             <span v-if="animeInfo.season">   {{ animeInfo.season }}</span>
                <span v-else>Updating</span>
              </v-chip>
              <v-chip class="mr-4" icon="mdi-update">
                {{ animeInfo.status }}
              </v-chip>
            </div>
            <div>
              <v-chip-group>
                <v-chip
                  style="background-color: #7149c6; color: #fff"
                  v-for="genre in animeInfo.genres"
                  :key="genre"
                >
                  {{ genre }}
                </v-chip>
              </v-chip-group>
              <div class="info-line-wrapper">
              <InfoLine title="Studio">
                <span v-if="animeInfo.studios.length" v-for="studio in animeInfo.studios">{{
                    studio.toUpperCase()
                  }}</span>
                <span v-else>Updating</span>
              </InfoLine>
                <InfoLine title="Status" :data="animeInfo.status"/>
                
                
                <InfoLine title="Type" :data=" animeInfo.type "/>
                
                <InfoLine title="Start date">
                  <span
                    v-if="animeInfo.startDate?.year"
                    >{{ animeInfo?.startDate?.day }}/{{
                      animeInfo?.startDate?.month
                    }}/{{ animeInfo?.startDate?.year }}</span
                  >
                  <span v-else> Updating</span>
                </InfoLine >
                
              </div>
              <div
                style="color: black; font-size: 14px"
                class="mt-4"
                v-html="animeInfo.description"
              ></div>
            </div>
          </div>
          <div class="iframe-trailer">
            <v-chip class="my-2" color="green" label text-color="white">
              <v-icon start icon="mdi-label"></v-icon>
              {{ animeInfo?.title?.romaji }} Trailer
            </v-chip>
            <iframe
              width="100%"
              allowfullscreen="true"
              frameborder="0"
              loading="lazy"
              height="250px"
              :src="`https://www.youtube.com/embed/${animeInfo?.trailer?.id}`"
            ></iframe>
          </div>
        </div>
        <div>
          <v-chip color="blue" label text-color="white">
            <v-icon start icon="mdi-label"></v-icon>
            Episode List
          </v-chip>
          <v-switch
            v-model="isLatestEpisode"
            hide-details
            inset
            color="success"
            label="Latest episode"
          ></v-switch>
          <div class="mt-4">
            <v-btn
              width="56"
              @click="router.push(`/watch/${episode.id}`)"
              class="ma-2"
              color="error"
              size="small"
              v-for="episode in animeEpisodes"
              >{{ episode.number }}</v-btn
            >
          </div>
        </div>
      </CustomCard>
    </div>
    <CardSlideGroup
      :data="animeInfo.recommendations"
      card-title="Recommendations anime"
      card-title-icon="mdi-history"
      :style="!isLoading ? '' : 'opacity : 0.5'"
    />
    <CardSlideGroup
      :data="animeInfo.relations"
      card-title="Relations anime"
      card-title-icon="mdi-history"
      :style="!isLoading ? '' : 'opacity : 0.5'"
    />
  </div>
</template>
<style>
.infomation-content {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  gap: 15px;
}
.info-image-wrapper {
  width: 200px;
  height: auto;
}
.info-image-wrapper img {
  max-width: 100%;
  border-radius: 8px;
}
.banner-wrapper {
  width: 100%;
  height: 100%;
  margin-top: 60px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.iframe-trailer {
  flex-direction: column;
  display: flex;
  justify-content: center;
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
.info-line-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}
</style>
