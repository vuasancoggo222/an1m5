<script setup lang="ts">
import { getPopularAnimeFunction } from "@/api/popular-anime";
import CustomCard from "@/components/card/CustomCard.vue";
import { ref, watch } from "vue";
import slugify from "slugify";
import { useRouter } from "vue-router";
const router = useRouter();
const popularAnimeData = ref([]);
const popularAnimeQuery = ref({
  page: 1,
  perPage: 10,
});
watch(popularAnimeQuery.value, () => {}, { immediate: true });
const getPopularAnime = async () => {
  try {
    const { page, perPage } = popularAnimeQuery.value;
    const { data } = await getPopularAnimeFunction(page, perPage);
    popularAnimeData.value = data.results;
  } catch (error) {
    console.log(error);
  }
};
getPopularAnime();
</script>

<template>
  <div class="most-popular-wrapper">
    <CustomCard title="Most popular anime" icon="mdi-thumb-up-outline">
      <div class="popular-data-wrapper">
        <v-card
          @click="
            router.push(
              `/watch/${item.id}/${slugify(item.title.userPreferred)}`
            )
          "
          :style="`background-color : ${item.color}`"
          class="popular-data-card"
          v-for="(item,i) in popularAnimeData as any"
          :key="item.id"
        >
          <img class="image" :src="item.image" alt="" />
          <div>
            <h3 class="title">#{{ i + 1 }} {{ item.title.userPreferred }}</h3>
            <span v-html="item.description" class="description"></span>
          </div>
        </v-card>
      </div>
      <div class="button-wrapper">
        <v-btn variant="flat" color="error">See more</v-btn>
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
  cursor: pointer;
  padding: 5px !important;
  height: 150px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  gap: 16px;
  border-radius: 8px;
}
.description {
  font-size: 14px;
  line-height: 16px;
}
.popular-data-card .title {
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
}
</style>
