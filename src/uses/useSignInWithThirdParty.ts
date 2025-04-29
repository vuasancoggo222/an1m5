import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential, AuthError } from "firebase/auth";
import { firebaseApp } from "@/main";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";
import { signInMethod } from "@/constants/auth";

type Provider = GoogleAuthProvider;

export default function useSignInWithThirdParty() {
  const { updateUserData, updateCredentialToken, updateSignInMethod } = useAuthStore();
  const auth = getAuth(firebaseApp);
  const router = useRouter();

  const handleGoogleSignIn = (result: UserCredential) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    if (user) updateUserData(user);
    if (token) updateCredentialToken(token);
  };

  const handleError = (error: AuthError, provider: Provider) => {
    if (provider instanceof GoogleAuthProvider) {
      console.error({
        errorCode: error.code,
        errorMessage: error.message,
        email: error.customData?.email,
        credential: GoogleAuthProvider.credentialFromError(error)
      });
    }
  };

  const signInWithThirdParty = async (provider: Provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      
      if (result.providerId === "google.com") {
        handleGoogleSignIn(result);
      }

      updateSignInMethod(signInMethod.thirdParty);
      router.push({ name: "Home" });
    } catch (error) {
      handleError(error as AuthError, provider);
    }
  };

  return { signInWithThirdParty };
}
