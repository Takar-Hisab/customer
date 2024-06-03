<script setup lang="ts">


const items = [
  [
    {
      slot: 'edit',
    }
  ],
  [{
    slot: 'delete',
  }]
]

definePageMeta({
  middleware: ['auth']
})
  const route = useRoute();
  const isOpen = ref(false);

  //add Package
  const state = reactive({
    service_id:route.params.slug,
    name:undefined,
    price:undefined,
    position:undefined,
    description:undefined,
    Sku:undefined,
  });

  const onSubmit = async () => {
    await execute();
    refresh()
    isOpen.value = false
    if(data.value){
      toast.add({ title: "Data Save Successfully Done..." })
      refresh()
      isOpen.value = false
    }
    if(error.value){
      toast.add({ title:error.value.data.message, color:"red" })
    }
  };
  const {data, status, execute} = useAsyncData(
      async () => {
        return await $fetch(`/service-package`, {
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

//get Pckage
  const { data: service, error, pending, refresh } = useLazyAsyncData(
      'service',
      () => $fetch( `/service/${route.params.slug}`, {
        method: 'GET',
        baseURL: useRuntimeConfig().public.baseUrl,
        headers: {
          authorization: `Bearer ${useTokenStore().customer_token}`
        }
      }));

      interface editType {
        id: Number,
        service_id: string|undefined,
        name:string|undefined,
        price:Number|undefined,
        position:Number|undefined,
        description:String|undefined
      }

      //edit package
      const isEdit = ref(false);
      const editState = reactive<editType>({
        id:0,
        service_id:route.params.slug as string,
        name:undefined,
        price:undefined,
        position:undefined,
        description:undefined,
      });

      const editPackage = (data: editType) => {
        isEdit.value = true;
        editState.id = data?.id;
        editState.name = data?.name;
        editState.price = data?.price;
        editState.position = data?.position;
        editState.description = data?.description as String;
      }

      const onUpdate = async (id: any) => {
          await $fetch(`/service-package/${id}`, {
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

      //delete Package
    const deletePackage = async (id: any) => {
      await $fetch(`/service-package/${id}`, {
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
  <Breadcrumb :page="`${service?.name} Packages`" icon="i-heroicons-cog-8-tooth" />
  <!-- BreadCrumb End -->

  <!--  Back Button  -->
  <BackButton />
  <!--  Back Button End  -->

  <div class="flex items-center justify-between  pt-4 pb-8">
    <Heading>{{service?.name}} Packages</Heading>
    <div class="flex items-center gap-3">
      <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="md"
          color="primary"
          :trailing="false"
          placeholder="Search..."
      />

      <UButton
          class="hidden lg:flex "
          icon="i-heroicons-plus"
          size="md"
          color="primary"
          variant="solid"
          label="Add Package"
          :trailing="false"
          @click="isOpen = true"
      />
    </div>
  </div>

  <div class="flex flex-wrap lg:-px-3">
    <div class="w-full lg:w-1/3 mb-5 lg:px-3" v-for="data in service?.packages?.data">
      <div class="bg-white  rounded-xl  shadow-md shadow-gray-200 border border-primary-300 p-4  text-center relative">
        <div class="absolute top-2 right-2">
            <UDropdown :items="items" :popper="{ placement: 'left-start' }" :ui="{'ring' : 'ring-primary'}">
              <UButton color="primary" variant="soft" trailing-icon="i-heroicons-sparkles" :ui="{'rounded' : 'rounded-full'}" />
              <template #edit="{ item }">
                <UButton
                      icon="i-heroicons-pencil-square"
                      size="sm"
                      color="primary"
                      variant="outline"
                      label="Edit"
                      :trailing="false"
                      block
                      @click="editPackage(data)"
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
                      @click="deletePackage(data?.id)"
                      block
                    />
              </template>
            </UDropdown>
          </div>
        <Heading>{{ data?.price}}</Heading>
        <Heading>{{ data?.name }}</Heading>
        <p class="text-center py-5">
          {{data?.description}}
        </p>
        <Text>Position: {{ data?.position}}</Text>
      </div>
    </div>
  </div>


  <USlideover v-model="isOpen" >
    <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Add New Package
          </h3>
          <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false" />
        </div>
      </template>

      <UForm :state="state" @submit="onSubmit">
        <UFormGroup label="Name" class="mb-5">
          <UInput placeholder="Package Name" color="primary" size="lg" v-model="state.name"  />
        </UFormGroup>
        <div class="flex">
          <UFormGroup label="Price" class="mb-5 w-1/2 lg:pr-1">
            <UInput placeholder="Package Price" color="primary" size="lg" v-model="state.price"  />
          </UFormGroup>
          <UFormGroup label="SKU" class="mb-5 w-1/2 lg:pl-1">
            <UInput placeholder="Package SKU" color="primary" size="lg" v-model="state.sku"  />
          </UFormGroup>
        </div>
        <UFormGroup label="Position" class="mb-5">
          <UInput placeholder="Package Position" color="primary" size="lg" v-model="state.position" />
        </UFormGroup>
        <UFormGroup label="Description">
          <UTextarea color="primary" v-model="state.description" variant="outline" :rows="8"  placeholder="Package Description" />
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



  <!-- Edit Package -->
  <USlideover v-model="isEdit" >
    <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Edit Package
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isEdit = false" />
        </div>
      </template>

      <UForm :state="editState" @submit="onUpdate(editState.id)">
        <UFormGroup label="Name" class="mb-5">
          <UInput placeholder="Package Name" color="primary" size="lg" v-model="editState.name"  />
        </UFormGroup>
        <UFormGroup label="Price" class="mb-5">
          <UInput placeholder="Package Price" color="primary" size="lg" v-model="editState.price"  />
        </UFormGroup>
        <UFormGroup label="Position" class="mb-5">
          <UInput placeholder="Package Position" color="primary" size="lg" v-model="editState.position" />
        </UFormGroup>
        <UFormGroup label="Description" class="mb-5">
          <UTextarea :rows="5" color="primary"  v-model="editState.description" aria-placeholder="" />
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