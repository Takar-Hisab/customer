<script setup lang="ts">
import {useCartStore} from "~/stores/useCartStore.js";
const cartStore = useCartStore();
const addedToCart = (product) => cartStore.addToCart({...product, 'buyQty': 1})


definePageMeta({
  layout: 'pos',
  middleware: ['auth']

})

const categories = [
    {
      id: 1,
      name: 'Wade Cooper'
    }, {
      id: 2,
      name: 'Arlene Mccoy'
    }, {
      id: 3,
      name: 'Devon Webb'
    }, {
      id: 4,
      name: 'Tom Cook'
    }
]
const selected = ref(categories[0].id)
const isOpen = ref(false)
const isToggled = ref(true);

const items = [{
  key: 'products',
  label: 'Products',
}, {
  key: 'services',
  label: 'Services',
}]


//Get Products
const { data: products, error: productError, pending: productPending, refresh: productRefresh } = useLazyAsyncData(
    'products',
    () => $fetch( `/product`, {
      method: 'GET',
      baseURL: useRuntimeConfig().public.baseUrl,
      headers:{
        authorization: `Bearer ${useTokenStore().customer_token}`
      }
    }));



//Get Service
const { data: services, error: serviceError, pending: servicePending, refresh: serviceRefresh } = useLazyAsyncData(
    'services',
    () => $fetch( `/service`, {
      method: 'GET',
      baseURL: useRuntimeConfig().public.baseUrl,
      headers:{
        authorization: `Bearer ${useTokenStore().customer_token}`
      }
    }));


// get package
const packages = ref(services?.value?.data[0] || null);

onMounted(() => {
  console.log(products)
  productRefresh()
  serviceRefresh()
})
</script>

