<script setup lang="ts">
const router = useRoute();

</script>
<template>

  <!--  Back Button  -->
  <BackButton />
  <!--  Back Button End  -->

  <div class="flex items-center justify-between  pt-4 pb-8">
    <Heading>Packages</Heading>
    <div class="flex items-center gap-3">
      <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="md"
          color="primary"
          :trailing="false"
          placeholder="Search..."
      />

      <UButton
          class="hidden lg:block"
          icon="i-heroicons-plus"
          size="md"
          color="primary"
          variant="solid"
          label="Add Package"
          :trailing="false"
      />
    </div>
  </div>

  <div class="flex flex-wrap lg:-px-3">
    <div class="w-full lg:w-1/3 mb-5 lg:px-3" v-for="service in 10">
      <div class="bg-white rounded-xl  shadow-md shadow-gray-200 border border-primary-300 p-4  text-center">
        <Heading>15000</Heading>
        <Heading>Informative Website Package 1 (WordPress)</Heading>
        <ul class="flex flex-col gap-2 py-5">
          <li>
            <Text>1 Domain (.com .net .org .info)</Text>
          </li>
          <li>
            <Text>Web Hosting - 5 GB</Text>
          </li>
          <li>
            <Text>Monthly Data Transfer - 50 GB</Text>
          </li>
          <li>
            <Text>1 Domain (.com .net .org .info)</Text>
          </li>
          <li>
            <Text>Web Hosting - 5 GB</Text>
          </li>
          <li>
            <Text>Monthly Data Transfer - 50 GB</Text>
          </li>
        </ul>
        <Text>Position: 10</Text>
      </div>
    </div>
  </div>
</template>