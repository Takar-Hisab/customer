<script setup lang="ts">

import GlassSection from "~/components/GlassSection.vue";

definePageMeta({
  middleware: ['auth']
})
  const links = [{
      label: 'Takar Hisab',
      icon: 'i-heroicons-home',
      to: '/'
    }, {
      label: 'Dashboard',
      icon: 'i-heroicons-link'
    }]


const columns = [
  {
    key: 'product',
    label: 'Product',
    sortable: true

  },
  {
    key: 'price',
    label: 'Price',
    sortable: true
  },
  {
    key:'quantity',
    label:'QUANTITY',
    sortable: true
  },
   {
    key: 'sold'
  }
]

  const ordertable = [
    {
      key:'orderId',
      label: 'ORDER ID'
    },
    {
      key: 'date',
      label: 'DATE',

    },
    {
      key: 'name',
      label: 'NAME',
    },
    {
      key:'value',
      label:'VALUE',
    },
    {
      key: 'paymentType',
      label: 'PAYMENT TYPE'
    },
    {
      key: 'status',
      label: 'STATUS'
    },
    {
      key: 'action',
      label: 'ACTION'
    }
  ]

const products = [{
  orderId: '#9023456',
  name: 'Lindsay Walton',
  price: '500',
  quantity: 10,
}, {
  id: 2,
  name: 'Courtney Henry',
  price: '700',
  quantity: 10,

}, {
  id: 3,
  name: 'Tom Cook',
  price: '600',
}, {
  id: 4,
  name: 'Tom Cook',
  price: '600',
  quantity: 10,
}]
const selected = ref([])


</script>


