<script setup lang="ts">

import { format } from 'date-fns'
const date = ref(new Date())
const q = ref('')

const items = [
  [{
    slot: 'account',
    disabled: true
  }], [{
    label: 'Profile',
    icon: 'i-heroicons-user-circle',
    to:'/dashboard/profile'
  }], [{
    label: 'Products',
    icon: 'i-heroicons-archive-box',
    to: '/shop/products',
  }, {
    label: 'Order',
    icon: 'i-heroicons-shopping-cart',
    to: '/order'
  }, {
    label: 'Customers',
    icon: 'i-heroicons-users',
    to:'/customers'
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click:()=>{
      useAuthStore().logout();
      useToast().add({
        title: "Logout Successfully Done.."
      })
    }
  }]
]

const notifications = [
  [{
    name: 'Email Varified !',
    icon: 'i-heroicons-envelope'
  }]
];
</script>

<template>
  <div class="topBar  items-center justify-end gap-3 hidden lg:flex">
    <div class="bg-white shadow-lg  rounded-full flex items-center justify-center px-3 py-2 shadow-gray-200 gap-2 border border-primary">
      <Icon  name="i-heroicons-calendar-days" />
      <span>{{ format(date, 'd MMM, yyy') }}</span>
    </div>
    <UDropdown :items="notifications" :ui="{ item: { disabled: 'cursor-text select-text' }, width:'w-80', height:'min-h-96',padding:'p-3', ring:'ring-primary', shadow:'shadow-primary-500/10'  }" :popper="{offsetDistance: 16, placement: 'bottom-start' }">
       <div class="bg-white shadow-lg  rounded-full flex items-center justify-center px-3 py-2 shadow-gray-200 gap-2 w-12 h-12 border border-primary">
         <UIcon name="i-heroicons-bell" class="text-xl" />
       </div>

        <template #item="{ item }">
          <div class="flex gap-3">
            <span class="w-10 h-10 flex items-center justify-center rounded-full bg-pink-400">
              <UIcon :name="item.icon" class="text-md text-white" />
            </span>
            <div class="text-left ">
              <p>{{item.name}}</p>
              <span class="text-sm text-gray-400">2 day ago</span>
            </div>
          </div>
        </template>
      </UDropdown>
    <UDropdown
          :items="items"
          :ui="{ item: { disabled: 'cursor-text select-text' }, width:'w-60', ring:'ring-primary' }"
          :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            chip-color="primary"
            size="lg"
        />
        <template #account="{ item }">
          <div class="text-left">
            <p>
              Signed in as
            </p>
            <p class="font-medium text-black dark:text-white mt-2">
              {{ user?.name }}
            </p>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ user?.email }}
            </p>
          </div>
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>

          <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </template>
      </UDropdown>
  </div>
</template>

<style scoped>
input {
  border-radius: 999px !important;
}
</style>