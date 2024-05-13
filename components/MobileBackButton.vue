<script setup lang="ts">
const router = useRouter();
</script>
<template>
  <UButton
      icon="i-heroicons-arrow-long-left"
      size="md"
      color="primary"
      variant="soft"
      @click="router.back()"
      :ui="{rounded: 'rounded-full'}"
  />
</template>
