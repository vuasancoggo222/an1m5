<script setup lang="ts">
import { navLink, userDropdown } from "@/constants/navLink";
import DropdownList from "@/components/dropdown/DropdownList.vue";
import DropdownSearch from "../dropdown/DropdownSearch.vue";
import { useRoute } from "vue-router";
import useRedirectRouter from "@/uses/useRedirectRouter";
import { computed, reactive, ref, watch } from "vue";
import { searchFunction } from "@/api/search";
import useDebounce from "@/uses/useDebounce";
import { genres } from "@/constants/genres";
import TagGroup from "@/components/TagGroup.vue";
import { useColorMode, useDark } from "@vueuse/core";
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from "@/store/authStore";
const isDark  = useDark();
const dropdown = ref(null)
const { redirectByTag } = useRedirectRouter();
const route = useRoute();
const { redirectRouter } = useRedirectRouter();
const currentTabs = ref<string>(route.path);
const searchData = reactive<any>({});
const openSearchDropdown = ref<boolean>(false);
const userStore = useAuthStore();
const { debounce } = useDebounce();
const searchQuery = reactive({
  query: "",
  page: 1,
  perPage: 6,
  season: undefined,
  format: undefined,
  genres: undefined,
  year: undefined,
});
const isSearching = ref(false);
const searchingPlaceholder = computed(() =>{
  if (searchQuery.query) return "Search for movies, shows, or people";
  else return "Start typing to search";
})
useColorMode({
  attribute: "theme",
});
onClickOutside(dropdown, () => closeSearchDropdown(false))
const showHideDropdown = () => {
  if (searchQuery.query) openSearchDropdown.value = true;
  else openSearchDropdown.value = false;
};
const getSearchData = async () => {
  isSearching.value = true;
  try {
    if (searchQuery.query !== "") {
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
    <div class="side-right-header">
      <div class="authenticate-wrapper" v-if="!userStore.user.hasOwnProperty('uid')">
        <v-btn variant="outlined" @click="$router.push('/sign-in')">Sign in</v-btn>
        <v-btn color="primary" @click="$router.push('/sign-up')" variant="flat">Sign up</v-btn>
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
            color="primary"
          />
        </v-menu>
        <v-btn icon="mdi-heart" size="small" color="error"></v-btn>
      </div>
    
      <v-switch
        style="margin-left: 15px; flex: none"
        v-model="isDark"
        hide-details
        inset
      ></v-switch>
    </div>
  </div>
  <div class="search-wrapper" style="position: relative">
      <input class="search-input" v-model="searchQuery.query" type="text" :placeholder="searchingPlaceholder" />
      <dropdown-search
      ref="dropdown"
        v-on-click-outside="closeSearchDropdown"
        @closeDropdown="closeSearchDropdown"
        :dropdown-items="searchData"
        :keyword="searchQuery.query"
        :searching="isSearching"
        class="search-dropdown"
        :open="openSearchDropdown"
        :width="320"
        color="primary"
      />
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
  flex: 6;
}

.search-wrapper {
  margin-right: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.search-wrapper input {
  background-color: #ffff;
  outline: none;
  min-width: 500px;
  height: 40px;
  border: 2px solid #cbc0c0;
  border-radius: 12px;
  padding: 0 10px;
  font-size: 14px;
}

.side-right-header {
  flex:6;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.side-right-header div {
  gap: 15px;
  display: flex;
}
</style>
