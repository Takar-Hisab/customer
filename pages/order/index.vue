<script setup lang="ts">
import { format } from 'date-fns'

definePageMeta({
  middleware: ['auth']
})

// Columns
const columns = [{
  key: 'order_id',
  label: 'ORDER ID',
  sortable: true
}, {
  key: 'order_date',
  label: 'DATE',
  sortable: true
}, {
  key: 'name',
  label: 'NAME',
  sortable: true
},

  {
    key: 'amount',
    label: 'AMOUNT',
    sortable: true
  },
  {
    key: 'payment',
    label: 'PAYMENT',
    sortable: true
  },
  , {
    key: 'order',
    label: 'ORDER',
    sortable: true
  },
  , {
    key: 'action',
    label: 'Action',
    sortable: true
  }
  ]

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

// Data
const { data: orders, pending, refresh } = await useLazyAsyncData
('orders', () => ($fetch as any)(`/order`, {
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

onMounted(() => {
  refresh()
  console.log(orders);
})
</script>
<template>
  <!-- BreadCrumb -->
  <Breadcrumb page="Order" icon="i-heroicons-shopping-bag" />
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
          <Heading>Orders</Heading>
        </template>

        <!-- Filters -->
        <div class="flex items-center justify-between gap-3 px-4 py-3">
          <UInput v-model="search" size="md" color="primary" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
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
            :rows="orders?.data"
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
          <template #order_id-data="{ row }" >
            <UTooltip text="Detail" :popper="{ placement: 'top'}" :ui="{ background : 'bg-primary', color: 'text-white'}">
              <NuxtLink to="/">
                <UBadge variant="outline" size="lg" :label="`${row?.order_id?.substring(0, 12)}..`" />
              </NuxtLink>
            </UTooltip>
          </template>
          <template #name-data="{ row }">
            <span>{{ row?.customer?.name }}</span>
          </template>

          <template #order-data="{row}" >
            <UPopover mode="hover" :popper="{ placement: 'top' }">
              <UButton variant="soft":ui="{rounded:'rounded-full'}"  square>
                <Icon name="material-symbols:fitbit-check-small-sharp" size="20" />
              </UButton>
              <template #panel>
                <div class="bg-primary p-2">
                  <p class="text-white">Type: {{row?.order_type}}</p>
                  <p class="text-white">Status: {{row?.order_status}}</p>
                </div>
              </template>
            </UPopover>
          </template>

          <template #amount-data="{row}" >
            <UPopover mode="hover" :popper="{ placement: 'top' }">
              <UButton variant="soft":ui="{rounded:'rounded-full'}"  square>
                <Icon name="material-symbols:fitbit-check-small-sharp" size="20" />
              </UButton>
              <template #panel>
                <div class="bg-primary p-2">
                  <p class="text-white">Pay Bill: {{row?.pay_bill}}</p>
                  <p class="text-white">Pay Due: {{row?.pay_due}}</p>
                  <p class="text-white">Grand Total: {{row?.grand_total}}</p>
                </div>
              </template>
            </UPopover>
          </template>

          <template #payment-data="{row}" >
            <UPopover mode="hover" :popper="{ placement: 'top' }">
              <UButton variant="soft":ui="{rounded:'rounded-full'}"  square>
                <Icon name="material-symbols:fitbit-check-small-sharp" size="20" />
              </UButton>
              <template #panel>
                <div class="bg-primary p-2">
                  <p class="text-white">Method: {{row?.payment_method}}</p>
                  <p class="text-white">Status: {{row?.payment_status}}</p>
                </div>
              </template>
            </UPopover>
          </template>


          <template #completed-data="{ row }">
            <UBadge size="xs" :label="row.completed ? 'Completed' : 'In Progress'" :color="row.completed ? 'emerald' : 'orange'" variant="subtle" />
          </template>


          <template #action-data="{ row }">
            
              <div class="text-center">
                <UTooltip text="Detail" :popper="{ placement: 'top'}" :ui="{ background : 'bg-primary', color: 'text-white'}">
                <UButton
                    icon="i-heroicons-eye"
                    variant="soft"
                    :to="`/order/${row?.id}`"
                />
              </UTooltip>
              </div>
              <!-- <UTooltip text="Delete" :popper="{ placement: 'top'}" :ui="{ background : 'bg-primary', color: 'text-white'}">
                <UButton
                    icon="i-heroicons-trash-20-solid"
                    variant="soft"
                />
              </UTooltip> -->
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
</template>
<script setup lang="ts">
</script>