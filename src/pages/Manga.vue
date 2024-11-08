<script setup lang="ts">
import { useMangaStore } from '@/store/mangaStore';
import useRedirectRouter from '@/uses/useRedirectRouter';
const {redirectRouter} = useRedirectRouter()
import { onMounted } from 'vue';
const mangaStore = useMangaStore()

onMounted(async () => {
    await mangaStore.fetchMangaList()
})
</script>

<template>

    <div transition-duration="0.3s" item-selector=".item">
        <div v-for="manga in mangaStore.mangaListData as Record<string, any>" :key="manga.id">
            <div>
               <span @click="redirectRouter(`/mangaDetails/${manga.id}`)">{{ manga.title }}</span>
            </div>
        </div>
    </div>
    <div>

    </div>
</template>

<style></style>