<script setup lang="ts">
  definePageMeta({
  middleware: ['auth']
})
  const toast = useToast();
  const isFilter = ref(false);

  const isProductCreate = ref(false)
  const form = ref({
    price:0,
    category:null,
    brand:null
  })

  // Create Product
  const state = reactive<any>({
    sku:null,
    price:null,
  });


  const onSubmit = async () => {
    await execute();

    if(data.value){
      await refresh()
      toast.add({ title: "Data Save Successfully Done..." });
      isProductCreate.value = false as boolean;
    }
    if(error.value){
      toast.add({
        title:error?.value?.data?.message as string,
        color:"red"
      })
    }
  };
  const {data, status, execute} = useAsyncData(
      async () => {
        return await $fetch(`/product`, {
          baseURL: useRuntimeConfig().public?.baseUrl,
          method: "POST",
          body:state,
          headers:{
            authorization: `Bearer ${useTokenStore().customer_token}`
          }
        });
      },
      {
        immediate: false,
      }
  );

  //Get Products

  const page = ref(1)
  const pageCount = ref(10)
  // const { data: products, error, pending, refresh } = useLazyAsyncData(
  //   'products',
  //   () => $fetch( `/product`, {
  //     method: 'GET',
  //     baseURL: useRuntimeConfig().public.baseUrl,
  //     headers:{
  //       authorization: `Bearer ${useTokenStore().customer_token}`
  //     }
  //   }),{
  //     watch: [page]
  //     });


  const { data: products, pending, error, refresh } = await useLazyAsyncData('products', () => $fetch('/product', {
    baseURL: useRuntimeConfig().public.baseUrl,
    headers: {
      accept: "application/json",
      authorization: `Bearer ${useTokenStore().customer_token}`
    },
    query: {
      'page': page.value,
    }
  }),{
    default: () => [],
    watch: [page, pageCount]
  })



onMounted(() => {
  console.log(products.value)
  refresh()
})

//Delete Products
const deleteProduct = async (id: any) => {
  await $fetch(`/product/${id}`, {
          baseURL: useRuntimeConfig().public?.baseUrl,
          method: "DELETE",
          headers:{
            authorization: `Bearer ${useTokenStore().customer_token}`
          }
        });
        await refresh()
  }
