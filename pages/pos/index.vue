<script setup lang="ts">
import {useCartStore} from "~/stores/useCartStore.js";
const cartStore = useCartStore();
const toast = useToast();
const addedToCart = (product:any, type:string) => {
  if(product?.service_id || (product?.stoke && product?.stoke > 0)){
    const index = cartStore.cart?.findIndex(item => item?.sku === product?.sku);
    if((index > -1) && (cartStore.cart[index]?.buyQty >= product.stoke)){
      toast.add({
        title:"Max Quantity exist...",
        color:'orange'
      })
    }else{
      cartStore.addToCart({...product, 'buyQty': 1})
    }
  }else{
    toast.add({
      title:"Product Out Of Stoke",
      color:'orange'
    })
  }
}


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
const isDiscount = ref(false)
const isShipping = ref(false)

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
    })
);


//Get Customers
const { data: customer, error: customerError, pending: customerPending, refresh: customerRefresh } = useLazyAsyncData(
    'customer',
    () => $fetch( `/customers?onlyData=true`, {
      method: 'GET',
      baseURL: useRuntimeConfig().public.baseUrl,
      headers:{
        authorization: `Bearer ${useTokenStore().customer_token}`
      }
    })
);

// get package
const packages = ref(null);





// save order form modification
const isEditPayment = ref(true)
const paymentAmount = ref(0)
const dueAmount = ref(null)
const updating = ref(false)
// select payment method and confirm order
const paymentMethod = ref(null)
const selectCustomer = ref(null)


watch(isEditPayment, (edit) => edit ? paymentAmount.value = cartStore.getCartTotalPrice : paymentAmount.value = null)
watch(paymentAmount, (pay) => {
  dueAmount.value = Number(cartStore.getCartTotalPrice - pay).toFixed(2)
})


const openPlaceOrder = () =>{
  paymentAmount.value = Number(cartStore.getCartTotalPrice)?.toFixed(2)
  isOpen.value = true
}

const clearNotification = () => errorCreateCustomer.value = null;
const submitOrder = async () => {
  clearNotification()
  await execute();

  if (data.value) {
    toast.add({title: "Data Save Successfully Done..."})
    isOpen.value = false

    selectCustomer.value = null
    paymentMethod.value = null
    dueAmount.value = null
    paymentAmount.value = 0

    cartStore.clearCart()
    setTimeout(async () => await paymentReceived(data.value?.invoice), 3000)
  }
  if (errorCreateCustomer.value) {
    toast.add({title: errorCreateCustomer.value.data.message, color: "red"})
  }
};

const {data, status, execute, error:errorCreateCustomer, pending:createCustomerPending} = useAsyncData(
    async () => {
      return await $fetch(`/order`, {
        baseURL: useRuntimeConfig().public?.baseUrl,
        headers:{
          Authorization: `Bearer ${useTokenStore().customer_token}`
        },
        method: "POST",
        body: {
          paymentMethod: paymentMethod.value,
          user_id: selectCustomer.value,
          order_details: cartStore.getCartItems,
          dueAmount: dueAmount.value,
          payAmount: paymentAmount.value,
          totalAmount: cartStore.getCartTotalPrice
        },
      });
    },
    {
      immediate: false,
    }
);


async function paymentReceived(ele: any) {
  window.frames['print_frame'].document.title = document.title;
  window.frames["print_frame"].document.body.innerHTML = ele
  window.frames["print_frame"].window.focus();
  window.frames["print_frame"].window.print();
}



