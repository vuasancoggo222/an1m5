<script setup lang="ts">
import convertToSlug from "@/helper/convertToSlug";
import { useRouter } from "vue-router";
const router = useRouter();
defineProps({
    isSelected : {},
    item : {
        type : Object
    },
    height : {
      type : Number
    },
    width : {
      type : Number
    },
})
</script>

<template>
   <v-card
          style="position: relative"
          :color="isSelected ? 'primary' : ''"
          class="slide-group-card"
          :height="height"
          :width="width"
          @click="
            router.push(
              `/info/${convertToSlug(item?.title.romaji || item?.title.userPreferred)}?id=${item?.id}`
            )
          "
        >
          <div class="title-information">
            <v-card-subtitle>
              <v-chip label>
                {{ item?.episodeNumber || item?.totalEpisodes || item?.episodes || "Updating" }}
              </v-chip>
            </v-card-subtitle>
            <v-card-title class="film-card-title">{{item?.title.romaji || item?.title.userPreferred }}</v-card-title>
          </div>
          <div class="slide-image">
            <v-img
              :style="`background-color : ${item?.color}`"
              :width="width"
              :height="height"
              aspect-ratio="1/1"
              cover
              :src="item?.image"
            ></v-img>
          </div>
        </v-card>

</template>
<style>
.slide-group-card {
  margin: 10px;
  border-radius: 8px !important;
}

.slide-group-card .v-card-title {
  display: flex;
  min-height: 40px;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 4px;
  font-size: 12px;
  color: #ffff;
  line-height: 20px !important;
  font-weight: 550;
  white-space: pre-wrap;
  text-transform: none;
  word-wrap: break-word;
}

.slide-image {
  position: absolute;
  top: 0px;

  opacity: 1;
  filter:brightness(75%);

}
.film-card-title {
  font-weight: bold;
}
.slide-group-card .title-information .v-card-title {
  position: absolute;
  z-index: 99 !important;
  bottom: 0;
}

.slide-group-card .title-information .v-card-subtitle {
  position: absolute;
  z-index: 99 !important;
  color: #fff;
  font-weight: 600;
  background-color: #6200ee;
  opacity: 1;
  padding: 0;
}
</style>