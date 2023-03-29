import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useAuth } from '@vueuse/firebase/useAuth'
import {firebaseApp} from '@/main'


export default function useSignInWithThirdParty (){
    const auth = getAuth(firebaseApp);
    const { isAuthenticated, user } = useAuth(auth)
    const signInWithThirdParty = () => signInWithPopup(auth, new GoogleAuthProvider())
    return {
        isAuthenticated,
        user,
        signInWithThirdParty
    } 
}