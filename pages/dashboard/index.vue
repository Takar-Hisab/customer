<script setup lang="ts">

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
    <div class="p-2 lg:p-4 rounded-lg lg:rounded-2xl  flex flex-wrap items-center bg-primary lg:bg-white w-full overflow-y-scroll">
      <div class="w-1/2 lg:w-1/4 px-2 lg:pl-0 mb-2 lg:mb-0">
        <div class="bg-gray-200 rounded-2xl p-2 lg:p-5">
          <div class="flex items-center gap-3">
            <span class="bg-primary w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-xl">
              <Icon name="mdi:cash-check" size="26" class="text-white" />
            </span>
            <span class="text-sm lg:text-lg">Total Sale</span>
          </div>
          <div class="mt-5 lg:mt-20">
            <span class="bg-primary-300 text-primary-900 rounded-full px-2 font-light inline-block mb-2">
              +40%
            </span>
            <h4 class="text-lg lg:text-2xl font-medium"><span class="font-normal text-sm lg:text-xl text-gray-500">+</span>$8000</h4>
          </div>
        </div>
      </div>
      <div class="w-1/2 lg:w-1/4 px-2 mb-2 lg:mb-0">
        <div class="bg-gray-200 rounded-2xl p-2 lg:p-5">
          <div class="flex items-center gap-3">
            <span class="bg-primary w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-xl">
              <Icon name="mdi:cash-check" size="26" class="text-white" />
            </span>
            <span class="text-sm lg:text-lg">Income</span>
          </div>
          <div class="mt-5 lg:mt-20">
            <span class="bg-primary-300 text-primary-900 rounded-full px-2 font-light inline-block mb-2">
              +40%
            </span>
            <h4 class="text-lg lg:text-2xl font-medium"><span class="font-normal text-xl text-gray-500">+</span>$8000</h4>
          </div>
        </div>
      </div>
      <div class="w-1/2 lg:w-1/4 px-2 lg:mb-0">
        <div class="bg-gray-200 rounded-2xl p-2 lg:p-5">
          <div class="flex items-center gap-3">
            <span class="bg-primary w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-xl">
              <Icon name="mdi:shopping-outline" size="22" class="text-white" />
            </span>
            <span class="text-sm lg:text-lg">Products</span>
          </div>
          <div class="mt-5 lg:mt-20">
            <span class="bg-primary-300 text-primary-900 rounded-full px-2 font-light inline-block mb-2">
              +40%
            </span>
            <h4 class="text-md lg:text-2xl font-medium"><span class="font-normal text-sm lg:text-xl text-gray-500">+</span>$8000</h4>
          </div>
        </div>
      </div>
      <div class="w-1/2 lg:w-1/4 px-2 lg:pr-0 lg:mb-0">
        <div class="bg-gray-200 rounded-2xl p-2 lg:p-5">
          <div class="flex items-center gap-3">
            <span class="bg-primary w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-xl">
              <Icon name="mdi:cash-check" size="26" class="text-white" />
            </span>
            <span class="text-sm lg:text-lg">Services</span>
          </div>
          <div class="mt-5 lg:mt-20">
            <span class="bg-primary-300 text-primary-900 rounded-full px-2 font-light inline-block mb-2">
              +40%
            </span>
            <h4 class="text-lg lg:text-2xl font-medium"><span class="font-normal text-xl text-gray-500">+</span>$12,000</h4>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap py-8">
      <div class="w-full lg:w-1/3 lg:pr-3 mb-5 lg:mb-0">
        <div class="p-5 rounded-2xl bg-white shadow-lg w-full">
          <Heading class="mb-4">Storage Status</Heading>
          <DoughnutChart />
        </div>
      </div>
      <div class="w-full lg:w-2/3 lg:pl-3 mb-5">
        <div class="bg-white p-5 rounded-2xl shadow-lg">
          <Heading>Top Products</Heading>
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
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="p-4 rounded-xl bg-white shadow-lg mt-5 mb-10">
      <BarChart />
    </div>
    <!-- Top products -->
    <div class="flex my-5">
      <div class="w-1/2 pl-2">

      </div>
    </div>

    <!-- Recent Order  -->
    <div class="bg-white p-5 rounded-2xl shadow-lg">
      <Heading>Recent Order</Heading>
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
            />
          </UTooltip>
        </template>
      </UTable>
    </div>
  </div>
</template>