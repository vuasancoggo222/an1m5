import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "@/main";
import { useAuthStore } from "@/store/authStore";
const {updateUserData,updateCredentialToken} = useAuthStore()
export default function useSignInWithThirdParty() {
  const auth = getAuth(firebaseApp);

  const signInWithThirdParty = async (provider: any) => {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        if (user) updateUserData(user)
        if (token) updateCredentialToken(token)
    } catch (error:any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };
  return {
    signInWithThirdParty,
  };
}
