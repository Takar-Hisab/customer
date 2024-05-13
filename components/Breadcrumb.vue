<script setup lang="ts">
  const props = defineProps({
      page: {
        type:String,
      },
      icon: {
        type: String,
      }
  });

  const links = [{
    label: 'Takar Hisab',
    icon: 'i-heroicons-home',
    to: '/'
  },
    {
      label: 'Dashboard',
      icon: 'i-heroicons-link',
      to: '/dashboard'
    },
    {
      label: props.page,
      icon: props.icon
    }
  ]

</script>
<template>
  <UContainer class="py-5 hidden lg:block">
    <UBreadcrumb :links="links" />
  </UContainer>
</template>