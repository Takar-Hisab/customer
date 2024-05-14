<script setup lang="ts">
  const isShopLinks = ref(false);
</script>

<template>
  <div class="sideBar w-64 fixed top-3 left-3 h-[97%] bg-white rounded-xl overflow-y-scroll hidden lg:block">
    <div>
      <h2 class="font-bold text-2xl text-center py-5">Takar Hisab</h2>
    </div>
    <p class="text-gray-400 text-sm py-4 pl-3">Apps & Pages</p>
      <ul class="flex flex-col gap-3 px-2">
        <!-- Dashboard -->
        <li>
          <NuxtLink to="/dashboard" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg shadow-primary-400/20 flex items-center justify-center">
              <Icon name="material-symbols:dashboard-outline" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Dashboard</span>
          </NuxtLink>
        </li>
        <!-- Dashboard End -->

        <!-- Pos -->
        <li class="hidden lg:block">
          <NuxtLink to="/pos" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg shadow-primary-400/20 flex items-center justify-center">
              <Icon name="material-symbols:position-bottom-right-outline-rounded" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Pos</span>
          </NuxtLink>
        </li>
        <!-- Pos End -->

        <!-- Order -->
        <li>
          <NuxtLink to="/order" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg shadow-primary-400/20 flex items-center justify-center">
              <Icon name="tabler:shopping-bag" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Order</span>
          </NuxtLink>
        </li>
        <!-- Order  End -->

        <!-- Shop -->
        <li>
          <div class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300 cursor-pointer relative" @click="isShopLinks = !isShopLinks">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg shadow-primary-400/20 flex items-center justify-center">
              <Icon name="material-symbols:shopping-bag-outline" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Shop</span>
            <div class="absolute top-1/2 -translate-y-1/2 right-2 transition-all  ease-in-out duration-300" :class="{'rotate-90 ' : isShopLinks}">
              <Icon name="ic:twotone-keyboard-arrow-right" size="20" class="group-hover:text-primary  transition-all ease-in-out duration-300"  />
            </div>
          </div>
          <div class="overflow-hidden">
            <ul class="shop-links flex flex-col gap-9 pl-8 py-4" :class="{'shop-links--active' : isShopLinks}">
              <li>
                <NuxtLink to="/shop/products" class="flex items-center gap-3 ">
                  <Icon name="system-uicons:boxes" size="20" class="text-primary" />
                  <span class="sub-link hover:text-primary">Products</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/shop/categories"  class="flex items-center gap-3 relative before:absolute before:w-[1px] before:h-8 before:bg-primary before:top-[26px] before:left-2 ">
                  <Icon name="material-symbols:category-outline-rounded" size="20" class="text-primary" />
                  <span class="sub-link hover:text-primary">Product Category</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/shop/categories/subcategory"  class="flex items-center gap-3">
                  <Icon name="material-symbols:category-outline-rounded" size="20" class="text-primary" />
                  <span class="sub-link hover:text-primary">Sub Category</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/shop/brands" class="flex items-center gap-3">
                  <Icon name="material-symbols:brand-family" size="20" class="text-primary" />
                  <span class="sub-link hover:text-primary">Product Brand</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/shop/coupon" class="flex items-center gap-3">
                  <Icon name="mingcute:coupon-line" size="20" class="text-primary" />
                  <span class="sub-link hover:text-primary">Product Coupon</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/shop/shipping" class="flex items-center gap-3">
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
          <NuxtLink to="/services" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg shadow-primary-400/20 flex items-center justify-center">
              <Icon name="fluent:people-settings-20-regular" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Services</span>
          </NuxtLink>
        </li>
        <!-- Services End -->

        <!-- Customers -->
        <li>
          <NuxtLink to="/customers" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg shadow-primary-400/20 flex items-center justify-center">
              <Icon name="ci:users-group" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Customers</span>
          </NuxtLink>
        </li>
        <!-- Customers End -->

        <!-- invoice -->
        <li>
          <NuxtLink to="/invoice" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg shadow-primary-400/20 flex items-center justify-center">
              <Icon name="teenyicons:invoice-outline" size="21" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Invoice</span>
          </NuxtLink>
        </li>
        <!-- Invoice End -->

        <!-- plans -->
        <li>
          <NuxtLink to="/plans" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg shadow-primary-400/20 flex items-center justify-center">
              <Icon name="material-symbols-light:rocket-outline" size="28" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Plans</span>
          </NuxtLink>
        </li>
        <!-- plans End -->

        <!-- Transactions -->
        <li>
          <NuxtLink to="/transactions" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg shadow-primary-400/20 flex items-center justify-center">
              <Icon name="uil:transaction" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Transactions</span>
          </NuxtLink>
        </li>
        <!-- Transactions End -->

        <!-- Settings -->
        <li>
          <NuxtLink to="/settings" class="sideBarLink group flex items-center gap-3  py-[6px] px-4 rounded-lg transition-all ease-in-out duration-300">
            <span class="sideBarLink__icon w-12 h-12 rounded-full bg-white shadow-lg shadow-primary-400/20 flex items-center justify-center">
              <Icon name="fluent:settings-24-regular" size="24" class=" transition-all ease-in-out duration-300 text-primary" />
            </span>
            <span class="sideBarLink__text group-hover:text-primary text-lg font-normal transition-all ease-in-out duration-300">Settings</span>
          </NuxtLink>
        </li>
        <!-- Settingss End -->
      </ul>
  </div>
</template>


<style lang="scss" scoped>
  
</style>
