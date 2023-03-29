<script setup lang="ts">
import { socialIcons } from '@/constants/iconSocial';
import { useNow } from '@vueuse/core'
import moment from 'moment';
const now = useNow()
</script>

<template>
  <footer
    class="bg-indigo-lighten-1 text-center py-2 d-flex flex-column footer"
  >
    <div>
      <v-btn
        v-for="icon in socialIcons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="text"
      ></v-btn>
    </div>
    <div>
    {{moment(now).format("dddd, MMMM Do YYYY, h:mm:ss a")}} — <strong>An1m5</strong>
    </div>
  </footer>
</template>
<style>
.footer {
  position: sticky;
  top: 100%;
}
</style>