onMounted(() => {
  productRefresh()
  serviceRefresh()
  customerRefresh()
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


                <UProgress v-if="productPending" animation="carousel" size="2xs" />
                <div v-if="productPending" class="w-full flex dark:bg-slate-700 items-center justify-center py-36">
                  <Icon class="text-primary-500" name="i-svg-spinners-180-ring-with-bg" size="40"/>
                </div>

                  <div class="w-1/4 p-1" v-if="products?.data?.length && !productPending" v-for="product in products?.data">
                    <div @click="addedToCart(product)" class="bg-white shadow rounded-lg overflow-hidden relative group cursor-pointer">
                      <span class="group-hover:opacity-100 opacity-0 absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-primary-500/20 flex items-center justify-center transition-all ease-in-out duration-300">
                        <UIcon name="i-heroicons-plus-circle" class="text-4xl text-primary group-hover:mt-0 mt-10 group-hover:opacity-100 opacity-0 transition-all ease-in-out duration-500" />
                      </span>
                      <UBadge class=" absolute top-2 right-2" :label="product?.stoke" />
                      <img v-if="product?.image" :src="product?.image" class="w-full h-32" alt="">
                      <div v-else class="bg-gray-300 flex items-center justify-center w-full h-32">
                        <span  class="text-lg font-semibold">Product</span>
                      </div>
                      <div class="p-2">
                        <h4>{{product?.name ?? 'unknown'}}</h4>
                        <Text class="text-primary">{{ Number(product?.price)?.toFixed(2) }}</Text>
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
                  <Heading class="pt-4">Services</Heading>
                    <ul class="flex flex-col py-4 gap-1">
                      <li v-for="(service, i) in services?.data">
                        <label @click="packages = service" :class="{'bg-primary text-white' :  packages?.id === service?.id,  'bg-white text-black' :  packages?.id !== service?.id }" class=" block px-4 py-2 cursor-pointer hover:bg-primary hover:text-white">{{service?.name}}</label>
                      </li>
                    </ul>
                </div>
                <div class="w-3/4">
                  <Text v-if="packages == null" class="text-6xl font-bold text-primary-300/50 text-center pt-10">Select A Service</Text>
                  <Text v-else-if="packages?.packages?.data == 0"  class="text-2xl font-bold text-primary-500 text-center pt-20">There is no package for service {{packages?.name}}!</Text>
                  <div v-else class="flex flex-wrap py-4">
                    <div class="w-1/2 p-2" v-for="item in packages?.packages?.data">
                      <div @click="addedToCart(item)"  class="overflow-hidden group bg-white rounded-xl  shadow-md shadow-gray-200 border border-primary-300 p-4  text-center relative cursor-pointer">
                        <span class="group-hover:opacity-100 opacity-0 absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-primary-500/20 flex items-center justify-center transition-all ease-in-out duration-300">
                          <UIcon name="i-heroicons-plus-circle" class="text-4xl text-primary group-hover:mt-0 mt-10 group-hover:opacity-100 opacity-0  transition-all ease-in-out duration-500" />
                        </span>
                        <Heading>{{ Number(item?.price)?.toFixed(2) }}</Heading>
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

              <UProgress v-if="productPending" animation="carousel" size="2xs" />
              <div v-if="productPending" class="w-full flex dark:bg-slate-700 items-center justify-center py-36">
                <Icon class="text-primary-500" name="i-svg-spinners-180-ring-with-bg" size="40"/>
              </div>
            </div>
          </UCard>
        </template>
      </UTabs>
      <div class="p-4">

      </div>
    </div>
      <!--    Side Bar-->
    <div class="h-full w-1/3 bg-white shadow-lg shadow-gray-300 relative flex flex-col justify-between pb-16">
      <div>
        <div class="flex items-center justify-between p-2">
          <USelectMenu
              searchable
              searchable-placeholder="Search a Customer..."
              v-model="selectCustomer"
              :options="customer"
              placeholder="Select people"
              value-attribute="id"
              option-attribute="name"
              class="w-4/6"
              color="primary"
              size="lg"
              :loading="customerPending"
          />
          <UButton
              icon="i-heroicons-truck"
              variant="solid"
              color="primary"
              size="lg"
          />
        </div>
        <div class="flex items-center justify-between p-2 shadow">
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
      </div>
      <div class="h-full">
        <div class="p-2 overflow-y-auto pos-products">
          <!--  Selected Products     -->
          <div class="flex gap-3 p-2 rounded shadow shadow-gray-200 w-full" v-for="item in cartStore.getCartItems">
            <div class="w-1/4">
              <img v-if="item?.image" :src="item?.image" class="w-full h-20 rounded" alt="">
              <div v-else class="bg-gray-300 w-full h-20 rounded flex items-center justify-center">
                <Text class="text-gray-600 text-xl font-semibold">{{ item.type === 'product' ? 'Product' : 'Service' }}</Text>
              </div>
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
                  <p class="font-light text-sm text-gray-500">Price: <span class="text-primary font-bold">{{ Number(item?.price)?.toFixed(2) }}</span></p>
                  <p class="font-light text-sm text-gray-500">Sub Total: <span class="text-primary font-bold">{{ Number(item?.price * item?.buyQty)?.toFixed(2) }}</span></p>
                </div>
                <div class="flex items-center gap-1">
                  <UButton
                      icon="i-heroicons-minus"
                      size="2xs"
                      color="primary"
                      @click="cartStore.decrementQty(item)"
                      square
                      variant="outline"
                  />
                  <input type="text" readonly class="w-5 h-6 flex text-center outline-0 border-0 font-normal" :value="item?.buyQty">
                  <UButton
                      icon="i-heroicons-plus"
                      size="2xs"
                      color="primary"
                      square
                      @click="cartStore.addToCart(item)"
                      variant="outline"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 shadow">
        <ul class="flex flex-col gap-2">
          <li class="flex items-center justify-between">
            <Text>Sub Total</Text>
            <Text>{{ Number(cartStore.getCartTotalPrice)?.toFixed(2) }}</Text>
          </li>
<!--          <li class="flex items-center justify-between">
            <Text>Tax</Text>
            <Text>500</Text>
          </li>
          <li class="flex items-center justify-between">
            <Text>Shipping</Text>
            <Text>500</Text>
          </li>
          <li class="flex items-center justify-between border-b border-black">
            <Text>Discount</Text>
            <Text>500</Text>
          </li>-->

          <li class="flex items-center justify-between border-t">
            <Text class="text-2xl">Total</Text>
            <Text class="text-2xl">{{  Number(cartStore.getCartTotalPrice)?.toFixed(2) }}</Text>
          </li>
        </ul>
        <div class="flex items-end justify-end mt-4 gap-4">
<!--         <div class="flex items-center gap-3">
           <div class="relative">
             <UFormGroup v-if="isShipping" class="absolute w-30 -top-10 left-0" label="Shipping">
               <UInput placeholder="000"  />
             </UFormGroup>
             <UButton
                 label="Shipping"
                 variant="solid"
                 @click="isShipping = !isShipping"
             />

           </div>
           <div class="relative">
             <UFormGroup v-if="isDiscount" class="absolute w-30 -top-10 left-0" label="Discount">
               <UInput placeholder="000" />
             </UFormGroup>
             <UButton
                 label="Discount"
                 variant="solid"
                 @click="isDiscount= !isShipping"
             />
           </div>
         </div>-->
          <UButton
            label="Place Order"
            variant="solid"
            :disabled="!cartStore.getCartItems?.length"
            @click="openPlaceOrder"
          />
        </div>
      </div>
    </div>
  </div>

  <UModal v-model="isOpen" prevent-close :ui="{width: 'sm:max-w-4xl'}">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Order Summery
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
        </div>
      </template>
      <div class="p-2 overflow-y-auto pos-products">
        <!--  Selected Products     -->
        <div class="flex gap-3 p-2 rounded shadow shadow-gray-200 w-full" v-for="item in cartStore.getCartItems">
          <div class="w-1/4">
            <img v-if="item?.image" :src="item?.image" class="w-full h-20 rounded" alt="">
            <div v-else class="bg-gray-300 w-full h-20 rounded flex items-center justify-center">
              <Text class="text-gray-600 text-xl font-semibold">Service</Text>
            </div>
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
                <p class="font-light text-sm text-gray-500">Price: <span class="text-primary font-bold">{{ Number(item?.price)?.toFixed(2) }}</span></p>
                <p class="font-light text-sm text-gray-500">Sub Total: <span class="text-primary font-bold">{{ Number(item?.price * item?.buyQty)?.toFixed(2) }}</span></p>
              </div>
              <div class="flex items-center gap-1">
                <UButton
                    icon="i-heroicons-minus"
                    size="2xs"
                    color="primary"
                    @click="cartStore.decrementQty(item)"
                    square
                    variant="outline"
                />
                <input type="text" readonly class="w-5 h-6 flex text-center outline-0 border-0 font-normal" :value="item?.buyQty">
                <UButton
                    icon="i-heroicons-plus"
                    size="2xs"
                    color="primary"
                    square
                    @click="cartStore.addToCart(item)"
                    variant="outline"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-between gap-5">
          <div>
            <p class="font-light text-sm text-gray-500">Price: <span class="text-primary font-bold">{{ Number(cartStore.getCartTotalPrice)?.toFixed(2) }}</span></p>
            <p class="text-lg font-bold text-gray-500">Sub Total: <span class="text-primary font-bold">{{ Number(cartStore.getCartTotalPrice)?.toFixed(2) }}</span></p>
          </div>
          <div class="flex gap-5">
            <div class="flex flex-col gap-4 w-full">
              <UTooltip text="Total Payment Amount." :popper="{ placement: 'bottom' }">
                <UInput placeholder="Total Pay" v-model="paymentAmount" :disabled="isEditPayment">
                  <template #leading>
                    <UTooltip text="Want To Input Custom Amount?" :popper="{ placement: 'top' }">
                      <UCheckbox class="pointer-events-auto" v-model="isEditPayment" name="notifications"/>
                    </UTooltip>
                  </template>
                </UInput>
              </UTooltip>
              <UTooltip text="Total Due Amount." :popper="{ placement: 'bottom' }">
                <UInput placeholder="Total Due" class="w-full" v-model="dueAmount" disabled/>
              </UTooltip>
            </div>

            <div class="flex flex-col gap-4 w-full">
              <UTooltip :text="isEditPayment ? 'Please Select Payment Method' : 'Need Payment Method For Pay Amount'">
                <USelectMenu
                    class="w-full"
                    v-model="paymentMethod"
                    :disabled="!isEditPayment"
                    :options="['Cache', 'Bkash', 'Roket', 'Nogod', 'Bank']"
                    placeholder="Select Payment Method"
                />
              </UTooltip>
              <div class="flex justify-between">
                <UButton
                    :disabled="!paymentMethod"
                    label="Confirm Order"
                    variant="solid"
                    :loading="status === 'pending'"
                    @click="submitOrder"
                />
                <UButton
                    label="Close"
                    variant="solid"
                    color="gray"
                    @click="isOpen = false"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </UCard>
  </UModal>



  <iframe id="printing-frame" name="print_frame" src="about:blank" style="display:none;"/>

</template>


<style scoped>
.pos-products {
  max-height: calc(100vh - 345px);
  height: calc(100vh - 345px);
}
</style>