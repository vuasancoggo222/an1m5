<script setup lang="ts">
import { GoogleAuthProvider,FacebookAuthProvider } from '@firebase/auth';
import useSignInWithThirdParty from '@/uses/useSignInWithThirdParty';
const {signInWithThirdParty} = useSignInWithThirdParty()
const facebookProvider = new FacebookAuthProvider()
const googleProvider = new GoogleAuthProvider()
</script>

<template>
 <div>
        <div class="mb-4">Or sign in with</div> 
        <v-btn color="error" class="mx-2" @click="signInWithThirdParty(googleProvider)">Google</v-btn>
        <v-btn color="primary" class="mx-2" @click="signInWithThirdParty(facebookProvider)">Facebook</v-btn>   
    </div>

</template>