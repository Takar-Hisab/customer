<script setup lang="ts">
  defineProps({
    data:Object
  });
</script>
<template>
    <div class="h-full">
        <div class="flex flex-col bg-white rounded-xl p-2 shadow-lg">
            <NuxtLink :to="`/shop/products/${data?.sku}`"  class="w-full h-40 block">
                <img v-if="data?.image" class="w-full h-full rounded-xl" :src="data?.image">
                <div v-else class="w-full h-full bg-gray-300 flex items-center justify-center rounded-xl">
                  <p class="text-gray-800 text-xl font-semibold">{{data?.sku}}</p>
                </div>
            </NuxtLink>
            <div class="p-2">
                <h4 class="leading-tight mb-2">
                    <NuxtLink :to="`/shop/products/${data?.sku}`" class="text-sm lg:text-lg leading-tight hover:text-primary">{{data?.name?.substring(0, 40)}}</NuxtLink>
                </h4>
                <div class="flex items-center justify-between mb-2">
                  <p class="flex items-center gap-1">
                    SKU: <span class="bg-primary rounded-md text-white px-2 py-1 text-xs">{{data?.sku}}</span>
                  </p>
                  <p class="text-lg font-normal text-gray-800 flex items-center gap-1">
                    <Icon name="i-heroicons-currency-bangladeshi" class="text-primary" />{{data?.price}}
                  </p>
                </div>
                <div class="flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-primary block"></span>
                    <p class="text-gray-600 text-sm">In Stock</p>
                </div>
                <div class="flex items-center justify-end gap-3">
                    <UButton
                        icon="i-heroicons-pencil-square"
                        size="sm"
                        color="primary"
                        square
                        variant="soft"
                        :to="`/shop/products/update/${data?.sku}`"
                    />
                    <UButton
                        icon="i-heroicons-trash"
                        size="sm"
                        color="primary"
                        square
                        variant="soft"
                        @click="$emit('delete', data?.id)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>