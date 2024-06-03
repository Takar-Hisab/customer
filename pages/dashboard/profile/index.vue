<script setup lang="ts">
  definePageMeta({
  middleware: ['auth']
})


  // my plan
  const { data: user, refresh:customerRefresh } = await useLazyAsyncData('profile', () => $fetch('/my-profile', {
    baseURL:useRuntimeConfig().public.baseUrl,
    headers:{
      Authorization: `Bearer ${useTokenStore().customer_token}`
    }
  }))

  onMounted(()=>{
    customerRefresh()
  })

</script>
<template>
  <Breadcrumb page="profile" icon="i-heroicons-user" />
  <BackButton />
  <div class="p-4 rounded-2xl shadow-lg">
    <Heading>Profile</Heading>
  </div>


  <div class="mt-10">
    <div class="grid grid-cols-12 gap-4 min-h-52">
      <div class="col-span-3 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
        <div class="w-full flex items-center justify-center flex-col mt-4">
          <UAvatar
              chip-color="primary"
              chip-text=""
              chip-position="top-right"
              size="3xl"
              class="ring-2 ring-primary-400 ring-offset-2"
              :src="user?.avatar"
              alt="Avatar"
          />
          <div class="mt-4">
            <div class="flex gap-5">
              <h2 class="font-bold text-2xl">{{ user?.name }}</h2>
              <UTooltip text="Current Role"
                        :style="{background:'bg-red'}"
                        :popper="{ arrow: true, placement:'top' }">
                <UBadge color="primary" variant="solid" size="sm">{{ user?.type }}</UBadge>
              </UTooltip>
            </div>
          </div>
        </div>
        <div class="flex flex-col mt-3">
          <span class="font-semibold">{{ user?.email }}</span>
          <span class="font-semibold">{{ user?.phone }}</span>
        </div>
      </div>
      <div class="col-span-4 bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
        <p class="font-semibold text-xl border-b pb-2">Active Plan</p>
        <div v-if="user?.customer?.plan" class="flex flex-col gap-5">
          <div class="flex gap-3 mt-3">
            <p class="font-semibold text-lg">Plan:</p>
            <p class="font-semibold text-lg text-blue-500 underline">
              <NuxtLink to="#">{{ user?.customer?.plan?.name }}</NuxtLink>
              <Icon name="i-bitcoin-icons-export-filled" size="30"/>
            </p>
          </div>
          <div>
            <!--            <div>-->
            <!--              <p class="font-semibold text-lg">Total Duration: </p>-->
            <!--              <p class="font-semibold text-lg">Avtive Months:<UBadge>{{ activeMounts }}</UBadge></p>-->
            <!--            </div>-->

            <div>
              <p class="font-semibold text-lg">Reg Date: <UBadge>{{ $dayjs(user?.customer?.plan_reg_date)?.format("DD-MMM-YYYY") }}</UBadge></p>
              <p class="font-semibold text-lg">Exp Date:   <UBadge>{{ $dayjs(user?.customer?.plan_exp_date)?.format("DD-MMM-YYYY")}}</UBadge></p>
            </div>

          </div>
        </div>
        <div v-else class="grid place-items-center h-full">
          <div class="flex-col flex items-center gap-2">
            <Icon name="i-codicon-empty-window" size="45"/>
            <p class="font-semibold">No have active plan</p>
            <NuxtLink class="font-semibold text-primary underline">Assign Plan</NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-span-5 bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
        <p class="font-semibold text-xl border-b pb-2">Store Information</p>
        <div v-if="user?.store" class="mt-3">

          <div class="flex gap-3 items-center">
            <p class="font-semibold text-lg">Store Name:</p>
            <p class="font-semibold text-lg">{{ user?.store?.name }}</p>
          </div>

          <div class="flex gap-3 items-center">
            <p class="font-semibold text-lg">Store Email:</p>
            <p class="font-semibold text-lg">{{ user?.store?.email }}</p>
          </div>

          <div class="flex gap-3 items-center">
            <p class="font-semibold text-lg">Store Name:</p>
            <p class="font-semibold text-lg">{{ user?.store?.phone }}</p>
          </div>
          <NuxtLink class="font-semibold text-primary underline mt-8">Explore</NuxtLink>

        </div>

        <div v-else class="grid place-items-center h-full">
          <div class="flex-col flex items-center gap-2">
            <Icon name="i-bi-house-x" size="45"/>
            <p>Store Not Exist</p>
            <UButton variant="soft" to="/setup/store">Add Store</UButton>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>