<script setup lang="ts">
import { getMangaDetail } from '@/api/manga/mangaDetail';
import { IMangaDetails } from '@/types/manga';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const mangaId = computed(() => route.params.id as string);
const mangaDetailData = ref<IMangaDetails>()
const fetchMangaDetail = async () => {
    try {
        const response = await getMangaDetail(mangaId.value);
        if (response.status == 200) {
            mangaDetailData.value = response.data;
        }
    } catch (error: any) {
        console.log(error.message);
        mangaDetailData.value = undefined;
    }
}

onMounted(() => {
    fetchMangaDetail()
})
</script>

<template>
    <div v-if="mangaDetailData">
        <div> Name: {{ mangaDetailData.name }}</div>
        <div> Author: {{ mangaDetailData.author }}</div>
        <div> Status: {{ mangaDetailData.status }}</div>
        <div> Updated: {{ mangaDetailData.updated }}</div>
        <div> View: {{ mangaDetailData.view }}</div>
        <div> genres: {{ mangaDetailData.genres }}</div>
        <div v-for="chapter in mangaDetailData.chapterList">
            <router-link :to="chapter.path.toString()">{{ chapter.name }}</router-link>
        </div>
    </div>
</template>


<style></style>