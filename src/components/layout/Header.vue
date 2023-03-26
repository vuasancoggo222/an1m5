<script setup lang="ts">
import { navLink, userDropdown } from "@/constants/navLink";
import DropdownList from "@/components/dropdown/DropdownList.vue";
import DropdownSearch from "../dropdown/DropdownSearch.vue";
import { useRoute, useRouter } from "vue-router";
import useRedirectRouter from "@/uses/useRedirectRouter";
import { reactive, ref, watch } from "vue";
import { searchFunction } from "@/api/search";
import useDebounce from "@/uses/useDebounce";
import { genres } from "@/constants/genres";
import TagGroup from "@/components/TagGroup.vue";
import convertToSlug from "@/helper/convertToSlug";
const route = useRoute();
const router = useRouter();
const { redirectRouter } = useRedirectRouter();
const currentTabs = ref<string>(route.path);
const searchData = reactive<any>({});
const openSearchDropdown = ref<boolean>(false);
const user = ref(false);
const { debounce } = useDebounce();
const searchQuery = reactive({
  query: "",
  page: 1,
  perPage: 6,
  season: "",
  format: "",
  genres: "",
  year: "",
});

const showHideDropdown = () => {
  if (searchQuery.query) openSearchDropdown.value = true;
  else openSearchDropdown.value = false;
};
const getSearchData = async () => {
  try {
    if (searchQuery.query !== "" ?? null) {
      const { query, page, perPage, season, format, genres, year } =
        searchQuery;
      const { data } = await searchFunction(
        query,
        page,
        perPage,
        season,
        format,
        genres,
        year
      );
      searchData.response = data;
    }
  } catch (error) {
    console.log(error);
  }
};
const closeSearchDropdown = (reset: boolean) => {
  openSearchDropdown.value = false;
  if (reset) {
    searchQuery.query = "";
    searchData.response = [];
  }
};
const getRandomAnime = () => {};
watch(route, (route) => {
  currentTabs.value = route.path;
});
const redirectByTag = (tag: string) =>
  router.push(`/filter/generes?type=${tag}`);
watch(
  searchQuery,
  () => {
    showHideDropdown();
    debounce(getSearchData, 300);
  },
  { immediate: true }
);
</script>
<template>
  <div class="header-wrapper">
    <v-tabs
      color="deep-purple-accent-4"
      v-model="currentTabs"
      align-tabs="center"
    >
      <template v-for="nav in navLink" :key="nav.name">
        <v-tab :value="nav.path" @click="redirectRouter(nav.path)">{{
          nav.name
        }}</v-tab>
      </template>
    </v-tabs>
    <div class="side-right-header">
      <div class="search-wrapper" style="position: relative">
        <input v-model="searchQuery.query" type="text" />
        <DropdownSearch
          @closeDropdown="closeSearchDropdown"
          :dropdown-items="searchData"
          :keyword="searchQuery.query"
          class="search-dropdown"
          :open="openSearchDropdown"
          :width="320"
          active-color="primary"
        />
      </div>
      <div class="authenticate-wrapper" v-if="!user">
        <v-btn variant="outlined">Sign in</v-btn>
        <v-btn color="primary" variant="flat">Sign up</v-btn>
      </div>
      <div class="user-wrapper" v-else>
        <v-menu transition="scale-transition">
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              icon="mdi-account"
              v-bind="props"
              size="small"
            >
            </v-btn>
          </template>
          <dropdown-list
            :dropdown-items="userDropdown"
            :width="200"
            active-color="primary"
          />
        </v-menu>
        <v-btn icon="mdi-heart" size="small" color="error"></v-btn>
      </div>
      <v-btn
        @click="getRandomAnime"
        style="margin-left: 15px"
        variant="outlined"
        color="error"
        >Random anime</v-btn
      >
    </div>
  </div>
  <tag-group @on-redirect="redirectByTag" :tag-data="genres" />
</template>

<style scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
}

.search-wrapper {
  margin-right: 15px;
}

.search-wrapper input {
  width: 320px;
  height: 40px;
  border: 2px solid #cbc0c0;
  border-radius: 12px;
  padding: 0 10px;
  font-size: 14px;
}

.side-left-header {
  flex: 7;
  display: flex;
  align-items: center;
}

.side-right-header {
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.side-right-header div {
  gap: 15px;
  display: flex;
}
</style>
