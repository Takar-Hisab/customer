<script setup lang="ts">

import {format} from "date-fns";



const items = [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      shortcuts: ['E'],
      to: '/invoice/edit'
    },
    {
      label: 'Duplicate',
      icon: 'i-heroicons-document-duplicate-20-solid',
      shortcuts: ['D'],
    },
    {
      label: 'Download',
      icon: 'i-heroicons-arrow-down-tray',
      shortcuts: ['⌥', 'D'],
    }
  ],
  [{
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      shortcuts: ['⌘', 'D']
  }]
]

   // Columns
const columns = [{
  key: 'id',
  label: '#',
  sortable: true
}, {
  key: 'status',
  label: 'STATUS',
  sortable: true
}, {
  key: 'client',
  label: 'CLIENT',
  sortable: true
}, {
  key: 'total',
  label: 'TOTAL',
  sortable: true
}, {
  key: 'issued-date',
  label: 'ISSUED DATE',
  sortable: true
}
, {
  key: 'balance',
  label: 'BALANCE',
  sortable: true
}
, {
  key: 'action',
  label: 'ACTIONS',
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

// Actions
const actions = [
  [{
    key: 'completed',
    label: 'Completed',
    icon: 'i-heroicons-check'
  }], [{
    key: 'uncompleted',
    label: 'In Progress',
    icon: 'i-heroicons-arrow-path'
  }]
]

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

// Data
const { data: todos, pending } = await useLazyAsyncData<{
  id: number
  title: string
  completed: string
}[]>('todos', () => ($fetch as any)(`https://jsonplaceholder.typicode.com/todos${searchStatus.value}`, {
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

const isInvoice = ref(false);
const isInvoicePreview = () => {
  isInvoice.value = true;
};
</script>
<template>
  <div>
    <!-- BreadCrumb -->
      <Breadcrumb page="Invoice" icon="i-heroicons-newspaper" />
    <!-- BreadCrumb End -->

    <!--  Back Button  -->
    <BackButton />
    <!--  Back Button End  -->

    <!-- Invoce List -->
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
        <div class="flex items-center justify-between">
          <Heading>Invoice</Heading>
          <UButton
            class="hidden lg:block"
            icon="i-heroicons-pencil-square"
            size="sm"
            color="primary"
            variant="solid"
            label="Create Invoice"
            to="/invoice/create"
            :trailing="false"
          />
        </div>
        </template>

        <!-- Filters -->
        <div class="flex items-center justify-between gap-3 px-4 py-3">
        <UInput v-model="search" color="primary" size="md" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
        <USelectMenu v-model="selectedStatus" :options="todoStatus" multiple placeholder="Status" class="w-40" color="primary" size="md" />
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
            :rows="todos"
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
            <template #status-data="{ row }">
              <UPopover mode="hover" :popper="{ placement: 'top-end' }">
                <UButton
                  color="primary" variant="soft"
                  icon="i-heroicons-check"
                  :ui="{'rounded' : 'rounded-full'}"
                />
                <template #panel>
                  <div class="p-4 bg-black">
                    <div>
                        <p class="text-gray-100">Paid!</p>
                        <p class="text-gray-100">Balance : 205</p>
                        <p class="text-gray-100">Due Date : 2025-5-12</p>
                      </div>
                  </div>
                </template>
              </UPopover>
            </template>
            

            <template #action-data="{ row }">
                <div class="flex items-center gap-3">
                    <UButton
                        icon="i-heroicons-trash"
                        size="sm"
                        color="primary"
                        square
                        variant="soft"
                    />
                    <UButton
                        icon="i-heroicons-eye"
                        size="sm"
                        color="primary"
                        square
                        variant="soft"
                        @click="isInvoicePreview"
                    />
                    <UDropdown :items="items" :ui="{'ring' : 'ring-primary'}" :popper="{ placement: 'bottom-start' }">
                      <UButton color="primary" trailing-icon="i-heroicons-sparkles" variant="soft" />
                    </UDropdown>
                </div>
            </template>
            </UTable>

            <!-- Number of rows & Pagination -->
            <template #footer>
            <div class="flex flex-wrap justify-between items-center">
              
                <div>
                <span class="text-sm leading-5">
                    Showing
                    <span class="font-medium">{{ pageFrom }}</span>
                    to
                    <span class="font-medium">{{ pageTo }}</span>
                    of
                    <span class="font-medium">{{ pageTotal }}</span>
                    results
                </span>
                </div>

                <UPagination
                v-model="page"
                :page-count="pageCount"
                :total="pageTotal"
                :ui="{
                    wrapper: 'flex items-center gap-1',
                    rounded: '!rounded-full min-w-[32px] justify-center',
                    default: {
                    activeButton: {
                        variant: 'outline'
                    }
                    }
                }"
                />
            </div>
            </template>
        </UCard>
        </div>
    </div>
    <!-- Invoice List End -->

  </div>


  <UModal v-model="isInvoice" fullscreen>
    <UCard
        :ui="{
          base: 'h-screen overflow-y-scroll flex flex-col pb-10',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow'
          }
        }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Invoice
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isInvoice = false" />
        </div>
      </template>

      <!-- Template -->
      <div class="p-10 rounded-lg shadow-lg bg-white max-w-4xl mx-auto">
        <!-- Template Header -->
        <header class="flex items-center justify-between bg-gray-100 rounded-xl p-5">
          <div class="max-w-xs">
            <p class="italic font-medium text-3xl text-primary mb-4">Takar Hisab</p>
            <p>The Imperial Irish Kingdom, Mo-03 (3rd Floor), Merul Badda, Dhaka 1212</p>
          </div>
          <div class="flex flex-col items-end gap-3">
            <div class="flex items-center gap-5">
              <span>Invoice:</span>
              <p>#5050</p>
            </div>
            <div class="flex items-center gap-4">
              <span>Date Issued:</span>
              <p>5/7/2025</p>
            </div>
            <div class="flex items-center gap-4">
              <span>Due Date:</span>
              <p>5/7/2025</p>
            </div>
          </div>
        </header>
        <!-- Template Header  End-->

        <!--  Template Main  -->
        <main>
          <div class="flex py-8">
            <div class="w-1/2">
              <div>
                <div class="mt-4">
                  <p>Jhon Doe</p>
                  <p>039374 342 342</p>
                  <p>example@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div class="border rounded-lg pb-3">
            <div class="flex items-center justify-between border-b px-3 py-2">
              <p>Item</p>
              <p>Price</p>
            </div>
            <div class="flex items-center justify-between px-3 py-2 border-b" v-for="item in 5">
              <p>Web Develpment</p>
              <p>300</p>
            </div>
          </div>


          <div class="flex justify-between my-8 border-y py-6">
            <div class="flex items-center gap-4">
              <p>Salesperson: </p>
              <p>Admin</p>
            </div>
            <div class="w-40 flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <p>Subtotal</p>
                <p>000</p>
              </div>
              <div class="flex items-center justify-between">
                <p>Discount</p>
                <p>%0</p>
              </div>
              <UDivider class="my-5"  size="xs" />
              <div class="flex items-center justify-between">
                <p>Total</p>
                <p>000</p>
              </div>
            </div>
          </div>

        </main>
        <!--  Template Main End -->

        <footer>
          <div>
            <p class="mb-2">Note</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At hic minima necessitatibus provident quod rem repellat rerum sapiente totam, voluptates.</p>
          </div>
        </footer>
      </div>
      <!-- Template End -->
    </UCard>
  </UModal>
</template>