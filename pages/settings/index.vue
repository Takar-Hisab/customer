<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

  const items = [
    {
      key:'general',
      label: 'General',
    },
    {
      key: 'store',
      label: 'store',
    }
  ]
</script>

<template>
  <!-- Back Button  -->
  <BackButton />
  <!-- Back Button  -->

  <!-- BreadCrumb -->
    <Breadcrumb page="Settings" icon="i-heroicons-cog-6-tooth" />
  <!-- BreadCrumb End -->

  <UTabs :items="items"  >
    <template #item="{ item }">
      <div v-if="item.key== 'general'">
        <div class="bg-white shadow-lg rounded-2xl p-5">
          <Heading class="mb-5">General</Heading>
          <!-- Logo -->
          <div class="flex flex-row lg:-mx-3">
            <div class="w-full lg:w-1/3  lg:px-2 mb-4 lg:mb-0">
              <div class="p-3 border rounded-xl">
                <Heading>Logo Light</Heading>
                <div class="border border-dashed border-primary-500 rounded-2xl  my-4  h-40 my-4 flex items-center justify-center">
                  <UIcon name="i-heroicons-photo" class="text-4xl opacity-10 text-primary"  />
                  <img src="" alt="">
                </div>
                <div>
                  <label for="logo-light" class="bg-primary px-4 py-2 text-white rounded-xl cursor-pointer inline-flex items-center gap-3">
                    <UIcon name="i-heroicons-arrow-up-tray" />
                    Choose File
                    <input type="file" id="logo-light" hidden>
                  </label>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/3  lg:px-2 mb-4 lg:mb-0">
              <div class="p-3 border rounded-xl">
                <Heading>Logo Dark</Heading>
                <div class="border border-dashed border-primary-500 rounded-2xl my-4 h-40 my-4 flex items-center justify-center">
                  <UIcon name="i-heroicons-photo" class="text-4xl opacity-10 text-primary"  />
                  <img src="" alt="">
                </div>
                <div>
                  <label for="logo-light" class="bg-primary px-4 py-2 text-white rounded-xl cursor-pointer inline-flex items-center gap-3">
                    <UIcon name="i-heroicons-arrow-up-tray" />
                    Choose File
                    <input type="file" id="logo-light" hidden>
                  </label>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/3  lg:px-2 mb-4 lg:mb-0">
              <div class="p-3 border rounded-xl">
                <Heading>Fav Icon</Heading>
                <div class="border border-dashed border-primary-500 rounded-2xl h-40 my-4 flex items-center justify-center">
                  <UIcon name="i-heroicons-photo" class="text-4xl opacity-10 text-primary"  />
                  <img src="" alt="">
                </div>
                <div>
                  <label for="logo-light" class="bg-primary px-4 py-2 text-white rounded-xl cursor-pointer inline-flex items-center gap-3">
                    <UIcon name="i-heroicons-arrow-up-tray" />
                    Choose File
                    <input type="file" id="logo-light" hidden>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <!-- Logo End -->

          <!-- Text and Time  -->
          <div class="flex flex-wrap py-8">
            <div class="w-full lg:w-1/2 p-2 lg:p-4">
              <UFormGroup label="Title Text">
                <UInput size="lg" color="primary"  />
              </UFormGroup>
            </div>
            <div class="w-full lg:w-1/2 p-2 lg:p-4">
              <UFormGroup label="Footer Text">
                <UInput  size="lg" color="primary" />
              </UFormGroup>
            </div>
            <div class="w-full lg:w-1/22 p-2 lg:p-4">
              <UFormGroup label="Date Formate">
                <USelectMenu size="lg" color="primary"/>
              </UFormGroup>
            </div>
            <div class="w-full lg:w-1/2 p-2 lg:p-4">
              <UFormGroup label="Time Formate">
                <USelectMenu size="lg" color="primary"/>
              </UFormGroup>
            </div>
          </div>
          <!-- Text and Time End  -->


          <div class="mb-5">
            <UButton
                size="xl"
                color="primary"
                variant="solid"
                label="Save Changes"
            />
          </div>
        </div>
      </div>
      <div v-if="item.key== 'store'">
        <div class="bg-white shadow-lg rounded-2xl p-5">
          <Heading class="mb-5">Store</Heading>
          <!-- Logo -->
          <div class="flex flex-row lg:-mx-3">
            <div class="w-full lg:w-1/3  lg:px-2">
              <div class="p-3 border rounded-xl">
                <Heading>Store Logo</Heading>
                <div class="border border-dashed border-primary-500 rounded-2xl  my-4  h-40 my-4 flex items-center justify-center">
                  <UIcon name="i-heroicons-photo" class="text-4xl opacity-10 text-primary"  />
                  <img src="" alt="">
                </div>
                <div>
                  <label for="logo-light" class="bg-primary px-4 py-2 text-white rounded-xl cursor-pointer inline-flex items-center gap-3">
                    <UIcon name="i-heroicons-arrow-up-tray" />
                    Choose File
                    <input type="file" id="logo-light" hidden>
                  </label>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/3  lg:px-2">
              <div class="p-3 border rounded-xl">
                <Heading>Invoice Logo</Heading>
                <div class="border border-dashed border-primary-500 rounded-2xl h-40 my-4 flex items-center justify-center">
                  <UIcon name="i-heroicons-photo" class="text-4xl opacity-10 text-primary"  />
                  <img src="" alt="">
                </div>
                <div>
                  <label for="logo-light" class="bg-primary px-4 py-2 text-white rounded-xl cursor-pointer inline-flex items-center gap-3">
                    <UIcon name="i-heroicons-arrow-up-tray" />
                    Choose File
                    <input type="file" id="logo-light" hidden>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <!-- Logo End -->

          <!-- Store  Detail  -->
          <div class="flex flex-wrap py-8">
            <div class="w-full lg:w-1/2 lg:p-4">
              <UFormGroup label="Store Name">
                <UInput size="lg" color="primary"  />
              </UFormGroup>
            </div>
            <div class="w-full lg;w-1/3  lg:px-4">
              <UFormGroup label="Email">
                <UInput  size="lg" color="primary" />
              </UFormGroup>
            </div>
            <div class="w-full lg;w-1/3  lg:px-4">
              <UFormGroup label="Store Link">
                <UInput  size="lg" color="primary" />
              </UFormGroup>
            </div>
          </div>
          <!-- Store Detail  -->

          <!--  Store Detail  -->
          <div class="flex flex-wrap">
            <div class="w-full lg:w-1/3 lg:p-4">
              <UFormGroup label="Tagline">
                <UInput  size="lg" color="primary" />
              </UFormGroup>
            </div>
            <div class="w-full  lg:w-1/3 lg:p-4">
              <UFormGroup label="Address">
                <UInput  size="lg" color="primary" />
              </UFormGroup>
            </div>
            <div class="w-full  lg:w-1/3 lg:p-4">
              <UFormGroup label="City">
                <UInput  size="lg" color="primary" />
              </UFormGroup>
            </div>
            <div class="w-full  lg:w-1/3 lg:p-4">
              <UFormGroup label="State">
                <UInput  size="lg" color="primary" />
              </UFormGroup>
            </div>
            <div class="w-full  lg:w-1/3  lg:p-4">
              <UFormGroup label="Zipcode">
                <UInput  size="lg" color="primary" />
              </UFormGroup>
            </div>
            <div class="w-full lg:w-1/3 lg:p-4">
              <UFormGroup label="Country">
                <UInput  size="lg" color="primary" />
              </UFormGroup>
            </div>
          </div>
          <!--  Store Detail End  -->

          <div class="my-5">
            <UButton
                size="xl"
                color="primary"
                variant="solid"
                label="Save Changes"
            />
          </div>
        </div>
      </div>
    </template>
  </UTabs>
</template>

