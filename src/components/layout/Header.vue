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
//@ts-ignore
import { vOnClickOutside } from '@vueuse/components'
import { useColorMode, useDark } from "@vueuse/core";
const isDark = useDark();
useColorMode({
  attribute: "theme",
});

const { redirectByTag } = useRedirectRouter();
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
const isSearching = ref(false);
const showHideDropdown = () => {
  if (searchQuery.query) openSearchDropdown.value = true;
  else openSearchDropdown.value = false;
};
const getSearchData = async () => {
  isSearching.value = true;
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
      isSearching.value = false;
    }
  } catch (error) {
    console.log(error);
    isSearching.value = false;
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
      class="header-tab"
      color="deep-purple-accent-4"
      v-model="currentTabs"
      align-tabs="start"
    >
      <template v-for="nav in navLink" :key="nav.name">
        <v-tab :value="nav.path" @click="redirectRouter(nav.path)">{{
          nav.name
        }}</v-tab>
      </template>
    </v-tabs>
    <div class="search-wrapper" style="position: relative">
      <input class="search-input" v-model="searchQuery.query" type="text" />
      <dropdown-search
        v-on-click-outside="closeSearchDropdown"
        @closeDropdown="closeSearchDropdown"
        :dropdown-items="searchData"
        :keyword="searchQuery.query"
        :searching="isSearching"
        class="search-dropdown"
        :open="openSearchDropdown"
        
        :width="320"
        active-color="primary"
      />
    </div>
    <div class="side-right-header">
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
        variant="outlined"
        style="margin-left: 15px"
        color="success"
        >Random</v-btn
      >
      <v-switch
        style="margin-left: 15px; flex: none"
        v-model="isDark"
        hide-details
        inset
      ></v-switch>
    </div>
  </div>
  <tag-group @on-redirect="redirectByTag" :tag-data="genres" />
</template>

<style scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 20px;
}
.header-tab {
  flex: 3.3;
}

.search-wrapper {
  margin-top: 9px;
  flex: 3.3;
  width: 100%;
}

.search-wrapper input {
  background-color: #ffff;
  outline: none;
  min-width: 320px;
  width: 100%;
  
  height: 40px;
  border: 2px solid #cbc0c0;
  border-radius: 12px;
  padding: 0 10px;
  font-size: 14px;
}

.side-right-header {
  flex: 3.3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.side-right-header div {
  gap: 15px;
  display: flex;
}
</style>
