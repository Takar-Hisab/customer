<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
const columns = [
  {
    key:'items',
    label:'ITEMS'
  },
  {
    key:'quantity',
    label:'QUANTITY'
  },
  {
    key:'price',
    label:'PRICE'
  },
  {
    key:'total',
    label:'TOTAL'
  },
  {
    key:'action',
    label:'ACTION'
  },


]
const people = [
  {
    items: 'Lindsay Walton',
    quantity: 6,
    price:40,
    total:240
  },

  {
    items: 'Courtney Henry',
    quantity: 6,
    price:40,
    total:240
    },
]

const status = [
  {
    label:'Delivered',
    value:'delivered'
  },
  {
    label:'Cancel Order',
    value:'canceled'
  },

]
</script>
<template>
  <!-- Back Button -->
    <BackButton />
  <!-- Back Button End -->

  <div class="flex items-center justify-between">
    <Heading>Order</Heading>
    <div class="flex items-center gap-4">
      <UButton
        icon="i-heroicons-printer"
        varinat="solid"
      />
      <USelectMenu
        class="w-32 cursor-pointer"
         color="primary"
          placeholder="Pending"
        :options="status" />
    </div>
  </div>

  <div class="flex">
    <div class="w-2/3 pr-3">
      <div class="p-5 rounded-2xl bg-white shadow-lg">
        <Heading class="mb-2">Order 234567890</Heading>
        <UTable :rows="people" :columns="columns">
          <template #action-data>
            <UButton
              icon="i-heroicons-trash"
              variant="soft"
            />
          </template>
        </UTable>
      </div>
      <div class="flex mt-8">
        <div class="w-1/2 pr-3">
          <div class="p-5 rounded-2xl bg-white shadow-lg">
            <Heading>Shipping Information</Heading>
            <div class="w-full flex flex-col mt-5 gap-3">
              <div class="flex items-center justify-between">
                <p class="text-sm">Name</p>
                <p class="text-sm"></p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm">Company</p>
                <p class="text-sm"></p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm">City</p>
                <p class="text-sm"></p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm">Country</p>
                <p class="text-sm"></p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm">PostalCode</p>
                <p class="text-sm"></p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm">Phone</p>
                <p class="text-sm"></p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/2 pl-3">
          <div class="p-5 rounded-2xl bg-white shadow-lg">
            <Heading>Billing Information</Heading>
            <div class="w-full flex flex-col mt-5 gap-3">
              <div class="flex items-center justify-between">
                <p class="text-sm">Name</p>
                <p class="text-sm"></p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm">Company</p>
                <p class="text-sm"></p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm">City</p>
                <p class="text-sm"></p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm">Country</p>
                <p class="text-sm"></p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm">PostalCode</p>
                <p class="text-sm"></p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm">Phone</p>
                <p class="text-sm"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/3 pl-3">
      <div class="p-5 rounded-2xl bg-white shadow-lg">
          <Heading>Extra Information</Heading>
        <div class="w-full flex flex-col mt-5">
            <div class="flex items-center justify-between py-3 px-4">
              <p>Total :</p>
              <p>500</p>
            </div>
            <div class="flex items-center justify-between py-3  border-t px-4">
              <p>Discount :</p>
              <p>0</p>
            </div>
            <div class="flex items-center justify-between py-3  border-t px-4">
              <p>Grand Total :</p>
              <p>500</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>