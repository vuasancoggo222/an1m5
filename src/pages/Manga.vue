<script setup lang="ts">
import { useMangaStore } from "@/store/mangaStore";
import useRedirectRouter from "@/uses/useRedirectRouter";
const { redirectRouter } = useRedirectRouter();
import { onMounted } from "vue";
const mangaStore = useMangaStore();
const getFile = (e: any) => {
  const file = e.target.files[0];
  console.log(file);
  
};
onMounted(async () => {
  await mangaStore.fetchMangaList();
});

</script>

<template>
  <div transition-duration="0.3s" item-selector=".item">
    <div
      v-for="manga in mangaStore.mangaListData as Record<string, any>"
      :key="manga.id"
    >
      <div>
        <span @click="redirectRouter(`/mangaDetails/${manga.id}`)">{{
          manga.title
        }}</span>
      </div>
    </div>
    <input type="file" @change="getFile" >
  </div>
  <div></div>
</template>

<style></style>