<template>
  <div>
    <!-- Bradcrumb -->
    <div class="py-5">
      <UBreadcrumb :links="links" />
    </div>
    <!-- Widgets -->
    <div class="flex p-2 lg:p-4 ">
      <div class="w-2/3 pr-4">
        <div class=" w-full flex flex-wrap items-center w-full overflow-y-scroll">
          <div class="w-1/2 lg:w-1/4 px-2 lg:pl-0 mb-2 lg:mb-0">
            <GlassCard class="group rounded-2xl p-2 lg:p-5 relative overflow-hidden w-full h-48 flex flex-col justify-between">
              <div class="absolute  -top-16 -left-16 -rotate-45 group-hover:-rotate-[50deg] group-hover:scale-125 transition-all ease-in-out duration-500">
                <Icon name="mdi:cash-check" size="220" class="text-gray-100/20" />
              </div>
              <h4 class="text-2xl text-white font-semibold">Total Sale</h4>
              <div>
                <h4 class="text-end text-white text-lg lg:text-4xl font-bold">$8000</h4>
              </div>
            </GlassCard>
          </div>
          <div class="w-1/2 lg:w-1/4 px-2 lg:pl-0 mb-2 lg:mb-0">
            <GlassCard class="group rounded-2xl p-2 lg:p-5 relative overflow-hidden w-full h-48 flex flex-col justify-between">
              <div class="absolute -rotate-45 -top-16 -left-16 -rotate-45 group-hover:-rotate-[50deg] group-hover:scale-125 transition-all ease-in-out duration-500">
                <Icon name="carbon:ibm-data-product-exchange" size="220" class="text-gray-100/20" />
              </div>
              <h4 class="text-2xl text-white font-semibold">Products</h4>
              <div>
                <h4 class="text-end text-white text-lg lg:text-4xl font-bold">112</h4>
              </div>
            </GlassCard>
          </div>
          <div class="w-1/2 lg:w-1/4 px-2 lg:pl-0 mb-2 lg:mb-0">
            <GlassCard class="group rounded-2xl p-2 lg:p-5 relative overflow-hidden w-full h-48 flex flex-col justify-between">
              <div class="absolute -rotate-45 -top-16 -left-16 -rotate-45 group-hover:-rotate-[50deg] group-hover:scale-125 transition-all ease-in-out duration-500">
                <Icon name="material-symbols:settings-suggest-outline-rounded" size="220" class="text-gray-100/20" />
              </div>
              <h4 class="text-2xl text-white font-semibold">Services</h4>
              <div>
                <h4 class="text-end text-white text-lg lg:text-4xl font-bold">25</h4>
              </div>
            </GlassCard>
          </div>
          <div class="w-1/2 lg:w-1/4 px-2 lg:pl-0 mb-2 lg:mb-0">
            <GlassCard class="group  rounded-2xl p-2 lg:p-5 relative overflow-hidden w-full h-48 flex flex-col justify-between">
              <div class="absolute -rotate-45 -top-16 -left-16 -rotate-45 group-hover:-rotate-[50deg] group-hover:scale-125 transition-all ease-in-out duration-500">
                <Icon name="material-symbols-light:remove-shopping-cart-rounded" size="220" class="text-gray-100/20" />
              </div>
              <h4 class="text-2xl text-white font-semibold">Orders</h4>
              <div>
                <h4 class="text-end text-white text-lg lg:text-4xl font-bold">25</h4>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
      <div class="w-1/3 pl-4">
        <div>
        <!--    Card      -->
          <GlassCard class="w-full p-5 rounded-2xl h-48 flex flex-col justify-between relative overflow-hidden">
            <!--    Vector      -->
            <span class="absolute w-11/12 h-full  bg-primary-400 rounded-2xl -rotate-[30deg] -bottom-32 -right-10 z-10"></span>
            <span class="absolute w-11/12 h-full bg-primary-400/30 rounded-2xl  -left-10 rotate-[30deg] -bottom-40 "></span>
            <!--    Vector      -->

            <div class="flex items-center justify-between relative z-10">
              <h3 class="text-white text-xl font-semibold">Tushar Imran</h3>
              <p class="text-white">Takar Hisab</p>
            </div>
            <div class="flex items-end justify-between relative z-10">
              <div >
                <p class="text-white text-medium text-lg">Available Balance</p>
                <h3 class="text-3xl text-white font-semibold">$50,000</h3>
              </div>
              <div class="flex items-center">
                <span class="w-8 h-8 rounded-full bg-gray-100/50 block"></span>
                <span class="w-8 h-8 rounded-full bg-gray-100/50 block -ml-4"></span>
              </div>
            </div>
          </GlassCard>
          <!--    Card End     -->
          <div class="flex items-center justify-end gap-5 pt-4">
            <UButton
                size="sm"
                color="primary"
                variant="soft"
            >
              <Icon name="mdi:cash-plus" size="20" />
              Add Money
            </UButton>
            <UButton
                size="sm"
                color="primary"
                variant="soft"
            >
              <Icon name="mdi:cash-check" size="20" />
              Withdraw
            </UButton>
          </div>
        </div>
      </div>
    </div>


    <div class="flex flex-wrap py-8">
      <div class="w-full lg:w-1/3 lg:pr-3 mb-5 lg:mb-0">
        <GlassCard class="p-5 rounded-2xl   w-full">
          <Heading class="mb-4">Storage Status</Heading>
          <DoughnutChart />
        </GlassCard>
      </div>
      <div class="w-full lg:w-2/3 lg:pl-3 mb-5">
        <GlassSection class="rounded-2xl shadow-lg">
          <header class="p-5 pb-2">
            <Heading>Top Products</Heading>
          </header>
          <UTable
              v-model="selected"
              :rows="products"
              :columns="columns"
              sort-asc-icon="i-heroicons-arrow-up-20-solid"
              sort-desc-icon="i-heroicons-arrow-down-20-solid"
              :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'primary', variant: 'outline', size: '2xs', square: false, ui: { rounded: 'rounded-full' } }"
              sort-mode="manual"
          >
            <template #product-data="{ row }">
              <div class="flex items-center gap-2">
                <img src="/product.jpg" class="w-20 h-auto">
                <div class="w-52">
                  <h4 class="text-wrap">Chicken Biryani with steamed basmati</h4>
                </div>
              </div>
            </template>

            <template #sold-data="{ row }">
              <UBadge>4 Sold</UBadge>
            </template>
          </UTable>
        </GlassSection>
      </div>
    </div>

    <!-- Chart -->
    <GlassSection class="p-4 rounded-xl mt-5 mb-10">
      <BarChart />
    </GlassSection>

    <!-- Recent Order  -->
    <GlassSection class="p-5 rounded-2xl">
      <header class="p-5 pb-2">
        <Heading>Recent Order</Heading>
      </header>
      <UTable
          v-model="selected"
          :rows="products"
          :columns="ordertable"
      >
        <template #orderId-data="{ row }">
          <UTooltip text="Detail" :popper="{ placement: 'top'}" :ui="{ background : 'bg-primary', color: 'text-white'}">
            <NuxtLink to="/">
              <UBadge variant="outline" size="lg">{{ row.orderId}}</UBadge>
            </NuxtLink>
          </UTooltip>
        </template>
        <template #product-data="{ row }">
          <div class="flex items-center gap-2">
            <img src="/product.jpg" class="w-20 h-auto">
            <div class="w-52">
              <h4 class="text-wrap">Chicken Biryani with steamed basmati</h4>
            </div>
          </div>
        </template>

        <template #action-data="{ row }">
          <UTooltip text="Detail" :popper="{ placement: 'top'}" :ui="{ background : 'bg-primary', color: 'text-white'}">
            <UButton
                icon="i-heroicons-eye"
                variant="soft"
                color="gray"
            />
          </UTooltip>
        </template>
      </UTable>
    </GlassSection>
  </div>
</template>