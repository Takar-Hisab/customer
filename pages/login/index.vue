<template>
  <div class="grid place-items-center min-h-screen">
    <GlassCard class="w-[30%] p-5 min-h-52 dark:bg-gray-900 dark:border-gray-800 rounded-xl">
      <div class="flex items-center flex-col mt-10 gap-3">
        <Icon name="i-ion-lock-closed-outline" class="dark:text-white" size="50"/>
        <h1 class="text-4xl dark:text-white font-semibold">Welcome Back</h1>
        <p class="text-xl dark:text-slate-300 opacity-75 font-semibold">Don't have an account? <NuxtLink to="#" class="text-primary-500">Sign up</NuxtLink></p>
      </div>
      <div class="mt-8">
        <UForm ref="form" :state="state" class="space-y-4" @submit="onSubmit">
          <div  class="mb-8">
            <label class="text-white font-medium text-xl mb-2">Email</label>
            <UInput type="email" class="border-none" size="lg"
                    v-model="state.email"
                    inputClass="disabled:bg-primary-100"
                    :disabled="pending"
                    placeholder="Enter Your Email"/>
            <small class="text-red-500" v-if="errors?.errors?.email">{{ errors?.errors?.email?.[0] }}</small>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-white font-medium  text-xl">Password</label>
              <NuxtLink to="#" class="text-primary-500  font-semibold text-lg">Forgot password?</NuxtLink>
            </div>

            <UInput type="password" class="border-none"
                    :disabled="pending"
                    inputClass="disabled:bg-primary-100"
                    size="lg" v-model="state.password" placeholder="Enter Your Password"/>
            <small class="text-red-500" v-if="errors?.errors?.password">{{ errors?.errors?.password?.[0] }}</small>

            <UButton type="submit" :loading="pending"  class="mt-5 font-semibold text-lg" size="md" block>Continue</UButton>
          </div>

          <div class="flex items-center justify-between">
            <span class="h-1 border-b border-slate-200 w-full"></span>
            <span class="mx-3">or</span>
            <span class="h-1 border-b border-slate-200 w-full"></span>
          </div>

          <div>
            <UButton
                class="mt-5 text-xl"
                variant="outline"
                type="submit"
                color="gray"
                size="md" block>
              <Icon class="text-white" name="i-mdi-github" size="30"/>
              Continue with GitHub
            </UButton>
          </div>
          <p class="font-semibold text-lg">By signing in, you agree to our <NuxtLink  class="text-primary-500">Terms of Service.</NuxtLink></p>
        </UForm>
      </div>
    </GlassCard>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import {Schema} from "zod";

definePageMeta({
  layout: false,
  middleware: ['guest']
})

const { setToken, setAuthUser } = useTokenStore();
const toast = useToast();
const form = ref()
const state = reactive({
  email: 'customer@customer.com',//undefined,
  password: '12345678',//undefined,
  remember: false
})


const {login, fetchUser} = useAuthStore();
const pending = ref(false)
const errors = ref({})

const onSubmit = async () => {
  pending.value = true;
  const {data, error} = await login(state)
  errors.value = error?.value?.data
  if(error?.value){
    toast.add({
      description:error?.value?.message,
      color:"red"
    })
  }
  if (!error.value){
    setToken(data.value)
    const userData = await fetchUser();
    setAuthUser(userData?.data?.value)
    toast.add({
      description:"Login Successfully Done...",
    })
    if(userData?.data?.value){
      return navigateTo('/dashboard')
    }
  }
  pending.value = false;
}

</script>