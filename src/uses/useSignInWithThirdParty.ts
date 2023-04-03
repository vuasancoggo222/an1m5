import { getAuth, signInWithPopup } from 'firebase/auth'
import {firebaseApp} from '@/main'
export default function useSignInWithThirdParty (){
    const auth = getAuth(firebaseApp);
   
    const signInWithThirdParty = (provider : any) => {
        signInWithPopup(auth, provider)
        
    }
    return {
        signInWithThirdParty
    } 
}