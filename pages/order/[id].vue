<template>
  <!-- Invoice -->
  <div class="max-w-[75rem] p-8 sm:px-6 lg:px-8 mx-auto my-4 rounded-md sm:my-10 bg-slate-100" id="printerId">
    <!-- Grid -->
    <div class="mb-5 pb-5 flex justify-between items-center border-b border-gray-200">
      <div>
        <h2 class="text-2xl font-semibold text-gray-800">Invoice</h2>
      </div>
      <!-- Col -->

      <div class="inline-flex gap-x-2">
<!--        <a class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm" href="#">-->
<!--          <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>-->
<!--          Invoice PDF-->
<!--        </a>-->
        <button @click="paymentReceived" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
          <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
          Print
        </button>
      </div>
      <!-- Col -->
    </div>
    <!-- End Grid -->

    <!-- Grid -->
    <div class="grid md:grid-cols-2 gap-3">
      <div>
        <div class="grid space-y-3">
<!--          <dl class="grid sm:flex gap-x-3 text-sm">
            <dt class="min-w-36 max-w-[200px] text-gray-500">
              Billed to:
            </dt>
            <dd class="text-gray-800">
              <a class="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium" href="#">
                sara@site.com
              </a>
            </dd>
          </dl>-->


          <dl class="grid sm:flex gap-x-3 text-sm">
            <dt class="min-w-36 max-w-[200px] text-gray-500">
              Store details:
            </dt>
            <dd class="font-medium text-gray-800">
              <span class="block font-semibold">{{ order?.store?.name }}</span>
              <span class="block font-semibold">{{ order?.store?.email }}</span>
              <span class="block font-semibold">{{ order?.store?.phone }}</span>
              <address class="not-italic font-normal max-w-40">
                {{ order?.store?.address }}
              </address>
            </dd>
          </dl>

          <dl class="grid sm:flex gap-x-3 text-sm">
            <dt class="min-w-36 max-w-[200px] text-gray-500">
              Customer details:
            </dt>
            <dd class="font-medium text-gray-800" v-if="order?.customer">
              <span class="block font-semibold">{{ order?.customer?.name }}</span>
              <span class="block font-semibold">{{ order?.customer?.email }}</span>
              <span class="block font-semibold">{{ order?.customer?.phone }}</span>
              <address class="not-italic font-normal max-w-40">
                {{ order?.customer?.address }}
              </address>
            </dd>
            <dd v-else>
              <p class="font-bold">Walking Customer</p>
            </dd>
          </dl>
        </div>
      </div>
      <!-- Col -->

      <div>
        <div class="grid space-y-3">
          <dl class="grid sm:flex gap-x-3 text-sm">
            <dt class="min-w-36 max-w-[200px] text-gray-500">
              Order number:
            </dt>
            <dd class="font-medium text-gray-800">
              {{ order?.order_id }}
            </dd>
          </dl>

