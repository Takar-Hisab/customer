<script setup lang="ts">
  
definePageMeta({
  middleware: ['auth']
})
const isOpen = ref(false);
const items = [
  [
    {
      slot: 'view',
    },  
    {
      slot: 'edit',
    }
  ],
  [{
    slot: 'delete',
  }]
]
//add service
const state = reactive({
  name:undefined,
  position:undefined,
});

const onSubmit = async () => {
  await execute();
  refresh()
  isOpen.value = false
  if(data.value){
    toast.add({ title: "Data Save Successfully Done..." });
    isOpen.value = false;
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
        headers: {
          authorization: `Bearer ${useTokenStore().customer_token}`
        }
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
      headers: {
        authorization: `Bearer ${useTokenStore().customer_token}`
      }
    }));

    //edit Service
    const isEdit = ref(false);
    const editState = reactive({
      id:undefined,
      name:undefined,
      position:undefined
    });

    const editService = (service: object) => {
      isEdit.value = true;
      editState.id = service?.id;
      editState.name = service?.name;
      editState.position = service?.position;
    }

    const onUpdate = async (id) => {
        await $fetch(`/service/${id}`, {
            baseURL: useRuntimeConfig().public?.baseUrl,
            method: "PATCH",
            body:editState,
            headers: {
              authorization: `Bearer ${useTokenStore().customer_token}`
            }
        });
        isEdit.value = false
        refresh()
      }

    //delete Service
    const deleteService = async (id) => {
      await $fetch(`/service/${id}`, {
              baseURL: useRuntimeConfig().public?.baseUrl,
              method: "DELETE",
              headers:{
                authorization: `Bearer ${useTokenStore().customer_token}`
              }
            });
            refresh()
      }

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
              <template #view="{ item }">
                    <UButton
                      icon="i-heroicons-eye"
                      size="sm"
                      color="primary"
                      variant="outline"
                      label="View"
                      :trailing="false"
                      block
                      :to="`/services/${service.id}`"
                    />
              </template>
              <template #edit="{ item }">
                <UButton
                      icon="i-heroicons-pencil-square"
                      size="sm"
                      color="primary"
                      variant="outline"
                      label="Edit"
                      :trailing="false"
                      block
                      @click="editService(service)"
                    />
              </template>
              <template #delete="{ item }">
                <UButton
                      icon="i-heroicons-trash"
                      size="sm"
                      color="primary"
                      variant="outline"
                      label="Delete"
                      :trailing="false"
                      @click="deleteService(service?.id)"
                      block
                    />
              </template>
            </UDropdown>
          </div>
          <NuxtLink :to='`/services/${service?.id}`' class="mt-2 mb-8 text-lg block">{{service?.name}}</NuxtLink>
          <span class="bg-primary-50 py-1 px-3 rounded-full inline-block text-primary-900 text-sm">Position: {{service?.position}}</span>
        </div>
      </div>
    </div>
  </div>

<!-- Add Service -->
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

  <!-- Edit Category -->
  <USlideover v-model="isEdit" >
    <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Edit Service
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isEdit = false" />
        </div>
      </template>

      <UForm :state="editState" @submit="onUpdate(editState.id)">
        <UFormGroup label="Name" class="mb-5">
          <UInput placeholder="Service Name" color="primary" size="lg" v-model="editState.name"  />
        </UFormGroup>
        <UFormGroup label="Position">
          <UInput placeholder="Service Position" color="primary" size="lg" v-model="editState.position" />
        </UFormGroup>
        <div class="flex items-center gap-3 mt-5">
          <UButton
              size="lg"
              color="primary"
              variant="solid"
              label="Save Change"
              type="submit"
          />
          <UButton
              size="lg"
              color="primary"
              variant="outline"
              label="Cancel"
              type="reset"
              @click="isEdit = false"
          />
        </div>
      </UForm>
    </UCard>
  </USlideover>
</template>