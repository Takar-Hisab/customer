<script setup lang="ts">
  const router = useRouter();
</script>
<template>
    <UButton
        class="mb-4 hidden lg:flex"
        icon="i-heroicons-arrow-long-left"
        size="md"
        color="primary"
        variant="link"
        label="Go Back"
        :trailing="false"
        @click="router.back()"
    />
</template>
