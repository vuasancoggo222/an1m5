import { defineStore } from 'pinia'
import { getListManga } from '@/api/manga/mangaList'
export const useMangaStore = defineStore('manga', {
    state: () => {
        return {
            mangaLimit : 20,
            page:1,
            mangaList: [],
            totalPages: 0,
            totalStories: 0,
        }
    },
    getters: {
      mangaListData: (state) => state.mangaList,
    },
    actions: {
      async fetchMangaList() {
        try {
            const response = await getListManga();
            if(response.data){
                this.mangaList = response.data.mangaList;
                this.totalPages = response.data.metaData.totalPages;
                this.totalStories = response.data.metaData.totalStories ?? 0;
            }
        } catch (error) {
            this.mangaList = [];
            this.totalPages = 0;
            this.totalStories = 0;
        }
      },
    },
  })
