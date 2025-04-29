<script setup lang="ts">
import { useAuthStore } from "@/store/authStore";
import type { User } from 'firebase/auth';
const authStore = useAuthStore();
const user = authStore.user as unknown as User;

</script>

<template>
  <div class="account-information">
    <div>
      <h1>Account Information</h1>
      <div class="user-details" v-if="user">
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Username:</strong> {{ user.displayName }}</p>
        <p><strong>User ID:</strong> {{ user.uid }}</p>
        
      </div>
      <div v-else>
        <p>No user information available</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
