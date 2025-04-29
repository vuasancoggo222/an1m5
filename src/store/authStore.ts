import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<[]>([]);
    const credentialToken = ref<string>("");
    const signedInMethod = ref<number|null>()
    const updateUserData = (value: any) => {
      user.value = value;
    };
    const updateCredentialToken = (value: string) => {
      credentialToken.value = value;
    };
    const updateSignInMethod = (value: number) => {
      signedInMethod.value = value;
    };
    return {
      signedInMethod,
      user,
      credentialToken,
      updateUserData,
      updateCredentialToken,
      updateSignInMethod,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ["user", "credentialToken","signedInMethod"],
    },
  }
);
