import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<[]>([]);
    const credentialToken = ref<string>("");
    const updateUserData = (value: any) => {
      user.value = value;
    };
    const updateCredentialToken = (value: string) => {
      credentialToken.value = value;
    };
    return {
      user,
      credentialToken,
      updateUserData,
      updateCredentialToken,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ["user", "credentialToken"],
    },
  }
);
