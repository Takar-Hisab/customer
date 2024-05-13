<script setup lang="ts">
const { setToken, setAuthUser } = useTokenStore();

definePageMeta({
  layout: 'auth'
})

const form = ref({
  email: 'aletha08@example.org',
  password: 'password',
  remember: false
})




  const isPending = ref(false)
  const errors = ref(null)

  const {login, fetchUser} = useAuthStore();
  const handelLogin = async () => {
    isPending.value = true;
    const {data, pending, error} = await login(form.value)
    isPending.value = pending.value
    errors.value = error

    if(error?.value) console.log(error?.value.message)

    if (!error.value){
      setToken(data.value)
      const userData = await fetchUser();
      setAuthUser(userData?.data?.value)

      if(userData.data.value.role.includes('Customer')){
        return navigateTo('/dashboard')
      }
    }
    isPending.value = false;

  }
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="max-w-sm w-full bg-white shadow rounded p-5">
      <UForm class="space-y-4" @submit="handelLogin">
        <UFormGroup label="Email" name="email">
          <UInput v-model="form.email" size="lg" color="primary" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="form.password" type="password" size="lg" color="primary" />
        </UFormGroup>

        <UButton type="submit" size="lg">
          Sign In
        </UButton>
      </UForm>
    </div>
  </div>
</template>

