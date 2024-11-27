import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "@/main";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";
import { signInMethod } from "@/constants/auth";
const { updateUserData, updateCredentialToken,updateSignInMethod } = useAuthStore();
export default function useSignInWithThirdParty() {
  const auth = getAuth(firebaseApp);
  const router = useRouter()
  const signInWithThirdParty = async (provider: any) => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.providerId === "google.com") {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        if (user) updateUserData(user);
        if (token) updateCredentialToken(token);
      }
      updateSignInMethod(signInMethod.thirdParty);
      router.push({ name: "Home"})
    } catch (error: any) {
      if (provider === "google.com") {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      }
    }
  };
  return {
    signInWithThirdParty,
  };
}
