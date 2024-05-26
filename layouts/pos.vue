<script setup>

const links = [
  {
    label: 'Pos',
    url: '/pos',
    icon : {
      name: 'material-symbols:dashboard-outline',
      size: '20',
    },
  },
  {
    label: 'Dashboard',
    url: '/dashboard',
    icon : {
      name: 'material-symbols:dashboard-outline',
      size: '20',
    },
  },
  {
    label: 'Products',
    url: '/shop/products',
    icon: {
      name: 'bi:boxes',
      size: '18'
    }
  },
  {
    label: 'Services',
    url: '/services',
    icon: {
      name: 'i-heroicons-cog-6-tooth',
      size: '18'
    }
  }
]
</script>
<template>
  <div class="w-full h-screen p-4 pos">
    <GlassSection class="rounded-xl w-full h-full overflow-hidden">
      <div class="flex items-center justify-between p-3 border-b">
        <p>Welcome, <span>Tushar Imran</span> </p>

        <ul class="flex items-center gap-2 pos-nav">
          <li v-for="(link, i) in links" :key="i">
            <NuxtLink :to="link.url" class="group flex  items-center gap-2  p-2 rounded-lg transition-all ease-in-out duration-300">
              <Icon :name="link?.icon?.name" :size="link?.icon?.size" class="text-white transition-all ease-in-out duration-300 group-hover:text-primary" />
              <span class="group-hover:text-primary text-md font-normal transition-all ease-in-out duration-300">{{ link.label }}</span>
            </NuxtLink>
          </li>
        </ul>
        <UButton
            icon="i-heroicons-x-mark"
            size="md"
            color="primary"
            variant="outline"
            label="Close Terminal"
            trailing
        />
      </div>
      <slot />
    </GlassSection>
  </div>
</template>