</script>
<template>
  <div>

    <!-- BreadCrumb -->
    <Breadcrumb page="Products" icon="i-heroicons-archive-box" />
    <!-- BreadCrumb End -->

    <!--  Back Button  -->
    <BackButton />
    <!--  Back Button End  -->

    <!-- Filters -->

    <!-- Filters End -->

    <!-- Products -->
    <div class="">
      <header class="flex items-center justify-between mb-5">
        <div>
          <Heading>Products</Heading>
        </div>
        <div class="flex items-center gap-3">
          <UButton
              icon="i-heroicons-funnel"
              size="sm"
              color="primary"
              square
              variant="solid"
              @click="isFilter = true"
          />
          <UButton
            class="hidden lg:flex"
            icon="i-heroicons-pencil-square"
            size="sm"
            color="primary"
            variant="solid"
            label="Add New"
            :trailing="false"
            @click="isProductCreate = true" 
          />
      </div>
      </header>
      <div :class="{'lg:mr-[500px]' : isFilter}" class="transition-all ease-in-out duration-300">
        <div class="" v-if="pending">
          <p class="text-4xl font-bold text-center py-20 text-primary">Loading</p>
        </div>
        <div class="grid grid-cols-2 gap-3 transition-all ease-in-out duration-700" v-else-if="products != null" :class="{ 'lg:grid-cols-2': isFilter,  'lg:grid-cols-4': !isFilter, }">
          <ProductCard v-for="(product, index) in products?.data" :data="product"  :key="index" @delete="deleteProduct" />
        </div>

        <div v-if="!pending" class="flex justify-between items-center p-5 mt-10 w-full bg-primary-100 dark:bg-slate-700 rounded-b-2xl">
          <div>
          <span class="text-sm leading-5">
            Showing
            <span class="font-medium">{{ products?.meta?.from }}</span>
            to
            <span class="font-medium">{{ products?.meta?.to }}</span>
            of
            <span class="font-medium">{{ products?.meta?.total }}</span>
            results
          </span>
          </div>
          <div class="flex items-center gap-5">
            <UPagination v-model="page" :page-count="products?.meta?.per_page" :total="parseInt(products?.meta?.total)" />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Products End -->
  </div>




  <UModal v-model="isProductCreate">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', 'width': 'max-w-xs' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Create Product
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isProductCreate = false" />
          </div>
        </template>

        <div>
          <UForm  class="space-y-4" :state="state" @submit="onSubmit">
            <UFormGroup label="Price" name="price">
              <UInput size="md" color="primary" v-model="state.price" />
            </UFormGroup>

            <UFormGroup label="Product SKU" name="sku">
              <UInput size="md" color="primary" v-model="state.sku"  />
            </UFormGroup>

            <div class="flex items-center gap-3">
              <UButton type="submit">Save</UButton>
            </div>
            <div class="flex items-center gap-1 justify-center">
              <p>Add product with more detail</p>
              <NuxtLink to="/shop/products/create" class="text-sm text-primary">Click Here</NuxtLink>
            </div>
          </UForm>
        </div>
      </UCard>
    </UModal>


  <div class="fixed top-0 right-0 bottom-0 w-[500px] h-screen bg-white transition-all ease-in-out duration-300" :class="{'translate-x-0' : isFilter, 'translate-x-[500px]' : !isFilter}">
    <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Filter Products
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isFilter = false" />
        </div>
      </template>

      <div class="bg-white   p-3 flex flex-col gap-5 overflow-y-scroll transition-all ease-in-out duration-500 ">
        <div class="w-full mt-8 lg:mt-5">
          <UInput
              icon="i-heroicons-magnifying-glass-20-solid"
              size="md"
              color="primary"
              :trailing="false"
              placeholder="Search..."
              class="w-full"
          />
        </div>
        <div>
          <h3 class="text-xl text-gray-500 mb-4">Price</h3>
          <p class="text-lg font-normal text-gray-800 mb-2">৳ {{ form.price }}</p>
          <URange  :max="5000" v-model="form.price" color="primary" />
        </div>
        <div class="category">
          <h3 class="text-xl text-gray-500 mb-4">Categories</h3>
          <ul class="flex flex-wrap gap-3">
            <li v-for="(catgory, i) in 10" :key="i">
              <input
                  type="radio"
                  :id="`category-${i}`"
                  name="catgory"
                  value = "Category"
                  v-model="form.catgory"
                  hidden>
              <label :for="`category-${i}`" class="px-3 py-1 block rounded-full text-sm bg-gray-200/50 cursor-pointer">Category</label>
            </li>
          </ul>
          <div class="text-center mt-5">
            <button class="rounded-full text-primary inline-flex items-center gap-1">
              Show More <Icon name="ic:round-keyboard-arrow-down" size="28" />
            </button>
          </div>
        </div>
        <div class="brand">
          <h3 class="text-xl text-gray-500 mb-4">Brands</h3>
          <ul class="flex flex-wrap gap-3">
            <li v-for="(catgory, i) in 10" :key="i">
              <input
                  type="radio"
                  :id="`brand-${i}`"
                  name="brand"
                  value="Brand"
                  v-model="form.brand"
                  hidden>
              <label :for="`brand-${i}`" class="px-3 py-1 block rounded-full text-sm bg-gray-200/50 cursor-pointer">Brand</label>
            </li>
          </ul>
          <div class="text-center mt-5">
            <button class="rounded-full text-primary inline-flex items-center gap-1">
              Show More <Icon name="ic:round-keyboard-arrow-down" size="28" />
            </button>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>


