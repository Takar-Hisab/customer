<script setup lang="ts">

</script>

<template>
  <div class="flex lg:gap-5 app">
    <Sidebar  />
    <div class="w-full lg:ml-64 p-5">
      <Topbar />
      <main class="py-10 lg:py-0 min-h-screen">
        <slot />
      </main>
      <p class="pt-5">&copy;{{ new Date().getFullYear() }} <a href="https://creativetechpark.com" target="_blank" class="text-primary">Creative Tech Park</a></p>
    </div>
    <div class="lg:hidden">
      <MobileMenu />
    </div>
  </div>
</template>
