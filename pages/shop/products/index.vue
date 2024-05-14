<script setup lang="ts">

  const toast = useToast();
  const isScrolled = ref(false);
  const isFilter = ref(false);

  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
  };

  onMounted(() => {
      window.addEventListener('scroll', handleScroll);
  });

  onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
  });


    const isOpen = ref(false)
    const isProductCreate = ref(false)
    const form = ref({
      price:0,
      category:null,
      brand:null
    })

    // Create Product
    const state = reactive({
      sku:null,
      price:null,
    });

  const onSubmit = async () => {
    await execute();

    if(data.value){
      toast.add({ title: "Data Save Successfully Done..." })
    }
    if(error.value){
      toast.add({ title:error.value.data.message, color:"red" })
    }
    const isProductCreate = false;
  };
  const {data, status, execute} = useAsyncData(
      async () => {
        return await $fetch(`/product`, {
          baseURL: useRuntimeConfig().public?.baseUrl,
          method: "POST",
          body:state,
        });
      },
      {
        immediate: false,
      }
  );

  //Get Products
    const { data: products, error, pending, refresh } = useLazyAsyncData(
      'products',
      () => $fetch( `/product`, {
        method: 'GET',
        baseURL: useRuntimeConfig().public.baseUrl,
      }));
      onMounted(() => {
        refresh()
      })

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
    <div class="z-10 fixed h-[89vh] lg:h-[80vh] w-72 bg-white rounded-xl shadow-lg lg:right-5 bottom-5  p-3 flex flex-col gap-5 overflow-y-scroll transition-all ease-in-out duration-500 " :class="{'lg:h-[95vh]' : isScrolled, 'right-0' : isFilter, '-right-96' : !isFilter}">
      <UButton
          icon="i-heroicons-chevron-right"
          size="sm"
          class="absolute z-40 top-0 left-0 lg:hidden"
          color="primary"
          square
          variant="solid"
          @click="isFilter = !isFilter"
      />
      <span class="absolute top-0 left-0 right-0 w-full h-5 bg-primary"></span>
      <span class="absolute top-2 left-0 right-0 w-full/ h-5 bg-white z-10 rounded-t-3xl"></span>
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
    <!-- Filters End -->

    <!-- Products -->
    <div class="lg:mr-80">
      <header class="flex items-center justify-between">
        <div>
          <Heading>Products</Heading>
        </div>
        <div class="flex items-center gap-3">
          <UButton
              class="lg:hidden"
              icon="i-heroicons-funnel"
              size="sm"
              color="primary"
              square
              variant="solid"
              @click="isFilter = !isFilter"
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
      <div class="" v-if="pending">
        <p class="text-4xl font-bold text-center py-20 text-primary">Loading</p>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-3" v-else-if="products != null">
        <ProductCard v-for="(product, index) in products?.data" :data="product"  :key="index"/>
      </div>
      <div v-else>
        <p class="text-4xl font-bold text-center py-20 text-primary">Products Not Found !</p>
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
          </UForm>
        </div>
      </UCard>
    </UModal>


  <!-- Create Product -->
  <UModal v-model="isOpen" fullscreen>
    <UCard
      :ui="{
        base: 'h-full flex flex-col',
        rounded: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow'
        }
      }"
    >
      
      <div class="border border-primary rounded-xl overflow-hidden w-full h-full">
        <header class="flex itema-center justify-between bg-primary px-4 py-2">
          <h3 class="text-white">Add new Product</h3>
          <UButton class="p-0" @click="isOpen = false">
            <Icon name="i-heroicons-x-mark-20-solid" size="30" />
          </UButton>
        </header>
        <UForms class="p-5">
          <div class="flex">
            <div class="w-1/2 p-5">
              <h4 class="mb-8">Product Detail</h4>
              <UFormGroup label="Title" class="mb-8">
                  <UInput placeholder="Product Title.." size="lg" color="primary" />
                </UFormGroup>
              <div class="flex mb-8">
                <div class="w-1/3 pr-2">
                  <UFormGroup label="Price">
                    <UInput placeholder="000" size="lg" color="primary" />
                  </UFormGroup>
                </div>
                <div class="w-1/3 px-2">
                  <UFormGroup label="Stock">
                    <UInput placeholder="Product Stock"  size="lg" color="primary" />
                  </UFormGroup>
                </div>
                <div class="w-1/3 pl-2">
                  <UFormGroup label="sku">
                    <UInput placeholder="Product SKU"  size="lg" color="primary" />
                  </UFormGroup>
                </div>
              </div>
              <div class="flex mb-8">
                <div class="w-1/2 pr-2">
                  <UFormGroup label="Category">
                    <USelectMenu
                      size="lg"
                      searchable
                      color="primary"
                      searchable-placeholder="Search a person..."
                      class="w-full"
                      placeholder="Select a person"
                      :options="['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']"
                    />
                  </UFormGroup>
                </div>
                <div class="w-1/2 pl-2">
                  <UFormGroup label="Brand">
                    <USelectMenu
                      size="lg"
                      searchable
                      color="primary"
                      searchable-placeholder="Search a person..."
                      class="w-full"
                      placeholder="Select a person"
                      :options="['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']"
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
              <h4 class="mb-8">Product Image</h4>
            </div>
          </div>
          <div class="text-center max-w-sm mx-auto">
            <UButton size="lg" block>Save Product</UButton>
          </div>
        </UForms>
      </div>
    </UCard>
  </UModal>
</template>


