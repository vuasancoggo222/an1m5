<script setup lang="ts">
import useRedirectRouter from "@/uses/useRedirectRouter";
import useSignOut from "@/uses/useSignOut";
const { redirectRouter } = useRedirectRouter();
const { doSignOut } = useSignOut();
const props = defineProps({
  dropdownItems: {
    type: Array,
  },
  width: {
    type: Number,
  },
  activeColor: {
    type: String,
  },
});
const { dropdownItems } = props;
const clickDropDown = async (value : string) => {
  if(value === "/log-out"){
    await doSignOut()
  }
  else redirectRouter(value)
}
</script>

<template>
  <v-card
    style="margin-top: 10px; border-radius: 10px"
    class="mx-auto"
    :width="width"
  >
    <v-list>
      <v-list-item
        v-for="(item) in dropdownItems as any"
        @click="clickDropDown(item.value)"
        :key="item.value"
        :value="item"
        :color="activeColor"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title
          style="font-size: 12px"
          v-text="item.title"
        ></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<style>
.empty-card {
  border: 1px solid #cbc0c0 !important;
  border-radius: 18px !important;
}
.empty-card .v-card-text {
  display: flex;
  justify-content: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  line-height: 20px;
}
</style>
