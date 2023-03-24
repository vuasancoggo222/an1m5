<script setup lang="ts">
import { getAnimeInfoFunction } from "@/api/anime-info";
import CustomCard from "@/components/card/CustomCard.vue";
import { computed, ref, watch } from "vue";
import convertToHours from "@/helper/convertToHours";
import { useRoute,useRouter } from "vue-router";

const animeInfo = ref<any>({});
const route = useRoute();
const router =useRouter()
const animeEpisode = computed(() => animeInfo.value.episodes.reverse())
const trailerLink = computed(
  () => `https://www.youtube.com/embed/${animeInfo.trailer.id}`
);
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
  <div v-if="animeInfo.title" class="info-breadcrum">
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
              {{ animeInfo.currentEpisode }} / {{ animeInfo.totalEpisodes }}
            </v-chip>
            <v-chip class="mr-4" color="pink">
              <v-icon start icon="mdi-clock-time-eight"></v-icon>
              {{ convertToHours(animeInfo.duration) }}
            </v-chip>
            <v-chip class="mr-4" style="background-color: #0b4778" label>
              {{ animeInfo.releaseDate }}
            </v-chip>
            <v-chip class="mr-4" style="background-color: #0b4778" label>
              {{ animeInfo.season }}
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
              <div class="info-line">
                <span>Studio</span> :
                <span v-for="studio in animeInfo.studios">{{ studio }}</span>
              </div>
              <div class="info-line">
                <span>Status</span> : <span>{{ animeInfo.status }}</span>
              </div>
              <div class="info-line">
                <span>Type</span> : <span>{{ animeInfo.type }}</span>
              </div>
              <div class="info-line">
                <span>Start date</span> :
                <span
                  >{{ animeInfo?.startDate?.day }}/{{
                    animeInfo?.startDate?.month
                  }}/{{ animeInfo?.startDate?.year }}</span
                >
              </div>
            </div>
            <div
              style="color:black;font-size: 14px"
              class="mt-4"
              v-html="animeInfo.description"
            ></div>
          </div>
        </div>
        <div class="iframe-trailer">
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
        <div class="mt-4">
            <v-btn width="56" @click="router.push(`/watch/${episode.id}`)" class="ma-2" color="error" size="small" v-for="episode in animeEpisode">{{ episode.number }}</v-btn>
        </div>
      </div>
    </CustomCard>
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
  display: flex;
  align-items: center;
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
.info-line {
  margin-top: 10px;
  line-height: 16px;
  color: black;
  font-weight: 600;
  font-style: normal;
}
.info-line-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}
.info-title {
  color: #5b5ea6;
}
</style>
