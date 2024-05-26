<script setup lang="ts">
  defineProps({
    data:Object
  });
</script>
<template>
    <div class="h-full">
        <GlassCard class="flex flex-col rounded-xl p-2">
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
                  <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-2">
                      <span class="text-sm">Price : </span>
                      <span class="text-sm text-primary">{{data?.price}}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-sm">SKU : </span>
                      <span class="text-sm text-primary">{{data?.sku}}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-sm">BARCODE : </span>
                      <span class="text-sm text-primary">{{data?.bar_code}}</span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-1">
                      <span class="w-2 h-2 rounded-full bg-primary block"></span>
                      <p class="text-white text-sm">In Stock</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <UButton
                          icon="i-heroicons-pencil-square"
                          size="sm"
                          color="primary"
                          square
                          variant="soft"
                          :to="`/shop/products/update/${data?.sku}`"
                          class="glass"
                      />
                      <UButton
                          icon="i-heroicons-trash"
                          size="sm"
                          color="primary"
                          square
                          variant="soft"
                          @click="$emit('delete', data?.id)"
                          class="glass"
                      />
                    </div>
                </div>
            </div>
        </GlassCard>
    </div>
</template>