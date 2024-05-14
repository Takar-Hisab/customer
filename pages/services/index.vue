<script setup lang="ts">

const isOpen = ref(false)
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
//add service
const state = reactive({
  name:null,
  position:null,
});

const onSubmit = async () => {
  await execute();

  if(data.value){
    toast.add({ title: "Data Save Successfully Done..." })
  }
  if(error.value){
    toast.add({ title:error.value.data.message, color:"red" })
  }
};
const {data, status, execute} = useAsyncData(
    async () => {
      return await $fetch(`/service`, {
        baseURL: useRuntimeConfig().public?.baseUrl,
        method: "POST",
        body:state,
      });
    },
    {
      immediate: false,
    }
);


//Get Services
const { data: services, error, pending, refresh } = useLazyAsyncData(
    'services',
    () => $fetch( `/service`, {
      method: 'GET',
      baseURL: useRuntimeConfig().public.baseUrl,
    }));
onMounted(() => {
  refresh()
})
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
          @click="isOpen = true"
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
          <NuxtLink :to='`/services/${service?.id}`' class="mt-2 mb-8 text-lg block">{{service?.name}}</NuxtLink>
          <span class="bg-primary-50 py-1 px-3 rounded-full inline-block text-primary-900 text-sm">Position: {{service?.position}}</span>
        </div>
      </div>
    </div>
  </div>


  <USlideover v-model="isOpen" >
    <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Add New Service
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
        </div>
      </template>

      <UForm :state="state" @submit="onSubmit">
        <UFormGroup label="Name" class="mb-5">
          <UInput placeholder="Service Name" color="primary" size="lg" v-model="state.name"  />
        </UFormGroup>
        <UFormGroup label="Position">
          <UInput placeholder="Service Position" color="primary" size="lg" v-model="state.position" />
        </UFormGroup>
        <div class="flex items-center gap-3 mt-5">
          <UButton
              size="lg"
              color="primary"
              variant="solid"
              label="Save"
              type="submit"
          />
          <UButton
              size="lg"
              color="primary"
              variant="outline"
              label="Cancel"
              type="reset"
              @click="isOpen = false"
          />
        </div>
      </UForm>
    </UCard>
  </USlideover>
</template>