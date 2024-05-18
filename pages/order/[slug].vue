<script setup lang="ts">
const isOpen = ref(false);
const route = useRoute()
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
  }
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


const { data: order, error, pending, refresh } = useLazyAsyncData(
      'order',
      () => $fetch( `/order/${route.params.slug}`, {
        method: 'GET',
        baseURL: useRuntimeConfig().public.baseUrl,
        headers: {
          authorization: `Bearer ${useTokenStore().customer_token}`
        }
      }));


      onMounted(() => {
        refresh()
        console.log(order);
      })
</script>
<template>
  <!-- Back Button -->
    <BackButton />
  <!-- Back Button End -->

  <div class="flex items-center justify-between mb-5">
    <Heading>Order: <span class="text-primary font-normal">{{order?.order_id}}</span></Heading>
    <div class="flex items-center gap-4">
      <UButton
          icon="i-heroicons-printer"
          varinat="solid"
      />
      <UButton
          icon="i-heroicons-document-text"
          varinat="solid"
          @click="isOpen = true"
      />
      <UBadge size="lg">{{order?.order_status}}</UBadge>
      <USelectMenu
        class="w-32 cursor-pointer"
        color="primary"
        placeholder="Pending"
        v-model="order.order_status"
        :options="status" />
    </div>
  </div>

  <div class="flex">
    <div class="w-2/3 pr-3">
      <div class="p-5 rounded-2xl bg-white shadow-lg">
        <Heading class="mb-2">Order {{ order?.data?.order_id }}</Heading>
        <UTable :rows="order?.items" :columns="columns">

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
            <Heading>Customer Information</Heading>
            <div class="w-full flex flex-col mt-5 gap-3">
              <div class="flex items-center justify-between">
                <p class="text-sm">Name</p>
                <p class="text-sm">{{order?.customer?.name}}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm">Email</p>
                <p class="text-sm">{{order?.customer?.email}}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm">Phone</p>
                <p class="text-sm">{{order?.customer?.phone}}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm">City</p>
                <p class="text-sm"></p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm">Country</p>
                <p class="text-sm"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-5 rounded-2xl bg-white shadow-lg my-8">
        <Heading>Store Information</Heading>
        <div class="w-full flex flex-col mt-5">
          <div class="flex items-center justify-between py-3 ">
            <p>Store Name</p>
            <p>{{order?.store?.name}}</p>
          </div>
          <div class="flex items-center justify-between py-3 ">
            <p>Store Email</p>
            <p>{{order?.store?.email}}</p>
          </div>
          <div class="flex items-center justify-between py-3">
            <p>Store Address</p>
            <p>{{order?.store?.address}}</p>
          </div>
          <div class="flex items-center justify-between py-3">
            <p>Whatsapp Number</p>
            <p>{{order?.store?.whatsapp_number}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/3 pl-3">
      <div class="p-5 rounded-2xl bg-white shadow-lg mb-5">
        <Heading>Information</Heading>
        <div class="w-full flex flex-col mt-5">
            <div class="flex items-center justify-between py-3  border-t px-4">
              <p>Pay Bill </p>
              <p>{{order?.pay_bill}}</p>
            </div>
            <div class="flex items-center justify-between py-3  border-t px-4">
              <p>Pay Due </p>
              <p>{{order?.pay_due}}</p>
            </div>
            <div class="flex items-center justify-between py-3  border-t px-4">
              <p>Discount </p>
              <p>0</p>
            </div>
            <div class="flex items-center justify-between py-3  border-t px-4">
              <p>Grand Total </p>
              <p>{{order?.grand_total}}</p>
          </div>
        </div>
      </div>
      <div class="p-5 rounded-2xl bg-white shadow-lg">
        <Heading>Extra Information</Heading>
        <div class="w-full flex flex-col mt-5">
            <div class="flex items-center justify-between py-3 px-4">
              <p>Type </p>
              <p class="uppercase">{{order?.order_type}}</p>
            </div>
            <div class="flex items-center justify-between py-3  border-t px-4">
              <p>Payment Status</p>
              <p class="uppercase">{{order?.payment_status}}</p>
            </div>
            <div class="flex items-center justify-between py-3  border-t px-4">
              <p>Payment Method</p>
              <p class="uppercase">{{order?.payment_method}}</p>
            </div>
        </div>
      </div>
    </div>
  </div>

  <UModal v-model="isOpen" fullscreen :ui="{background: 'bg-gray-100/10'}">
    <UCard
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow'
          },
        }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <UButton color="gray" variant="ghost" size="30" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
        </div>
      </template>

      <div v-html="order?.invoice" class="max-w-xl h-full bg-white mx-auto">

      </div>
    </UCard>
  </UModal>

</template>