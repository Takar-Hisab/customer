<script setup lang="ts">
  const route = useRoute();
  const isOpen = ref(false);

  //add Package
  const state = reactive({
    name:null,
    position:null,
    price:null,
    description:null,
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
        return await $fetch(`/package`, {
          baseURL: useRuntimeConfig().public?.baseUrl,
          method: "POST",
          body:state,
        });
      },
      {
        immediate: false,
      }
  );


  const { data: service, error, pending, refresh } = useLazyAsyncData(
      'service',
      () => $fetch( `/service/${route.params.slug}`, {
        method: 'GET',
        baseURL: useRuntimeConfig().public.baseUrl,
      }));

  onMounted(() => {
    console.log(service);
    refresh()
  })
</script>
<template>

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
          class="hidden lg:flex"
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
    <div class="w-full lg:w-1/3 mb-5 lg:px-3" v-for="packages in service?.packages?.data">
      <div class="bg-white rounded-xl  shadow-md shadow-gray-200 border border-primary-300 p-4  text-center">
        <Heading>{{ packages?.price}}</Heading>
        <Heading>{{ packages?.name }}</Heading>
        <p class="text-center py-5">
          {{packages?.description}}
        </p>
        <Text>Position: {{ packages?.position}}</Text>
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
        <UFormGroup label="Price" class="mb-5">
          <UInput placeholder="Package Price" color="primary" size="lg" v-model="state.price"  />
        </UFormGroup>
        <UFormGroup label="Position" class="mb-5">
          <UInput placeholder="Package Position" color="primary" size="lg" v-model="state.position" />
        </UFormGroup>
        <UFormGroup label="Description">
          <UTextarea color="primary" variant="outline" :rows="8" placeholder="Package Description" />
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