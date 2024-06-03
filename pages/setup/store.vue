<template>
  <div class="container mx-auto">
    <div>
      <h2>Header</h2>
    </div>
    <div class="grid grid-cols-12 gap-7 mt-20">
      <div class="col-span-4">
        <div class="">
          <ul class="flex flex-col gap-3">
            <li class="bg-slate-100 px-4 py-5 rounded-md" v-for="item in menus">
              <div class="flex justify-between items-center">
                <span class="font-semibold text-2xl capitalize text-slate-700">{{ item.name }}</span>
                <Icon name="i-ic-baseline-arrow-forward-ios" size="25" class="font-bold text-slate-700"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-span-8">
        <div class="bg-slate-100 p-5 rounded-md">
          <p class="text-slate-700 text-3xl font-bold border-b pb-3">Setup Your Store</p>

          <div>
            <div>
              <UFormGroup class="w-full" name="price" label="Select Plan *">
                <USelect v-model="state.plan" option-attribute="name" value-attribute="id" placeholder="select plan..." :options="plans ?? []" />
                <span v-if="error?.data?.errors?.plan" class="text-red-500 font-semibold" v-text="error?.data?.errors?.plan[0]"/>
              </UFormGroup>
              <UFormGroup>
                <UInput placeholder="Store Name" size="lg"/>
                <UInput placeholder="Store Name" size="lg"/>
              </UFormGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
definePageMeta({
  layout:"guest"
})

const search = ref(null)
const isOpen = ref(false)
const page = ref(0)
const sort = ref(false)

const state = reactive({
  plan: undefined,
  qty: 1,
  paymentMethod:undefined,
})


const menus = reactive([
  {
    name: 'General Setting',
  },
  {
    name: 'Setup Store',
  },
  {
    name: 'Shop Setting'
  }
])

</script>