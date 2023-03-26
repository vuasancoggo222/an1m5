<script setup lang="ts">
import CustomCard from '@/components/card/CustomCard.vue';
import FilmCard from '@/components/card/FilmCard.vue';
import { useRoute,useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';
import { searchAnimeByGenresFunction, searchFunction } from '@/api/search';
import useDebounce from '@/uses/useDebounce';
const action = ref<any>()
const {debounce} = useDebounce()
const animePerpage = ref<number>(20)
const title = computed(() => action.value == 'generes' ? `Movie ${route?.query?.type} generes` : `Search results for keyword '${route.query.keyword}'` )
const route = useRoute()
const router = useRouter()
const animeData = ref<any>([])
const hasNextPage = ref<boolean>(false)
const getFilterAnime = async () => {
  try {
    if(action.value == 'generes'){
      const {data} = await searchAnimeByGenresFunction(route.query.type,animePerpage.value)
      console.log(data);
      animeData.value = data.results
      hasNextPage.value = data.hasNextPage
    }
    else if(action.value == "search"){
      const {data} = await searchFunction(route.query.keyword as any)
      console.log(data);
      console.log(data.hasNextPage);
      animeData.value = data.results
      hasNextPage.value = data.hasNextPage
    }
  } catch (error) {
      console.log(error);
      
  }
}
const updatePerpage =  () =>{
  animePerpage.value +=10
}
getFilterAnime()
watch(
  () => route.params.action,
  (value) => {
    action.value = value
  },
  { immediate: true }
);
watch(
  () => route.query.type,
  () => {
    getFilterAnime()
  },
  { immediate: true }
);
watch(animePerpage,() => {
 getFilterAnime()
})
watch(() => route.query.keyword, () => {
 getFilterAnime()
}, { immediate: true })
</script>

<template>
    <CustomCard
    
      @selectValue=""
      :title="title"
     
   
      :icon="action == 'generes' ? 'mdi-tag' : 'mdi-search-web'"
    >
        <div class="trending-anime-grid">
          <FilmCard v-for="item in animeData" :width="242" :item="item" :key="item.id" :height="200"/>
        </div>
          <div class="see-more">
            <v-btn v-if="hasNextPage" @click="debounce(updatePerpage,500)" variant="flat" color="error">See more</v-btn>
          </div>
    </CustomCard>

</template>

<style>
.see-more{
  margin: 10px 0;
 display: flex;
 justify-content: center;
}
</style>