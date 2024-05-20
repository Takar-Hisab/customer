<script lang="ts" setup>
  const route = useRoute();
  //get Transaction
  const { data: transaction, error, pending, refresh } = useLazyAsyncData(
      'transaction',
      () => $fetch( `/transaction/${route.params.id}`, {
        method: 'GET',
        baseURL: useRuntimeConfig().public.baseUrl,
        headers: {
          authorization: `Bearer ${useTokenStore().customer_token}`
        }
      }));

  onMounted(() => {
    refresh();
  })
</script>

<template>
    <Breadcrumb />
    <BackButton />
</template>