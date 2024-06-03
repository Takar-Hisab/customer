<script setup>
definePageMeta({
  middleware: ['auth']
})


// Data
const { data: plans, pending, refresh } = await useLazyAsyncData('plans', () => $fetch('/plans', {
  baseURL:useRuntimeConfig().public.baseUrl,
  headers:{
    Authorization: `Bearer ${useTokenStore().customer_token}`
  }
}))



// my plan
const { data: custoemr, refresh:myPlanRef } = await useLazyAsyncData('active-plan', () => $fetch('/active-plan', {
  baseURL:useRuntimeConfig().public.baseUrl,
  headers:{
    Authorization: `Bearer ${useTokenStore().customer_token}`
  }
}))






</script>
<template>
  <div>
    <Breadcrumb page="Plans" icon="i-heroicons-rocket-launch" />
    <!--  Back Button  -->
    <BackButton />
    <!--  Back Button End  -->



    <div>
      <UCard>
        <h2 class="text-lg font-semibold mb-5">Active Plan Details</h2>
        <div class="flex gap-5 flex-col">
          <div>
            <p>Plan Registration Date</p>
            <UBadge>{{ custoemr?.plan_reg_date }}</UBadge>
          </div>

          <div>
            <p>Plan Expire Date</p>
            <UBadge>{{ custoemr?.plan_exp_date }}</UBadge>
          </div>
        </div>

      </UCard>
    </div>




    <div class="grid grid-cols-12 gap-6 mt-10">
      <div class="col-span-4" v-for="plan in plans">
        <div v-if="plan.id === custoemr?.plan?.id" class="w-full px-5 py-10 rounded-2xl bg-slate-800 shadow-2xl shadow-primary-400 text-center text-white">
          <h3 class="text-2xl font-medium text-white ">{{ plan?.name }}</h3>
          <h2 class="text-6xl font-semibold py-5 text-white">{{ plan?.price }} <span class="text-sm text-primary font-light">/{{ plan?.duration }}</span></h2>
          <div class="flex gap-2 items-center">
            <!--            <Icon name="i-solar-close-circle-outline" class="text-red-500" size="35" v-if="i%2"/>-->
            <Icon name="i-solar-check-circle-outline" class="text-primary-500"  size="35"/>
            <p class="font-semibold text-xl">Up To <span class="text-primary-400 fw-bolder underline">{{ plan?.max_users }}</span> Invoice Customers Over This Time</p>
          </div>


          <div class="flex gap-2 items-center">
            <!--            <Icon name="i-solar-close-circle-outline" class="text-red-500" size="35" v-if="i%2"/>-->
            <Icon name="i-solar-check-circle-outline" class="text-primary-500"  size="35"/>
            <p class="font-semibold text-xl">Can Added Daily Up To <span class="text-primary-400 fw-bolder underline">{{ plan?.max_products }}</span> New Products</p>
          </div>


          <div class="flex gap-2 items-center">
            <!--            <Icon name="i-solar-close-circle-outline" class="text-red-500" size="35" v-if="i%2"/>-->
            <Icon name="i-solar-check-circle-outline" class="text-primary-500"  size="35"/>
            <p class="font-semibold text-xl">You Can Used <span class="text-primary-400 fw-bolder underline">{{ plan?.storage_limit }} </span> MB Storage Over This Time</p>
          </div>

          <div class="flex gap-2 items-center">
            <Icon name="i-solar-close-circle-outline" class="text-red-500" size="35"/>
            <!--            <Icon name="i-solar-check-circle-outline" class="text-primary-500"  size="35"/>-->
            <p class="font-semibold text-xl">Up To <span class="text-primary-400 fw-bolder underline">{{ plan?.duration }}</span> Year Access</p>
          </div>

          <div class="mt-3">
            <UButton size="lg" block :ui="{ rounded: 'rounded-full' }">Renew Plan</UButton>
          </div>
        </div>
        <div v-else class="w-full px-5 py-10 rounded-2xl shadow-gray-300 bg-white shadow-2xl text-center">
          <h3 class="text-2xl font-medium text-black ">{{ plan?.name }}</h3>
          <h2 class="text-6xl font-semibold py-5 text-black">{{ plan?.price }} <span class="text-sm text-primary font-light">{{ plan?.duration }}/Month</span></h2>
          <div class="flex gap-2 items-center">
            <!--            <Icon name="i-solar-close-circle-outline" class="text-red-500" size="35" v-if="i%2"/>-->
            <Icon name="i-solar-check-circle-outline" class="text-primary-500"  size="35"/>
            <p class="font-semibold text-xl">Up To <span class="text-primary-400 fw-bolder underline">{{ plan?.max_users }}</span> Invoice Customers Over This Time</p>
          </div>


          <div class="flex gap-2 items-center">
            <!--            <Icon name="i-solar-close-circle-outline" class="text-red-500" size="35" v-if="i%2"/>-->
            <Icon name="i-solar-check-circle-outline" class="text-primary-500"  size="35"/>
            <p class="font-semibold text-xl">Can Added Daily Up To <span class="text-primary-400 fw-bolder underline">{{ plan?.max_products }}</span> New Products</p>
          </div>


          <div class="flex gap-2 items-center">
            <!--            <Icon name="i-solar-close-circle-outline" class="text-red-500" size="35" v-if="i%2"/>-->
            <Icon name="i-solar-check-circle-outline" class="text-primary-500"  size="35"/>
            <p class="font-semibold text-xl">You Can Used <span class="text-primary-400 fw-bolder underline">{{ plan?.storage_limit }} </span> MB Storage Over This Time</p>
          </div>

          <div class="flex gap-2 items-center">
            <Icon name="i-solar-close-circle-outline" class="text-red-500" size="35"/>
            <!--            <Icon name="i-solar-check-circle-outline" class="text-primary-500"  size="35"/>-->
            <p class="font-semibold text-xl">Up To <span class="text-primary-400 fw-bolder underline">{{ plan?.duration }}</span> Year Access</p>
          </div>

          <div class="mt-3">
            <UButton size="lg" block :ui="{ rounded: 'rounded-full' }">Purchase Now</UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>