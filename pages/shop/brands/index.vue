<script setup lang="ts">

definePageMeta({
  middleware: ['auth']
})
    // Columns
  const columns = [{
    key: 'name',
    label: 'Name',
    sortable: true
  },
    {
      key:'updated_at',
      label: 'Last Update',
      sortable: true,
    }
  , {
    key: 'action',
    label: 'Action',
    sortable: true
  }]

  const isOpen = ref(false);



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

  //get Brands
    const { data: brands, error, pending, refresh } = useLazyAsyncData(
        'brands',
        () => $fetch( `/brand`, {
          method: 'GET',
          baseURL: useRuntimeConfig().public.baseUrl,
          headers: {
            authorization: `Bearer ${useTokenStore().customer_token}`
          }
        }));
    onMounted(() => {
      refresh()
    })
</script>

<template>
    <!-- BreadCrumb -->
      <Breadcrumb page="Product brands" icon="i-heroicons-list-bullet" />
    <!-- BreadCrumb End -->

    <!--  Back Button  -->
    <BackButton />
    <!--  Back Button End  -->

    <!-- Brand -->
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
              <Heading>Product Brands</Heading>
              <UButton
                  class="hidden lg:flex"
                  icon="i-heroicons-pencil-square"
                  size="sm"
                  color="primary"
                  variant="solid"
                  label="Add New"
                  :trailing="false"
                  @click="isOpen = true"
              />
            </div>
          </template>
          


        <!-- Filters -->
        <div class="flex items-center justify-between gap-3 px-4 py-3">
        <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
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
                color="gray"
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
            :rows="brands?.data"
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
            <template #completed-data="{ row }">
                <UBadge size="xs" :label="row.completed ? 'Completed' : 'In Progress'" :color="row.completed ? 'emerald' : 'orange'" variant="subtle" />
            </template>


            <template #action-data="{ row }">
                <div class="flex items-center gap-3">
                    <UButton
                        icon="i-heroicons-pencil-square"
                        size="sm"
                        color="primary"
                        square
                        variant="soft"
                    />
                    <UButton
                        icon="i-heroicons-trash"
                        size="sm"
                        color="primary"
                        square
                        variant="soft"
                    />
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
    <!-- Brand End -->


  <USlideover v-model="isOpen" >
    <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Add New Brand
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
        </div>
      </template>

      <UForm>
        <UFormGroup label="Name" class="mb-5">
          <UInput placeholder="Brand Name" color="primary" size="lg"  />
        </UFormGroup>
        <UFormGroup label="Logo" class="mb-5">
          <UInput type="file" size="lg" icon="i-heroicons-folder" color="primary" />
        </UFormGroup>
        <div class="flex items-center gap-3 mt-5">
          <UButton
              size="lg"
              color="primary"
              variant="solid"
              label="Save"
          />
          <UButton
              size="lg"
              color="primary"
              variant="outline"
              label="Cancel"
          />
        </div>
      </UForm>
    </UCard>
  </USlideover>
</template>