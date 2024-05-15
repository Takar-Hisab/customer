<script setup lang="ts">
  definePageMeta({
  middleware: ['auth']
})
</script>
<template>
  <Breadcrumb page="profile" icon="i-heroicons-user" />
  <BackButton />
  <div class="p-4 rounded-2xl shadow-lg">
    <Heading>Profile</Heading>
  </div>
</template>