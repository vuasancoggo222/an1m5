<script setup lang="ts">
import { getPopularAnimeFunction } from "@/api/popular-anime";
import CustomCard from "@/components/card/CustomCard.vue";
import { ref, watch } from "vue";
import convertToSlug from "@/helper/convertToSlug";
import useDebounce from "@/uses/useDebounce";
import { useRouter } from "vue-router";
const router = useRouter();
const { debounce } = useDebounce();
const isShowButton = ref(false);
const popularAnimeData = ref([]);
const popularAnimeQuery = ref({
  page: 1,
  perPage: 10,
});

const getPopularAnime = async () => {
  try {
    const { page, perPage } = popularAnimeQuery.value;
    const { data } = await getPopularAnimeFunction(page, perPage);
    isShowButton.value = true;
    popularAnimeData.value = data.results;
  } catch (error) {
    console.log(error);
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
    <CustomCard title="Most popular anime" icon="mdi-thumb-up-outline">
      <div class="popular-data-wrapper">
        <v-card
          class="popular-data-card"
          v-for="(item,i) in popularAnimeData as any"
          :key="item.id"
        >
          <img class="image" :src="item.image" alt="" />
          <div>
            <div
              @click="
                router.push(`/info/${convertToSlug(item.title.romaji || item.title.userPreferred)}?id=${item.id}`)">
              <h3 class="title">#{{ i + 1 }} {{item.title.romaji || item.title.userPreferred }}</h3>
              <span>Release date : {{ item.releaseDate }}</span
              ><br />
              <span>Status : {{ item.status }}</span>
            </div>
            <v-chip-group class="genres">
              <v-chip
                @click="router.push(`/genres/${convertToSlug(chip)}`)"
                v-for="chip in item.genres"
                >{{ chip }}</v-chip
              >
            </v-chip-group>
          </div>
        </v-card>
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
    </CustomCard>
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
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 25px;
  gap: 25px;
}
.popular-data-card {
  color: #ffffff;
  background-color: #6b5b95;
  cursor: pointer;
  padding: 8px !important;
  height: 100%;
  display: grid;
  grid-template-columns: 110px 1fr;
  overflow: hidden;
  gap: 16px;
  border-radius: 8px;
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
