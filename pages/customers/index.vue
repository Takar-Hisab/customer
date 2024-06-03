<script setup lang="ts">

  const actionLinks = [
  [
    {
      label: 'View',
      icon: 'i-heroicons-eye',
      shortcuts: ['V'],
      click: () => {
        console.log('Edit')
      }
    },
    {
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    shortcuts: ['E'],
    click: () => {
      console.log('Edit')
    }
  }],
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    shortcuts: ['⌘', 'D']
  }]
  ]

// Columns
const columns = [{
  key: 'name',
  label: 'Name',
  sortable: true
}, {
  key: 'email',
  label: 'Email',
  sortable: true
}
, {
  key: 'phone',
  label: 'Phone',
  sortable: true
}
, {
  key: 'action',
  label: 'Action',
  sortable: true
}]

const selectedColumns = ref(columns)
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))

// Selected Rows
const selectedRows = ref([])

function select (row) {
  const index = selectedRows.value.findIndex((item) => item.id === row.id)
  if (index === -1) {
    selectedRows.value.push(row)
  } else {
    selectedRows.value.splice(index, 1)
  }
}



// Filters
const todoStatus = [{
  key: 'uncompleted',
  label: 'In Progress',
  value: false
}, {
  key: 'completed',
  label: 'Completed',
  value: true
}]

