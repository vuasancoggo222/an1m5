<script setup lang="ts">
import { GoogleAuthProvider,FacebookAuthProvider } from '@firebase/auth';
import useSignInWithThirdParty from '@/uses/useSignInWithThirdParty';
const {signInWithThirdParty} = useSignInWithThirdParty()
</script>

<template>
 <div>
        <div class="mb-4">Or sign in with</div> 
        <v-btn color="error" class="mx-2" @click="signInWithThirdParty(new GoogleAuthProvider())">Google</v-btn>
        <v-btn color="primary" class="mx-2" @click="signInWithThirdParty(new FacebookAuthProvider())">Facebook</v-btn>   
    </div>

</template>