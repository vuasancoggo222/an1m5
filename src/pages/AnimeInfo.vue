<script setup lang="ts">
import { getAnimeInfoFunction } from "@/api/anime-info";
import CustomCard from "@/components/card/CustomCard.vue";
import {
  computed,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import convertToHours from "@/helper/convertToHours";
import moment from "moment";
import { LocationQueryValue, useRoute } from "vue-router";
import CardSlideGroup from "@/components/slide/CardSlideGroup.vue";
import InfoLine from "@/components/line/InfoLine.vue";
// @ts-ignore
import Hls from "hls.js/dist/hls.min.js";
import { getAnimeStreamFunction } from "@/api/anime-stream";
import { useMediaControls } from "@vueuse/core";
import useRedirectRouter from "@/uses/useRedirectRouter";
import TagGroup from "@/components/TagGroup.vue";


const { redirectByTag } = useRedirectRouter();
const video: any = ref(null);
const { playing, currentTime } = useMediaControls(video);
const videoOptions = reactive({
  source: "",
  quality: "",
});
onUpdated(() => {
  //@ts-ignore
  const offsetTop = video?.value?.offsetTop - 120 ?? 0;
  localStorage.setItem("scrollTop", offsetTop.toString())
  console.dir(offsetTop);
  getPreviousCurrentTime();
});

onUnmounted(() => {
  localStorage.removeItem("scrollTop");
});
const episodeData = ref<any>();
const isLatestEpisode = ref<boolean>(false);
let hls: any | null = null;
const animeInfo = ref<any>({});
const route = useRoute();
const isLoading = ref<boolean>(false);
const animeEpisodes = ref<any>();
const episodeInfo = computed(() =>
  animeEpisodes.value.find(
    (item: { id: LocationQueryValue | LocationQueryValue[] }) =>
      item.id == route.query.episodeId
  )
);
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
const getPreviousCurrentTime = () => {
  if (localStorage.getItem(`${route.query.episodeId}-current-time`)) {
    currentTime.value = Number(
      localStorage.getItem(`${route.query.episodeId}-current-time`)
    );
  }
};
const getAnimeEpisode = async () => {
  try {
    const { data } = await getAnimeStreamFunction(route.query.episodeId as any);
    episodeData.value = data;
    getStream(episodeData.value.sources[3]);
  } catch (error) {
    console.log(error);
  }
};
const getStream = (source: any) => {
  videoOptions.source = source.url;
  videoOptions.quality = source.quality;
  let url = source.url;
  let stream = `${url}`;
  if (Hls.isSupported()) {
    hls = new Hls();
    hls.loadSource(stream);
    hls.attachMedia(video.value);
  } else if (video.value.canPlayType("application/vnd.apple.mpegurl")) {
    video.value.src = stream;
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
watch(
  () => route.query.episodeId,
  () => {
    if (route.query.episodeId) {
      getAnimeEpisode();
    }
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
      <span style="cursor: pointer" @click="$router.push('/')">Home</span> /
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
      <custom-card title="Anime information" icon="mdi-information">
        <h2 class="mb-4 info-title">
          {{ animeInfo?.title?.romaji || animeInfo?.title?.english }}
        </h2>
        <div v-if="!route.query.episodeId" class="infomation-content">
          <div class="info-image-wrapper">
            <img :src="animeInfo.image" alt="" />
          </div>
          <div v-if="animeInfo" class="info-episode">
            <div class="mb-4">
              <v-chip class="mr-4" style="background-color: #0b4778" label>
                <span
                  v-if="animeInfo.currentEpisode || animeInfo.totalEpisodes"
                >
                  {{ animeInfo.currentEpisode }} / {{ animeInfo.totalEpisodes }}
                </span>
                <span v-else>Updating</span>
              </v-chip>
              <v-chip class="mr-4" color="pink">
                <v-icon start icon="mdi-clock-time-eight"></v-icon>
                <span v-if="animeInfo.duration">{{
                  convertToHours(animeInfo.duration)
                }}</span>
                <span v-else>Updating</span>
              </v-chip>
              <v-chip class="mr-4" style="background-color: #0b4778" label>
                <span v-if="animeInfo.releaseDate">{{
                  animeInfo.releaseDate
                }}</span>
                <span v-else>Updating</span>
              </v-chip>
              <v-chip class="mr-4" style="background-color: #0b4778" label>
                <span v-if="animeInfo.season"> {{ animeInfo.season }}</span>
                <span v-else>Updating</span>
              </v-chip>
              <v-chip class="mr-4" icon="mdi-update">
                {{ animeInfo.status }}
              </v-chip>
            </div>
            <div>
              <tag-group
                :tag-data="animeInfo.genres"
                @onRedirect="redirectByTag"
                :custom="'background-color: #7149c6; color: #fff'"
              />

              <div class="info-line-wrapper">
                <info-line title="Studio">
                  <span
                    v-if="animeInfo.studios.length"
                    v-for="studio in animeInfo.studios"
                    >{{ studio.toUpperCase() }}</span
                  >
                  <span v-else>Updating</span>
                </info-line>
                <info-line title="Status" :data="animeInfo.status" />

                <info-line title="Type" :data="animeInfo.type" />

                <info-line title="Start date">
                  <span v-if="animeInfo.startDate.year">
                    {{ moment(animeInfo.startDate).format("DD/MM/YYYY") }}
                  </span>
                  <span v-else> Updating</span>
                </info-line>
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

        <custom-card
        style="display:flex;justify-content: center;background:  linear-gradient(
          rgba(0, 0, 0, 0.7), 
          rgba(0, 0, 0, 0.7)
        )"
          icon="mdi-information-outline"
          :title="`Episode ${episodeInfo.number}`"
          v-else-if="route.query.episodeId"

        >
          <video
            style="border:3px solid #fff;position:relative"
            id="video"
            ref="video"
            width="700"
            height="400"
            preload="metadata"
            autoplay
            @click="playing = !playing"
            controls
            :poster="episodeInfo?.image"
          >
         
          </video>
        
        </custom-card>
        <div style="display: flex; justify-content: center" v-else-if="route.query.episodeId" class="my-3">
          <v-btn
            size="small"
            :color="videoOptions.quality == item.quality ? 'error' : 'success'"
            class="mx-2"
            @click="getStream(item)"
            v-for="item in episodeData?.sources"
            >{{ item.quality }}</v-btn
          >
          <v-btn size="small" color="error" class="mx-2"
            ><a :href="episodeData?.download" style="color: white"
              >Download</a
            ></v-btn
          >
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
              @click="
                $router.replace({
                  path: route.fullPath,
                  params: route.params,
                  query: { id: route.query.id },
                })
              "
              class="ma-2"
              color="success"
              size="small"
            >
              Info</v-btn
            >
            <v-btn
              width="56"
              @click="
                $router.replace({
                  path: route.fullPath,
                  params: route.params,
                  query: { ...route.query, episodeId: episode.id },
                })
              "
              class="ma-2"
              :color="route.query.episodeId == episode.id ? 'primary' : 'error'"
              size="small"
              v-for="episode in animeEpisodes"
              >{{ episode.number }}</v-btn
            >
          </div>
        </div>
      </custom-card>
    </div>
    <card-slide-group
      :data="animeInfo.recommendations"
      card-title="Recommendations anime"
      card-title-icon="mdi-history"
      :style="!isLoading ? '' : 'opacity : 0.5'"
    />
    <card-slide-group
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
.video-player {
  width: 100%;
  background-color: #1e1e20;
  display: flex;
  justify-content: center;
}
.video-container {
  position: relative;
  border-radius: 6px;
}
.custom-controls {
  position: absolute;
}
</style>