<template>
  <div class="w-full h-full flex">
    <!-- Products And Services -->
    <div class="w-2/3 overflow-y-scroll pb-10">
      <UTabs :items="items" class="w-full">
        <template #item="{ item }">
          <UCard class="bg-transparent" :ui="{shadow: 'shadow-none', ring: 'ring-0'}">
            <div v-if="item.key === 'products'">
              <header class="flex items-center justify-between">
                <div>
                  <UInput
                      icon="i-heroicons-magnifying-glass-20-solid"
                      size="md"
                      color="primary"
                      :trailing="false"
                      placeholder="Enter Product Name / SKU / Scan bar code"
                      class="w-96"
                  />
                </div>
                <div>
                  <USelectMenu
                      searchable
                      v-model="selected"
                      :options="categories"
                      placeholder="Select people"
                      value-attribute="id"
                      option-attribute="name"
                  />
                </div>
              </header>
              <div class="flex flex-wrap py-4">
                  <div class="w-1/4 p-1" v-for="product in products.data">
                    <div @click="addedToCart(product)" class="bg-white shadow rounded-lg overflow-hidden relative group cursor-pointer">
                      <span class="group-hover:opacity-100 opacity-0 absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-primary-500/20 flex items-center justify-center transition-all ease-in-out duration-300">
                        <UIcon name="i-heroicons-plus-circle" class="text-4xl text-primary group-hover:mt-0 mt-10 group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-500" />
                      </span>
                      <UBadge class=" absolute top-2 right-2" :label="product?.stoke" />
                      <img v-if="product?.image" :src="product?.image" class="w-full h-32" alt="">
                      <div v-else class="bg-gray-300 flex items-center justify-center w-full h-32">
                        <span  class="text-lg font-semibold">{{product?.sku}}</span>
                      </div>
                      <div class="p-2">
                        <h4>{{product?.name}}</h4>
                        <div class="flex items-center justify-between">
                          <span class="inline-block text-gray-400 font-light text-sm">{{product?.category?.name}}</span>
                          <p class="text-primary font-medium py-2 flex items-center gap-1">
                            <Icon name="i-heroicons-currency-bangladeshi"/> {{product?.price}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div v-else-if="item.key === 'services'" >
              <header class="flex items-center justify-between">
                <div>
                  <UInput
                      icon="i-heroicons-magnifying-glass-20-solid"
                      size="md"
                      color="primary"
                      :trailing="false"
                      placeholder="Enter Service Name"
                      class="w-96"
                  />
                </div>
              </header>
              <div class="flex">
                <div class="w-1/4 pr-3">
                    <ul class="flex flex-col py-4 gap-1">
                      <li v-for="(service, i) in services?.data">
                        <lable @click="packages = service" :class="{'bg-primary text-white' :  packages?.id == service?.id,  'bg-white text-black' :  packages?.id != service?.id }" class=" block px-4 py-2 cursor-pointer hover:bg-primary hover:text-white">{{service?.name}}</lable>
                      </li>
                    </ul>
                </div>
                <div class="w-3/4">
                  <div class="flex flex-wrap py-4">
                    <div class="w-1/2 p-2" v-for="item in packages?.packages?.data">
                      <div  class="overflow-hidden group bg-white rounded-xl  shadow-md shadow-gray-200 border border-primary-300 p-4  text-center relative cursor-pointer">
                        <span class="group-hover:opacity-100 opacity-0 absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-primary-500/20 flex items-center justify-center transition-all ease-in-out duration-300">
                          <UIcon name="i-heroicons-plus-circle" class="text-4xl text-primary group-hover:mt-0 mt-10 group-hover:opacity-100 opacity-0  transition-all ease-in-out duration-500" />
                        </span>
                        <Heading>{{item?.price}}</Heading>
                        <Heading>{{item?.name}}</Heading>
                        <Text class="py-5">
                          {{item?.description}}
                        </Text>
                        <Text>Position: {{item?.position}}</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </template>
      </UTabs>
      <div class="p-4">

      </div>
    </div>
      <!--    Side Bar-->
    <div class="h-full w-1/3 bg-white shadow-lg shadow-gray-300 p-2 overflow-y-scroll">
      <div class="flex items-center justify-between">
        <Heading class="font-medium">Current Order({{ cartStore.getCartItems?.length }})</Heading>
        <UButton
            icon="i-heroicons-cursor-arrow-rays"
            color="primary"
            size="sm"
            label="clear"
            square
            variant="solid"
            @click="cartStore.clearCart()"
        />
      </div>
      <div class="p-2">
      <!--  Selected Products     -->
        <div class="flex gap-3 p-2 rounded shadow shadow-gray-200 w-full" v-for="item in cartStore.getCartItems">
          <div class="w-1/4">
            <img :src="item?.image" class="w-full h-20 rounded" alt="">
          </div>
          <div class="relative w-3/4">
            <UButton
                icon="i-heroicons-trash"
                size="2xs"
                color="primary"
                square
                variant="solid"
                class="absolute top-0 right-0"
                @click="cartStore.removeFromCart(item)"
            />
            <h3 class="text-sm mb-1">{{item?.name}}</h3>
            <div class="flex items-center justify-between mt-3">
              <div>
                <p class="font-light text-sm text-gray-500">Price: <span class="text-primary font-bold">{{item?.price}}</span></p>
                <p class="font-light text-sm text-gray-500">Sub Total: <span class="text-primary font-bold">{{ item?.price * item?.buyQty }}</span></p>
              </div>
              <div class="flex items-center gap-1">
                <UButton
                    icon="i-heroicons-minus"
                    size="2xs"
                    color="primary"
                    square
                    variant="outline"
                />
                <input type="text" readonly class="w-5 h-6 flex text-center outline-0 border-0 font-normal" :value="item?.buyQty">
                <UButton
                    icon="i-heroicons-plus"
                    size="2xs"
                    color="primary"
                    square
                    variant="outline"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="fixed left-1/2 -translate-x-1/2 bg-white p-5 pb-10 w-3/4 drop-shadow  drop-shadow-primary-400 border-primary transition-all ease-in-out duration-300"
        :class="isToggled ? 'bottom-0' : '-bottom-[190px]'"

    >
      <UButton
          :icon="isToggled ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-up'"
          size="sm"
          color="primary"
          square
          variant="solid"
          class="absolute -top-4 right-2"
          @click="isToggled = !isToggled"
      />
      <div class="flex items-center justify-between border-b border-gray-400 pb-4">
        <div class="w-1/3">
          <div class="flex flex-col gap-3">
            <USelectMenu
                searchable
                searchable-placeholder="Search a Customer..."
                v-model="selected"
                :options="categories"
                placeholder="Select people"
                value-attribute="id"
                option-attribute="name"
                color="primary"
            />
            <UInput color="primary" variant="outline" placeholder="Discount" @click="isOpen = true" />
          </div>
        </div>
        <div class="w-1/3 pl-4">
          <div class="flex items-center justify-between">
            <p>Item</p>
            <p class="text-black">10</p>
          </div>
          <div class="flex items-center justify-between">
            <p>Total</p>
            <p class="text-black">10000৳</p>
          </div>
        </div>
      </div>
      <div class="flex justify-between pt-4">
        <div class="flex flex-wrap gap-3">
          <UButton
              icon="i-heroicons-pencil-square"
              size="sm"
              color="primary"
              variant="solid"
              label="Draft"
              :trailing="false"
          />
          <UButton
              icon="i-heroicons-pencil-square"
              size="sm"
              color="sky"
              variant="solid"
              label="Quotation"
              :trailing="false"
          />
          <UButton
            icon="i-heroicons-pause"
            size="sm"
            color="indigo"
            variant="solid"
            label="Suspend"
            :trailing="false"
          />
          <UButton
              icon="i-heroicons-credit-card"
              size="sm"
              color="fuchsia"
              variant="solid"
              label="Card"
              :trailing="false"
          />
          <UButton
              icon="i-heroicons-banknotes"
              size="sm"
              color="orange"
              variant="solid"
              label="Cash"
              :trailing="false"
          />
          <UButton
              icon="i-heroicons-x-mark"
              size="sm"
              color="red"
              variant="solid"
              label="Cancel"
              :trailing="false"
          />
        </div>
        <div>
          <p>Total Payable: <span class="font-bold text-black">10000৳</span></p>
        </div>
      </div>
    </div>
  </div>

  <UModal v-model="isOpen" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Edit Discount
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
        </div>
      </template>

      <div class="flex justify-between">
        <div class="w-1/2 px-1">
          <label class="mb-2 block">Discount Type: </label>
          <USelect
              color="primary"
              variant="outline"
              :options="['Fixed', 'Parcenteg']"
              model-value="Fixed"
          />
        </div>
        <div class="w-1/2 px-1">
          <label  class="mb-2 block">Discount Amount: </label>
          <UInput color="primary" variant="outline" />
        </div>
      </div>
      <div class="text-end pt-4">
        <UButton label="save" />
      </div>
    </UCard>
  </UModal>

</template>