<script setup lang="ts">

const toast = useToast();
definePageMeta({
  middleware: ['auth']
})

  //get Categories
  const { data: categories, refresh: categoryRefresh } = useLazyAsyncData(
      'categories',
      () => $fetch( `/category`, {
        method: 'GET',
        baseURL: useRuntimeConfig().public.baseUrl,
        headers:{
            authorization: `Bearer ${useTokenStore().customer_token}`
          }
      }));

  //get brands
  const { data: brands, refresh: brandRefresh } = useLazyAsyncData(
      'brands',
      () => $fetch( `/brand`, {
        method: 'GET',
        baseURL: useRuntimeConfig().public.baseUrl,
        headers:{
            authorization: `Bearer ${useTokenStore().customer_token}`
          }
      }));

//Create Product

const imgUrl = ref('');

const state = reactive({
  sku:undefined,
  stock:undefined,
  name:undefined,
  price:undefined,
  image:undefined,
  description:undefined,
  category_id:undefined,
  brand_id:undefined,
});

const onFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    state.image = file;
    imgUrl.value = URL.createObjectURL(file);
}


const onSubmit = async () => {
    await execute();
    if(data.value){
      toast.add({ title: "Data Save Successfully Done..." });
      navigateTo('/shop/products')
    }
    if(error.value){
      toast.add({ title:error?.value?.data.message, color:"red" })
    }
  };
  const {data, status, execute, error} = useAsyncData(
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

onMounted(() => {
  categoryRefresh()
  brandRefresh()
})
</script>
<template>
  <Breadcrumb page="Add Product" icon="i-heroicons-pencil-square" />
  <div class="bg-white rounded-xl shadow-lg p-5">
    <Heading class="mb-4">Add New Product</Heading>
    <div class="border border-primary rounded-xl overflow-hidden w-full h-full">
      <UForm class="p-5" @submit="onSubmit" :state="state">
        <div class="flex">
          <div class="w-1/2 p-5">
            <h4 class="mb-8">Product Detail</h4>
            <UFormGroup label="Title" class="mb-8">
              <UInput v-model="state.title" placeholder="Product Title.." size="lg" color="primary" />
            </UFormGroup>
            <div class="flex mb-8">
              <div class="w-1/3 pr-2">
                <UFormGroup label="Price">
                  <UInput v-model=state.price placeholder="000" size="lg" color="primary" />
                </UFormGroup>
              </div>
              <div class="w-1/3 px-2">
                <UFormGroup label="Stock">
                  <UInput v-model="state.stock" placeholder="Product Stock"  size="lg" color="primary" />
                </UFormGroup>
              </div>
              <div class="w-1/3 pl-2">
                <UFormGroup label="sku">
                  <UInput v-model="state.sku" placeholder="Product SKU"  size="lg" color="primary" />
                </UFormGroup>
              </div>
            </div>
            <div class="flex mb-8">
              <div class="w-1/2 pr-2">
                <UFormGroup label="Category">
                  <USelectMenu
                      size="lg"
                      class="w-full"
                      color="primary"
                      searchable-placeholder="Search a Category..."
                      placeholder="Select a Category"
                      searchable
                      v-model="state.category_id"
                      :options="categories?.data"
                      option-attribute="name"
                  />
                </UFormGroup>
              </div>
              <div class="w-1/2 pl-2">
                <UFormGroup label="Brand">
                  <USelectMenu
                      size="lg"
                      searchable
                      color="primary"
                      searchable-placeholder="Search a brand..."
                      class="w-full"
                      v-model="state.brand_id"
                      placeholder="Select a brand"
                      :options="brands?.data"
                      option-attribute="name"
                  />
                </UFormGroup>
              </div>
            </div>
            <div>
              <UFormGroup label="Discription">
                <UTextarea placeholder="Discription..." :rows="10" color="primary" />
              </UFormGroup>
            </div>
          </div>
          <div class="w-1/2 p-5">
            <h4 class="mb-5">Product Image</h4>
            <div class="w-full">
              <ul class="flex flex-col gap-2 pb-4" v-if="state.image">
                <li>Name: {{ state.image.name }}</li>
                <li>Type: {{ state.image.type }}</li>
                <li v-if="(state.image.size / (1024 * 1024)) >= 1">Size: {{ (state.image.size / (1024 * 1024)).toFixed(1) }} MB</li>
                <li v-else>Size: {{ Math.floor(state.image.size / 1024) }} KB</li>
              </ul>
              <label for="image" class="relative w-full h-80 rounded-xl border border-primary border-dashed block cursor-pointer p-4 overflow-hidden">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2">
                  <Icon name="solar:cloud-upload-line-duotone" class="text-9xl text-thin text-primary-500" />
                </div>
                <img v-if="imgUrl" class="w-full h-full" :src="imgUrl">
                <input type="file" @change="onFileChange" id="image" hidden>
              </label>
            </div>
          </div>
        </div>
        <div class="text-start max-w-sm p-5">
          <UButton type="submit" size="lg" block>Save Product</UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>