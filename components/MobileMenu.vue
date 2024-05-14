<script setup lang="ts">
const items = [
[{
  label: 'ben@example.com',
  slot: 'account',
  disabled: true
}], [{
  label: 'Settings',
  icon: 'i-heroicons-cog-8-tooth'
}], [{
  label: 'Documentation',
  icon: 'i-heroicons-book-open'
}, {
  label: 'Changelog',
  icon: 'i-heroicons-megaphone'
}, {
  label: 'Status',
  icon: 'i-heroicons-signal'
}], [{
  label: 'Sign out',
  icon: 'i-heroicons-arrow-left-on-rectangle'
}]
]

const isShopLinks = ref(false);

const isMainMenu = ref(false);
</script>
<template>

<!-- Menu Links -->
    <div  class="transition-all ease-in-out  fixed  w-full h-screen top-0 left-0 right-0 bottom-0  bg-primary z-30 flex items-center justify-center" :class="{'translate-x-0 duration-700': isMainMenu, 'duration-1000 -translate-x-[440px]': !isMainMenu}">
    </div>
    <div  class="transition-all ease-in-out fixed  w-full h-screen top-0 left-0 right-0 bottom-0  bg-primary overflow-y-scroll z-40" :class="{'translate-x-0 duration-1000': isMainMenu, 'translate-x-[440px] duration-700': !isMainMenu}"
    >
      <ul class="flex flex-col gap-3 px-2 my-20 mx-10 bg-white rounded-lg shadow-lg" >
        <!-- Dashboard -->
        <li>
          <NuxtLink to="/dashboard" @click="isMainMenu = false" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Icon name="material-symbols:dashboard-outline" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Dashboard</span>
          </NuxtLink>
        </li>
        <!-- Dashboard End -->

        <!-- Pos -->
        <li>
          <NuxtLink to="/pos" @click="isMainMenu = false" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Icon name="material-symbols:position-bottom-right-outline-rounded" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Pos</span>
          </NuxtLink>
        </li>
        <!-- Pos End -->

        <!-- Order -->
        <li>
          <NuxtLink to="/order" @click="isMainMenu = false" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Icon name="tabler:shopping-bag" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Order</span>
          </NuxtLink>
        </li>
        <!-- Order  End -->

        <!-- Shop -->
        <li>
          <div class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300 cursor-pointer relative" @click="isShopLinks = !isShopLinks">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Icon name="material-symbols:shopping-bag-outline" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Shop</span>
            <div class="absolute top-1/2 -translate-y-1/2 right-2 transition-all ease-in-out duration-300" :class="{'rotate-90 ' : isShopLinks}">
              <Icon name="ic:twotone-keyboard-arrow-right" size="20" class="group-hover:text-primary  transition-all ease-in-out duration-300"  />
            </div>
          </div>
          <div class="overflow-hidden">
            <ul class="shop-links flex flex-col gap-9 pl-8 py-4" :class="{'shop-links--active' : isShopLinks}">
              <li>
                <NuxtLink to="/shop/products"  @click="isMainMenu = false" class="flex items-center gap-3">
                  <Icon name="system-uicons:boxes" size="20" class="text-primary" />
                  <span class="sub-link hover:text-primary">Products</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/shop/categories"  @click="isMainMenu = false"  class="flex items-center gap-3">
                  <Icon name="material-symbols:category-outline-rounded" size="20" class="text-primary" />
                  <span class="sub-link hover:text-primary">Product Category</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/shop/brands"  @click="isMainMenu = false" class="flex items-center gap-3">
                  <Icon name="material-symbols:brand-family" size="20" class="text-primary" />
                  <span class="sub-link hover:text-primary">Product Brand</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/shop/coupon"  @click="isMainMenu = false" class="flex items-center gap-3">
                  <Icon name="mingcute:coupon-line" size="20" class="text-primary" />
                  <span class="sub-link hover:text-primary">Product Coupon</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/shop/shipping"  @click="isMainMenu = false" class="flex items-center gap-3">
                  <Icon name="streamline:shipping-truck" size="20" class="text-primary" />
                  <span class="sub-link hover:text-primary">Shipping</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </li>
        <!-- Shop End -->

        <!-- Services -->
        <li>
          <NuxtLink to="/services"  @click="isMainMenu = false" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Icon name="fluent:people-settings-20-regular" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Services</span>
          </NuxtLink>
        </li>
        <!-- Services End -->

        <!-- Customers -->
        <li>
          <NuxtLink to="/customers"  @click="isMainMenu = false" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Icon name="ci:users-group" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Customers</span>
          </NuxtLink>
        </li>
        <!-- Customers End -->

        <!-- invoice -->
        <li>
          <NuxtLink to="/invoice"  @click="isMainMenu = false" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Icon name="teenyicons:invoice-outline" size="21" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Invoice</span>
          </NuxtLink>
        </li>
        <!-- Invoice End -->

        <!-- plans -->
        <li>
          <NuxtLink to="/plans"  @click="isMainMenu = false" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Icon name="material-symbols-light:rocket-outline" size="28" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Plans</span>
          </NuxtLink>
        </li>
        <!-- plans End -->

        <!-- Transactions -->
        <li>
          <NuxtLink to="/transactions"  @click="isMainMenu = false" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Icon name="uil:transaction" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Transactions</span>
          </NuxtLink>
        </li>
        <!-- Transactions End -->

        <!-- Settings -->
        <li>
          <NuxtLink to="/settings"  @click="isMainMenu = false" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
              <Icon name="fluent:settings-24-regular" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Settings</span>
          </NuxtLink>
        </li>
        <!-- Settingss End -->
      </ul>
    </div>