<!--          <dl class="grid sm:flex gap-x-3 text-sm">
            <dt class="min-w-36 max-w-[200px] text-gray-500">
              Currency:
            </dt>
            <dd class="font-medium text-gray-800">
              USD - US Dollar
            </dd>
          </dl>-->

          <dl class="grid sm:flex gap-x-3 text-sm">
            <dt class="min-w-36 max-w-[200px] text-gray-500">
              Order date:
            </dt>
            <dd class="font-medium text-gray-800">
              {{ $dayjs(order?.order_date)?.format('DD-MMM-YYYY') }}
            </dd>
          </dl>

          <dl class="grid sm:flex gap-x-3 text-sm">
            <dt class="min-w-36 max-w-[200px] text-gray-500">
              Payment method:
            </dt>
            <dd class="font-medium text-gray-800">
              <UBadge class="capitalize">{{ order?.payment_method }}</UBadge>
            </dd>
          </dl>
        </div>
      </div>
      <!-- Col -->
    </div>
    <!-- End Grid -->

    <!-- Table -->
    <div class="mt-6 border border-gray-200 p-4 rounded-lg space-y-4">
      <div class="hidden sm:grid sm:grid-cols-5">
        <div class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Item</div>
        <div class="text-start text-xs font-medium text-gray-500 uppercase">Qty</div>
        <div class="text-start text-xs font-medium text-gray-500 uppercase">Rate</div>
        <div class="text-end text-xs font-medium text-gray-500 uppercase">Amount</div>
      </div>

      <div class="hidden sm:block border-b border-gray-200"></div>

      <div class="grid grid-cols-3 sm:grid-cols-5 gap-2" v-for="item in order?.order_details">
        <div class="col-span-full sm:col-span-2">
          <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
          <p class="text-gray-800 capitalize font-semibold">{{ item?.item_details?.name ?? 'Unknown' }}</p>
          <p class="capitalize text-xs">Type:
            <span :class="item?.item_details?.type ? 'text-primary' : 'text-green-400'">{{ item?.item_details?.type ?? 'service'}}</span>
          </p>
        </div>
        <div>
          <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
          <p class="text-gray-800">{{ item?.quantity }}</p>
        </div>
        <div>
          <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
          <p class="text-gray-800">{{ item?.item_details?.price }} ৳</p>
        </div>
        <div>
          <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
          <p class="sm:text-end text-gray-800">{{ item?.quantity * item?.item_details?.price }} ৳</p>
        </div>
      </div>
    </div>
    <!-- End Table -->

    <!-- Flex -->
    <div class="mt-8 flex sm:justify-end">
      <div class="w-full max-w-2xl sm:text-end space-y-2">
        <!-- Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
          <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
            <dt class="col-span-3 text-gray-500">Subotal:</dt>
            <dd class="col-span-2 font-medium text-gray-800">{{ order?.grand_total }} ৳</dd>
          </dl>

<!--          <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
            <dt class="col-span-3 text-gray-500">Total:</dt>
            <dd class="col-span-2 font-medium text-gray-800">$2750.00</dd>
          </dl>

          <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
            <dt class="col-span-3 text-gray-500">Tax:</dt>
            <dd class="col-span-2 font-medium text-gray-800">$39.00</dd>
          </dl>-->

          <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
            <dt class="col-span-3 text-gray-500">Amount paid:</dt>
            <dd class="col-span-2 font-medium text-gray-800">{{ order?.pay_bill }} ৳</dd>
          </dl>

          <dl class="grid sm:grid-cols-5 gap-x-3 text-sm">
            <dt class="col-span-3 text-gray-500">Due balance:</dt>
            <dd class="col-span-2 font-medium text-gray-800">{{ order?.pay_due }} ৳</dd>
          </dl>
        </div>
        <!-- End Grid -->
      </div>
    </div>
    <!-- End Flex -->
  </div>
  <!-- End Invoice -->

  <iframe id="printing-frame" name="print_frame" src="about:blank" style="display:none;"/>

</template>

<script setup>
definePageMeta({
  middleware:['auth']
})


const { data: order, pending, refresh } = await useLazyAsyncData('single_order', () => $fetch(`/order/${useRoute().params.id}`, {
  baseURL: useRuntimeConfig().public.baseUrl,
  headers: {
    authorization: `Bearer ${useTokenStore().customer_token}`
  }
}))



const paymentReceived =()=>{
  // console.log(order)
  // window.frames['print_frame'].document.title = document.title;
  // window.frames["print_frame"].document.body.innerHTML = order?.value?.invoice
  // window.frames["print_frame"].window.focus();
  // window.frames["print_frame"].window.print();



  var prtContent = document.getElementById("printerId");
  var WinPrint = window.open('', '');
  WinPrint.document.write('<html><head>');
  // Include Tailwind CSS
  WinPrint.document.write('<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">');
  // Include additional CSS files
  WinPrint.document.write('</head><body onload="print();close();">');
  WinPrint.document.write(prtContent.innerHTML);
  WinPrint.document.write('</body></html>');
  WinPrint.document.close();
  WinPrint.focus();

}



</script>