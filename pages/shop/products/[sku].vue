<script setup lang="ts">
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
  <div>
    {{product}}
  </div>
</template>