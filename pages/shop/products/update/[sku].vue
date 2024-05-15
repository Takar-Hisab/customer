<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
  const route = useRoute();

  const { data: product, error, pending, refresh } = useLazyAsyncData(
      'product',
      () => $fetch( `/product/${route.params.sku}`, {
        method: 'GET',
        baseURL: useRuntimeConfig().public.baseUrl,
      }));

  onMounted(() => {
    console.log(product);
    refresh()
  })
</script>
<template>
  <Breadcrumb page="Update Product" icon="i-heroicons-pencil-square" />
  <div class="bg-white rounded-xl shadow-lg p-5">
    <Heading class="mb-4">Product Modification</Heading>
    <div class="border border-primary rounded-xl overflow-hidden w-full h-full">
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
        <div class="text-start max-w-sm p-5">
          <UButton size="lg" block>Update Product</UButton>
        </div>
      </UForms>
    </div>
  </div>
</template>