const search = ref('')
const selectedStatus = ref([])
const searchStatus = computed(() => {
  if (selectedStatus.value?.length === 0) {
    return ''
  }

  if (selectedStatus?.value?.length > 1) {
    return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`
  }

  return `?completed=${selectedStatus.value[0].value}`
})

const resetFilters = () => {
  search.value = ''
  selectedStatus.value = []
}

// Pagination
const sort = ref({ column: 'id', direction: 'asc' as const })
const page = ref(1)
const pageCount = ref(10)
const pageTotal = ref(200) // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))
const toast = useToast()
// Data
const { data: customers, pending, refresh } = await useLazyAsyncData<{
  id: number
  title: string
  completed: string
}[]>('customers', () => ($fetch as any)(`/customers`, {
  method: 'GET',
  baseURL: useRuntimeConfig().public.baseUrl,
  headers: {
    authorization: `Bearer ${useTokenStore().customer_token}`
  },
  query: {
    q: search.value,
    '_page': page.value,
    '_limit': pageCount.value,
    '_sort': sort.value.column,
    '_order': sort.value.direction
  }
}), {
  default: () => [],
  watch: [page, search, searchStatus, pageCount, sort]
})


const isOpen = ref(false)
const state = reactive({
  name: undefined,
  email:undefined,
  phone:undefined,
  password:undefined,
  address:undefined,
})





  const form = ref()
  const clearForm = () => form.value.reset();
  const clearNotification = () => errorCreateCustomer.value = null;

  const onSubmit = async () => {
    clearNotification()
    await execute();

    if (data.value) {
      toast.add({title: "Data Save Successfully Done..."})
      refresh()
      isOpen.value = false
    }
    if (errorCreateCustomer.value) {
      toast.add({title: errorCreateCustomer.value.data.message, color: "red"})
    }
  };

  const {data, status, execute, error:errorCreateCustomer, pending:createCustomerPending} = useAsyncData(
      async () => {
        return await $fetch(`/customers`, {
          baseURL: useRuntimeConfig().public?.baseUrl,
          headers:{
            Authorization: `Bearer ${useTokenStore().customer_token}`
          },
          method: "POST",
          body: state,
        });
      },
      {
        immediate: false,
      }
  );

onMounted(() => {
  refresh()
})
</script>
<template>
  <!-- BreadCrumb -->
    <Breadcrumb page="Customers" icon="i-heroicons-user-group" />
  <!-- BreadCrumb End -->

  <!--  Back Button  -->
  <BackButton />
  <!--  Back Button End  -->

  <!-- Customer Table -->
  <div>
    <div class="p-4 bg-white rounded-xl shadow-lg">
      <UCard
    class="w-full"
    :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      header: { padding: 'px-4 py-5' },
      body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
      footer: { padding: 'p-4' }
    }"
  >
    <template #header>
      <Heading>
        Store Customers
      </Heading>
    </template>

    <!-- Filters -->
    <div class="flex items-center justify-between gap-3 px-4 py-3">
      <UInput v-model="search" size="md" color="primary" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />

      <UButton
          icon="i-heroicons-plus-16-solid"
          label="Add Customer"
          @click="isOpen = true"
      />
    </div>

    <!-- Header and Action buttons -->
    <div class="flex flex-col lg:flex-row justify-between items-center w-full px-4 py-3">
      <div class="flex items-center gap-1.5 mb-4">
        <span class="text-sm leading-5">Rows per page:</span>

        <USelect
          v-model="pageCount"
          :options="[3, 5, 10, 20, 30, 40]"
          class="me-2 w-20"
          size="xs"
        />
      </div>

      <div class="flex gap-1.5 items-center">
        <USelectMenu v-model="selectedColumns" :options="columns" multiple>
          <UButton
            icon="i-heroicons-view-columns"
            color="primary"
            size="xs"
          >
            Columns
          </UButton>
        </USelectMenu>

        <UButton
          icon="i-heroicons-funnel"
          color="gray"
          size="xs"
          :disabled="search === '' && selectedStatus.length === 0"
          @click="resetFilters"
        >
          Reset
        </UButton>
      </div>
    </div>
    <!-- Table -->
    <UTable
      v-model="selectedRows"
      v-model:sort="sort"
      :rows="customers?.data"
      :columns="columnsTable"
      :loading="pending"
      sort-asc-icon="i-heroicons-arrow-up-20-solid"
      sort-desc-icon="i-heroicons-arrow-down-20-solid"
      :sort-button="{ icon: 'i-heroicons-sparkles-20-solid', color: 'primary', variant: 'outline', size: '2xs', square: false, ui: { rounded: 'rounded-full' } }"
      sort-mode="manual"
      class="w-full"
      :ui="{ td: { base: 'max-w-[0] truncate' }, default: { checkbox: { color: 'gray' } } }"
      @select="select"
    >
      <template #name-data="{ row }">
        <div class="flex items-center gap-2">
          <UAvatar
              chip-color="primary"
              chip-text=""
              chip-position="top-right"
              size="sm"
              class="ring-2 ring-primary-400 ring-offset-2"
              :src="row?.avatar"
              alt="Avatar"
          />
          <h4>{{ row?.name }}</h4>
        </div>
      </template>

      <template #email-data="{ row }">
        <p>{{ row?.email }}</p>
      </template>

      <template #phone-data="{ row }">
        <p>{{ row?.phone }}</p>
      </template>


      <template #action-data="{ row }">
        <UDropdown :items="actionLinks" :ui="{'ring' : 'ring-primary'}" :popper="{ placement: 'bottom-start' }">
          <UButton color="primary"  trailing-icon="i-heroicons-sparkles" variant="soft" />
        </UDropdown>
      </template>
    </UTable>

    <!-- Number of rows & Pagination -->
    <template #footer>
      <div class="flex flex-wrap justify-between items-center">
        <div>

          <span class="text-sm leading-5">
            Showing
            <span class="font-medium">{{ customers?.meta?.from }}</span>
            to
            <span class="font-medium">{{ customers?.meta?.to }}</span>
            of
            <span class="font-medium">{{ customers?.meta?.total }}</span>
            results
          </span>
        </div>
        <UPagination v-model="page" :page-count="customers?.meta?.per_page" :total="customers?.meta?.total" />
      </div>
    </template>
  </UCard>
    </div>
  </div>


  <UModal v-model="isOpen" prevent-close :ui="{width: 'sm:max-w-4xl'}">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Customer Details
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
        </div>
      </template>
      <div class="overflow-y-auto pos-products bg-slate-100 p-5 rounded-md">
        <div class="mt-4">
          <div class="flex w-full items-center gap-4 mt-8">
            <UFormGroup class="w-full" name="name" label="Name *">
              <UInput class="border-none" v-model="state.name" size="md"/>
              <span v-if="errorCreateCustomer?.data?.errors?.name" class="text-red-500 font-semibold" v-text="errorCreateCustomer?.data?.errors?.name[0]"/>
            </UFormGroup>

            <UFormGroup class="w-full" name="price" label="Email *">
              <UInput type="email" inputClass="border-none" v-model="state.email" size="md"/>
              <span v-if="errorCreateCustomer?.data?.errors?.email" class="text-red-500 font-semibold" v-text="errorCreateCustomer?.data?.errors?.email[0]"/>
            </UFormGroup>
          </div>
          <div class="flex w-full items-center gap-4 mt-5">
            <UFormGroup class="w-full" name="name" label="Phone *">
              <UInput class="border-none" v-model="state.phone" size="md"/>
              <span v-if="errorCreateCustomer?.data?.errors?.phone" class="text-red-500 font-semibold" v-text="errorCreateCustomer?.data?.errors?.phone[0]"/>
            </UFormGroup>

            <UFormGroup class="w-full" name="name" label="Password *">
              <UInput class="border-none" v-model="state.password" size="md" />
              <span v-if="errorCreateCustomer?.data?.errors?.password" class="text-red-500 font-semibold" v-text="errorCreateCustomer?.data?.errors?.password[0]"/>
            </UFormGroup>
          </div>
          <div class="mt-5">
            <UFormGroup class="w-full" name="name" label="Address *">
              <UTextarea class="border-none" v-model="state.address" size="md" />
              <span v-if="errorCreateCustomer?.data?.errors?.address" class="text-red-500 font-semibold" v-text="errorCreateCustomer?.data?.errors?.address[0]"/>
            </UFormGroup>
          </div>
          <div class="w-full flex items-end justify-end mt-10">
            <UButton variant="soft" color="red" size="md" class="w-[15%] me-2 shadow-md" block @click="isOpen = false">
              Close
            </UButton>
            <UButton :loading="status === 'pending'" @click="onSubmit" type="submit" class="w-[15%] shadow-md" block size="md">
              Submit
            </UButton>
          </div>
        </div>
      </div>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
</script>