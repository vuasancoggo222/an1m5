<script setup lang="ts">
import BaseInput from '@/components/input/BaseInput.vue';
import AuthCard from '@/components/card/AuthCard.vue';
import { reactive } from 'vue';
import SigninOptions from '@/components/SigninOptions.vue'

const signupParams = reactive({
    username : "",
    email : "",
    password : ""
})

</script>

<template>
     <AuthCard customClass="sign-up-card" title="Sign up" description="Let's start becoming An1m5 member.">
    <BaseInput @input-value="(value: string) => signupParams.username = value" class="my-6" type="text" :height="50" placeholder="Your Name"/>
    <BaseInput @input-value="(value: string) => signupParams.email = value" class="my-6" type="text" :height="50" placeholder="Your Email"/>
    <BaseInput @input-value="(value: string) => signupParams.password = value" class="my-6" type="password" :height="50" placeholder="Your Password"/>
    <v-btn class="mb-4" color="success">Sign up</v-btn>
    <SigninOptions class="mb-4"/>
    <span>Already have account? <router-link to="/sign-in">Sign in</router-link></span>
 </AuthCard>
  

</template>

<style>
.sign-up-card {
    border-radius: 12px;
    width: 350px;
    padding: 20px;
    min-width: 300px;
    margin: 30px auto;
    height: 580px;
    text-align: center;
}
</style>