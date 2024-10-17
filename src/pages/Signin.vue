<script setup lang="ts">
import BaseInput from '@/components/input/BaseInput.vue';
import AuthCard from '@/components/card/AuthCard.vue';
import { reactive } from 'vue';
import SignInOptions from '@/components/SignInOptions.vue'
const signInParams = reactive({
    email : "",
    password : ""
})


</script>

<template>
 <AuthCard customClass="sign-in-card" title="Sign in" description="Welcome back to my An1m5 website.">
    <BaseInput @input-value="value => signInParams.email = value" class="my-6" type="text" :height="50" placeholder="Your Email"/>
    <BaseInput @input-value="value => signInParams.password = value" class="my-6" type="password" :height="50" placeholder="Your Password"/>
    <v-btn class="mb-4" color="success">Sign in</v-btn>
    <SignInOptions class="mb-4"/>
    <span>Don't have account ? <router-link to="/sign-up">Sign up</router-link></span>
 </AuthCard>
</template>

<style>
.sign-in-card {
    border-radius: 12px;
    width: 350px;
    padding: 20px;
    min-width: 300px;
    margin: 30px auto;
    height: 500px;
    text-align: center;
}
</style>