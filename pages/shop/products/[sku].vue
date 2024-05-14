<script setup lang="ts">
const route = useRoute();
const { data: product, error, pending, refresh } = useLazyAsyncData(
    'product',
    () => $fetch( `/product/${route.params.sku}`, {
      method: 'GET',
      baseURL: useRuntimeConfig().public.baseUrl,
      headers: {
        authorization: `Bearer ${useTokenStore().customer_token}`
      }
    }));

onMounted(() => {
  console.log(product);
  refresh()
})
</script>

<template>
  <Breadcrumb :page="product?.name" />
  <BackButton />
  <div class="shadow-xl bg-white flex p-4">
    <div class="w-1/2 pr-3">
      <div>
        <img :src="product?.image" :alt="product?.name">
      </div>
    </div>
    <div class="w-1/2 pl-3">
      <div>
        <h2 class="text-xl mb-4">{{ product?.name }}</h2>
        <h3 class="mb-3">SKU: {{ product?.sku }}</h3>
        <p class="text-2xl font-medium">{{ product?.price }}</p>
        <p class="mb-2">Stock: {{ product?.stoke }}</p>
        <p>{{ product?.description }}</p>
      </div>
    </div>
  </div>
</template>