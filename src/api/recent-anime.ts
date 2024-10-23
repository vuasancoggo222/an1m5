import config from "./config";
import { useAxios } from '@vueuse/integrations/useAxios'
import { computed } from "vue";
export default  function  getRecentAnimeFunction (){
    const { data, isFinished } = useAxios(`/anilist/recent-episodes?perPage=50`,config)
    const recentAnimeData = computed(() => data?.value?.results.filter((item: { type: string }) => item.type !== "ONA").slice(0, 20))  
    return {
        recentAnimeData,
        recentIsFinished : isFinished,
    }    
}

