import { getAuth, signOut } from "firebase/auth";
import { useAuthStore } from "@/store/authStore";
import { signInMethod } from "@/constants/auth";
export default function useSignOut() {
  const { updateUserData, signedInMethod } = useAuthStore();
  const doSignOut = async () => {
    try {
      if (signedInMethod === signInMethod.thirdParty) {
        const auth = getAuth();
        await signOut(auth);
        updateUserData([]);
      }
      localStorage.removeItem("auth");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    doSignOut,
  };
}