<!-- Menu Links End -->

<!--  Header Menu -->
  <div class="bg-white shadow-md fixed top-0 left-0 right-0 py-2 px-4 z-50">
    <ul class="flex items-center justify-between">
      <li>
        <MobileBackButton />
      </li>
      <li>
        <UInput
            size="md"
            placeholder="Search..."
            icon="i-heroicons-magnifying-glass-20-solid"
            autocomplete="off"
            color="primary"
            :ui="{rounded: 'rounded-full'}"
        />
      </li>
      <li>
        <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

          <template #account="{ item }">
            <div class="text-left">
              <p>
                Signed in as
              </p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ item.label }}
              </p>
            </div>
          </template>

          <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
          </template>
        </UDropdown>
      </li>
    </ul>
  </div>
<!--  Header Menu End -->


<!-- Footer Menu -->
  <div class="bg-primary shadow-md fixed bottom-2 left-1/2 -translate-x-1/2 w-[95%] py-2 px-4 rounded-2xl z-50">
    <ul class="flex items-center justify-between">
      <li>
        <NuxtLink to="/dashboard" class="flex flex-col items-center">
          <Icon name="material-symbols-light:home-app-logo" size="30" color="white" />
          <span class="text-xs text-white">Home</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/order" class="flex flex-col items-center">
          <Icon name="mingcute:shopping-bag-2-line" size="28" color="white" />
          <span class="text-xs text-white">Order</span>
        </NuxtLink>
      </li>
      <li>
        <button @click="isMainMenu = !isMainMenu" class=" absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 bg-white shadow-lg flex items-center justify-center rounded-full">
          <Icon name="material-symbols:add-rounded" size="36" class="text-primary transition-all ease-in-out duration-300" :class="{'rotate-45' : isMainMenu}" />
        </button>
      </li>
      <li>
        <NuxtLink to="/plans" class="flex flex-col items-center ml-5">
          <Icon name="material-symbols:rocket-launch-outline" size="28" color="white" />
          <span class="text-xs text-white">Plans</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/transactions" class="flex flex-col items-center">
          <Icon name="solar:card-transfer-broken" size="28" color="white" />
          <span class="text-xs text-white">Transactions</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
</script>