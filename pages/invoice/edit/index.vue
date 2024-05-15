<script setup lang="ts">
import { format } from 'date-fns'
definePageMeta({
  middleware: ['auth']
})

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});


const methods = [{
  id: 'benjamincanac',
  label: 'Bkash',
  target: '_blank',
  avatar: { src: 'https://www.logodee.com/wp-content/uploads/2021/10/25.jpg' }
}, {
  id: 'Atinux',
  label: 'Paypal',
  href: 'https://github.com/Atinux',
  target: '_blank',
  avatar: { src: 'https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_1280.png' }
}, {
  id: 'smarroufin',
  label: 'Nagad',
  target: '_blank',
  avatar: { src: 'https://freelogopng.com/images/all_img/1679248787Nagad-Logo.png' }
},]


const selectedMethod = ref('Select Payment method')


const people = [{
  id: 'benjamincanac',
  label: 'benjamincanac',
  href: 'https://github.com/benjamincanac',
  target: '_blank',
  avatar: { src: 'https://avatars.githubusercontent.com/u/739984?v=4' }
}, {
  id: 'Atinux',
  label: 'Atinux',
  href: 'https://github.com/Atinux',
  target: '_blank',
  avatar: { src: 'https://avatars.githubusercontent.com/u/904724?v=4' }
}, {
  id: 'smarroufin',
  label: 'smarroufin',
  href: 'https://github.com/smarroufin',
  target: '_blank',
  avatar: { src: 'https://avatars.githubusercontent.com/u/7547335?v=4' }
}, {
  id: 'nobody',
  label: 'Nobody',
  icon: 'i-heroicons-user-circle'
}]

const selected = ref(people[0])


const invoiceData = ref({
  totalPrice:0,
  items: [{
    description:null,
    price:null,
  }]
})

const addItem = () => {
  invoiceData.value.items.push({
    description: null,
    price: null,
  })
}
const removeItem = (index) => invoiceData.value.items.splice(index, 1);


const totalPrice = computed(()=>{
  let totalPrice = 0;
  invoiceData.value.items.map(item =>{
    totalPrice = totalPrice + item.price;
  })
  invoiceData.value.totalPrice = totalPrice;
  return totalPrice;
})

const terms = ref(false);
const notes = ref(false);
const stub = ref(false);

const dateIssued = ref(new Date());
const dueDate = ref(new Date());

