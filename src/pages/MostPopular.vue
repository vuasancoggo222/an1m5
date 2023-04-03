<script setup lang="ts">
import { getPopularAnimeFunction } from "@/api/popular-anime";
import CustomCard from "@/components/card/CustomCard.vue";
import { ref, watch } from "vue";
import convertToSlug from "@/helper/convertToSlug";
import useDebounce from "@/uses/useDebounce";
import TagGroup from "@/components/TagGroup.vue";
import useRedirectRouter from '@/uses/useRedirectRouter'
import ProgressCircle from "@/components/progess/ProgressCircle.vue";
const {redirectByTag} = useRedirectRouter()
const { debounce } = useDebounce();
const isShowButton = ref(false);
const popularAnimeData = ref([]);
const popularAnimeQuery = ref({
  page: 1,
  perPage: 10,
});
const isFetching = ref(false)
const getPopularAnime = async () => {
  isFetching.value = true
  try {
    const { page, perPage } = popularAnimeQuery.value;
    const { data } = await getPopularAnimeFunction(page, perPage);
    isShowButton.value = true;
    popularAnimeData.value = data.results;
    isFetching.value = false
  } catch (error) {
    console.log(error);
    isFetching.value = false
  }
};
getPopularAnime();

watch(
  popularAnimeQuery.value,
  () => {
    isShowButton.value = false;
    debounce(getPopularAnime,600);
  },
  { immediate: true }
);
</script>

<template>
  <div class="most-popular-wrapper">
    <custom-card title="Most popular anime" icon="mdi-thumb-up-outline">
      <div v-if="!isFetching" class="popular-data-wrapper">
        <v-card
          
          class="popular-data-card"
          v-for="(item,i) in popularAnimeData as any"
          :key="item.id"
        >
          <img class="image" :src="item.image" alt="" />
          <div>
            <div
            class="my-2"
              @click="
                $router.push(`/watch/${convertToSlug(item.title.romaji || item.title.userPreferred)}?id=${item.id}`)">
              <h3 class="title">#{{ i + 1 }} {{item.title.romaji || item.title.userPreferred }}</h3>
              <span class="my-2">Release date : {{ item.releaseDate }}</span
              ><br />
              <span >Status : {{ item.status }}</span>
            </div>
            <tag-group :tag-data="item.genres" @onRedirect="redirectByTag"/>
          </div>
        </v-card>
       
      </div>
      <div v-else class="loading-circle">
        <progress-circle style=" margin-top: 50px;" :indeterminate="true" :size="40"/>
        </div>
      <div class="button-wrapper">
        <v-btn
          v-if="isShowButton"
          @click="popularAnimeQuery.perPage += 10"
          variant="flat"
          color="error"
          >See more</v-btn
        >
      </div>
    </custom-card>
  </div>
</template>

<style>
.most-popular-wrapper {
  margin-top: 30px;
}
.most-popular-wrapper .button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.most-popular-wrapper .image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.popular-data-wrapper {
  border-radius: 12px;
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 25px;
  gap: 25px;
}
.popular-data-card {
  border-radius: 12px;
  color: #ffffff;
  background-color: #6b5b95;
  cursor: pointer;
  padding: 8px !important;
  height: 100%;
  display: grid;
  grid-template-columns: 110px 1fr;
  overflow: hidden;
  gap: 16px;
  
}

.popular-data-card .title {
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
}
.genres {
  margin-top: 20px;
  display: flex;
  
}

</style>
