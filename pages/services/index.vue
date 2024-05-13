<script setup lang="ts">

const items = [
  [
    {
      label: 'View',
      icon: 'i-heroicons-eye',
      shortcuts: ['V'],
        click: () => {
          console.log('Edit')
        }
    },  
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      shortcuts: ['E'],
        click: () => {
          console.log('Edit')
        }
    }
  ],
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    shortcuts: ['⌘', 'D']
  }]
]

  const { data: services, pending, refresh } = await useLazyAsyncData(
      'services',
      () => ($fetch as any)(`/services`, {
      baseURL: useRuntimeConfig().public?.baseUrl,
      credentials: 'include',
  }));

onMounted(() => {
  refresh();
});
</script>

<template>
    <!-- BreadCrumb -->
    <Breadcrumb page="Services" icon="i-heroicons-cog-8-tooth" />
    <!-- BreadCrumb End -->

    <!--  Back Button  -->
    <BackButton />
    <!--  Back Button End  -->


  <div>
    <div class="flex items-center justify-between  pt-4 pb-8">
      <Heading>Services</Heading>
      <div class="flex items-center gap-3">
        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="md"
          color="primary"
          :trailing="false"
          placeholder="Search..."
        />

        <UButton
          class="hidden lg:flex"
          icon="i-heroicons-plus"
          size="md"
          color="primary"
          variant="solid"
          label="Add Service"
          :trailing="false"
        />
      </div>
    </div>
    
    <div class="flex flex-wrap lg:-mx-3">
      <div class="w-full lg:w-1/4 lg:px-3 mb-4" v-for="(service, index) in services?.data" :key="index">
        <div class="bg-white shadow-lg rounded-xl p-6 relative">
          <div class="absolute top-2 right-2">
            <UDropdown :items="items" :popper="{ placement: 'left-start' }" :ui="{'ring' : 'ring-primary'}">
              <UButton color="primary" variant="soft" trailing-icon="i-heroicons-sparkles" :ui="{'rounded' : 'rounded-full'}" />
            </UDropdown>
          </div>
          <NuxtLink to='/services/slug' class="mt-2 mb-8 text-lg block">{{service?.name}}</NuxtLink>
          <span class="bg-primary-50 py-1 px-3 rounded-full inline-block text-primary-900 text-sm">Position: {{service?.position}}</span>
        </div>
      </div>
    </div>
  </div>
</template>