const discountModal = ref(false);
const discountTypes = [
  {
    name: 'Fixed',
    value: 'fixed'
  },
  {
    name: 'Parcenteg',
    value: 'parcenteg',
  }
]
const discountType= ref('fixed');
const discountAmount=ref(0);
</script>
<template>
  <!-- BreadCrumb -->
    <Breadcrumb page="Edit Invoice" icon="i-heroicons-newspaper" />
  <!-- BreadCrumb End -->

  <!--  Back Button  -->
  <BackButton />
  <!--  Back Button End  -->

  <!-- Invoice SideBar -->
  <div class="fixed h-[80vh] w-72 bg-white rounded-xl shadow-lg right-5 bottom-5  p-3 flex flex-col gap-5 overflow-y-scroll transition-all ease-in-out duration-500 " :class="{'h-[95vh]' : isScrolled}">
    <span class="absolute top-0 left-0 right-0 w-full h-5 bg-primary"></span>
    <span class="absolute top-2 left-0 right-0 w-full/ h-5 bg-white z-10 rounded-t-3xl"></span>

    <div class="flex flex-col gap-5 mt-8 shadow rounded-md p-4 mb-4">
      <UButton
          icon="i-heroicons-eye"
          size="md"
          color="primary"
          variant="outline"
          label="Preview"
          :trailing="false"
          block
      />
      <UButton
          icon="i-heroicons-bookmark"
          size="md"
          color="primary"
          variant="outline"
          label="Update Invoice"
          :trailing="false"
          block
      />
    </div>

    <div>
      <p class="mb-2">Accept Payment Via</p>
      <USelectMenu v-model="selectedMethod" :options="methods" size="lg" color="primary">
        <template #leading>
          <img v-if="selectedMethod.avatar" :src="selectedMethod.avatar.src" alt="" class="w-6 h-6 rounded-full">
        </template>
      </USelectMenu>
    </div>

    <div class="py-5">
      <ul class="flex flex-col gap-3">
        <li class="flex items-center justify-between">
          <p class="text-lg">Payment Terms</p>
          <UToggle
              on-icon="i-heroicons-check-20-solid"
              off-icon="i-heroicons-x-mark-20-solid"
              v-model="terms"
              size="lg"
          />
        </li>
        <li class="flex items-center justify-between">
          <p class="text-lg">Client Notes</p>
          <UToggle
              on-icon="i-heroicons-check-20-solid"
              off-icon="i-heroicons-x-mark-20-solid"
              v-model="notes"
              size="lg"
          />
        </li>
        <li class="flex items-center justify-between">
          <p class="text-lg">Payment Stub</p>
          <UToggle
              on-icon="i-heroicons-check-20-solid"
              off-icon="i-heroicons-x-mark-20-solid"
              v-model="stub"
              size="lg"
          />
        </li>

      </ul>
    </div>
  </div>
  <!-- Invoice SideBar End -->


  <!-- Template Wrapper -->
  <div class="mr-80">
    <!-- Template -->
    <div class="p-10 rounded-lg shadow-lg bg-white">
      <!-- Template Header -->
      <header class="flex items-center justify-between bg-gray-100 rounded-xl p-5">
        <div class="max-w-xs">
          <p class="italic font-medium text-3xl text-primary mb-4">Takar Hisab</p>
          <p>The Imperial Irish Kingdom, Mo-03 (3rd Floor), Merul Badda, Dhaka 1212</p>
        </div>
        <div class="flex flex-col items-end gap-3">
          <div class="flex items-center gap-5">
            <span>Invoice:</span>
            <UBadge size="lg" color="gray" variant="solid"># 5050</UBadge>
          </div>
          <div class="flex items-center gap-4">
            <span>Date Issued:</span>
            <UPopover :popper="{ placement: 'bottom-start' }">
              <UButton
                  icon="i-heroicons-calendar-days-20-solid"
                  :label="format(dateIssued, 'd MMM, yyy')"
                  variant="outline"
              />
              <template #panel="{ close }">
                <DatePicker v-model="dateIssued" is-required @close="close" />
              </template>
            </UPopover>
          </div>
          <div class="flex items-center gap-4">
            <span>Due Date:</span>
            <UPopover :popper="{ placement: 'bottom-start' }">
              <UButton
                  icon="i-heroicons-calendar-days-20-solid"
                  :label="format(dueDate, 'd MMM, yyy')"
                  variant="outline"
              />

              <template #panel="{ close }">
                <DatePicker v-model="dueDate" is-required @close="close" />
              </template>
            </UPopover>
          </div>
        </div>
      </header>
      <!-- Template Header  End-->

      <!--  Template Main  -->
      <main>
        <div class="flex py-8">
          <div class="w-1/2">
            <div>
              <div>
                <p class="mb-3">Invoice To:</p>
                <USelectMenu v-model="selected" :options="people" size="lg" color="primary">
                  <template #leading>
                    <UAvatar  v-bind="(selected.avatar as Avatar)" size="2xs" />
                  </template>
                </USelectMenu>
              </div>
              <div class="mt-4">
                <p>Jhon Doe</p>
                <p>039374 342 342</p>
                <p>example@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-5"  v-for="(item, index) in invoiceData.items">
          <div class="flex items-center mb-2">
            <p class="w-4/5">Item</p>
            <p class="w-1/5">Price</p>
          </div>
          <div class="w-full h-auto rounded border border-primary flex p-3">
            <div class="w-4/5 pr-2">
              <div class="flex mb-3">
                <div class="w-1/2 pr-2">
                  <USelectMenu  size="lg" color="primary" placeholder="Select Service" />
                </div>
                <div  class="w-1/2 pl-2">
                  <USelectMenu  size="lg" color="primary" placeholder="Select Package" />
                </div>
              </div>
              <UTextarea
                  :rows="4"
                  color="primary"
                  variant="outline"
                  placeholder="Custom"
                  v-model="invoiceData.items[index].description"
              />
            </div>
            <div class="w-1/5 pl-2 flex flex-col gap-3">
              <UInput
                  icon="i-heroicons-currency-bangladeshi"
                  color="primary"
                  variant="outline"
                  placeholder="Price"
                  size="lg"
                  v-model="invoiceData.items[index].price"
              />
              <UButton
                  icon="i-heroicons-pencil-square"
                  size="lg"
                  color="primary"
                  variant="outline"
                  label="Remove"
                  :trailing="false"
                  block
                  @click="removeItem(index)"
              />
            </div>
          </div>
        </div>

        <div class="mt-4 text-right">
          <UButton
              icon="i-heroicons-plus"
              size="sm"
              color="primary"
              variant="solid"
              label="Add Item"
              :trailing="false"
              @click="addItem"
          />
        </div>


        <div class="flex justify-between my-8 border-y py-6">
          <div class="flex items-center gap-4">
            <p class="mb-3">Salesperson</p>
            <USelectMenu v-model="selected" :options="people" size="lg" color="primary">
              <template #leading>
                <UAvatar  v-bind="(selected.avatar as Avatar)" size="2xs" />
              </template>
            </USelectMenu>
          </div>
          <div class="w-60 flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <p>Subtotal</p>
              <UButton
                  class="cursor-default max-w-40 overflow-scroll"
                  icon="i-heroicons-currency-bangladeshi"
                  size="sm"
                  color="gray"
                  variant="solid"
              >{{totalPrice}}</UButton>
            </div>
            <div class="flex items-center justify-between">
              <p>Discount</p>
              <UButton
                  class="max-w-40"
                  size="sm"
                  color="gray"
                  variant="solid"
                  @click="discountModal = true"
              >
                <span v-if="discountType === 'fixed'">
                  <Icon  name="i-heroicons-currency-bangladeshi"  size="20" class="text-gray-600"/> {{discountAmount}}
                </span>
                <span v-else>
                  <Icon name="nimbus:discount-circle"  size="18" class="text-gray-500"/> {{discountAmount}}
                </span>

              </UButton>
            </div>
            <UDivider class="my-5"  size="xs" />
            <div class="flex items-center justify-between">
              <p>Total</p>
              <UButton
                  class="cursor-default max-w-40"
                  icon="i-heroicons-currency-bangladeshi"
                  size="sm"
                  color="gray"
                  variant="solid"
                  label="5000"
                  :trailing="false"
              />
            </div>
          </div>
        </div>

      </main>
      <!--  Template Main End -->

      <footer>
        <div>
          <p class="mb-2">Note</p>
          <UTextarea :rows="4" placeholder="Write Note ere.." />
        </div>
      </footer>
    </div>
    <!-- Template End -->
  </div>
  <!-- Template Wrapper End -->



  <!-- Discount Modal -->
  <UModal v-model="discountModal" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Edit Discount
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="discountModal = false" />
        </div>
      </template>

      <div class="flex justify-between">
        <div class="w-1/2 px-1">
          <label class="mb-2 block">Discount Type:</label>
          <USelect
              color="primary"
              variant="outline"
              :options="discountTypes"
              v-model="discountType"
              option-attribute="name"
          />
        </div>
        <div class="w-1/2 px-1">
          <label  class="mb-2 block">Discount Amount: </label>
          <UInput color="primary" variant="outline" v-model="discountAmount" />
        </div>
      </div>
      <div class="text-end pt-4">
        <UButton label="save" @click="discountModal = false" />
      </div>
    </UCard>
  </UModal>
</template>