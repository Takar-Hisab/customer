<script setup>
definePageMeta({
  middleware: ['auth']
})
</script>
<template>
  <div>
    <Breadcrumb page="Plans" icon="i-heroicons-rocket-launch" />
    <!--  Back Button  -->
    <BackButton />
    <!--  Back Button End  -->

    <div class="flex items-center gap-5 justify-center flex-wrap py-5 lg:y-8">
      <div class="w-full lg:w-1/4">
        <GlassCard class="w-full px-5 py-10 rounded-2xl shadow-gray-300 text-center">
          <h3 class="text-2xl font-medium text-white">Free</h3>
          <h2 class="text-6xl font-semibold py-5 text-white">000 <span class="text-sm text-primary font-light">/Month</span></h2>
          <ul class="flex flex-col gap-3 py-5 pl-5">
            <li class="flex items-center gap-3" v-for="link in 5">
              <span class="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Icon name="tabler:check" color="white" />
              </span>
              <p class="text-white">List One</p>
            </li>
          </ul>
          <div>
            <UButton size="lg" block :ui="{ rounded: 'rounded-full' }">Purchese Now</UButton>
          </div>
        </GlassCard>
      </div>
      <div class="w-full lg:w-1/4">
        <GlassCard class="bg-primary w-full px-5 py-10 rounded-2xl shadow-primary-400 text-center">
          <h3 class="text-2xl font-medium text-white ">Pro</h3>
          <h2 class="text-6xl font-semibold py-5 text-white">999 <span class="text-sm text-primary font-light">/Month</span></h2>
          <ul class="flex flex-col gap-3 py-5 pl-5">
            <li class="flex items-center gap-3" v-for="link in 10">
              <span class="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Icon name="tabler:check" color="white" />
              </span>
              <p class="text-white">List One</p>
            </li>
          </ul>
          <div>
            <UButton size="lg" block :ui="{ rounded: 'rounded-full' }">Purchese Now</UButton>
          </div>
        </GlassCard>
      </div>
      <div class="w-full lg:w-1/4">
        <GlassCard class="w-full px-5 py-10 rounded-2xl  text-center">
          <h3 class="text-2xl font-medium text-white">Enterprise</h3>
          <h2 class="text-6xl font-semibold py-5 text-white">4950 <span class="text-sm text-primary font-light">/Month</span></h2>
          <ul class="flex flex-col gap-3 py-5 pl-5">
            <li class="flex items-center gap-3" v-for="link in 10">
              <span class="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Icon name="tabler:check" color="white" />
              </span>
              <p class="text-white">List One</p>
            </li>
          </ul>
          <div>
            <UButton size="lg" block :ui="{ rounded: 'rounded-full' }">Purchese Now</UButton>
          </div>
        </GlassCard>
      </div>
    </div>
  </div>
</template>