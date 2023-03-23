import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTrendingSelectStore = defineStore('trending',() =>{
    const trendingLimit = ref<number>(20) 
    const page = ref<number>(1)
    const hasNextPage = ref<boolean>(true)
    const limitOption = ref([
        {
            title : '15 per page',
            value : 15
        },
        {
            title : '20 per page',
            value : 20
        },
        {
            title : '25 per page',
            value : 25
        },
        {
            title : '30 per page',
            value : 30
        },
    ])
    return {
        trendingLimit,
        limitOption,
        page,
        hasNextPage
    }
})