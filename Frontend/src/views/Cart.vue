<script setup>
import { ref, computed } from 'vue'
import { ShoppingCart, Ticket, ArrowRight, PackageOpen, CreditCard } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useRouter } from 'vue-router'

import BaseBreadcrumb from '../components/BaseBreadcrumb.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseInput from '../components/BaseInput.vue'
import CartItem from '../components/CartItem.vue'

useScrollReveal()

const router = useRouter()
const couponCode = ref('')
const couponApplied = ref(false)
const couponDiscount = ref(0)
const couponError = ref('')
const isCheckingOut = ref(false)

const cartItems = ref([
  {
    id: 1,
    slug: 'ecommerce-react-template',
    title: 'E-commerce React Template',
    price: '1.250.000đ',
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBveo9JsIahVFCGVUEpwM-ngbFNyVmP6Q2lMlIcSMZVAL1ylneXas7-1s_Wh21JEmSwqmuqvGCCoBcm6OCAShZDCUDMQ0afjG4Ip1WTU81U5VEIkACLXBRGYnw_tPYf08pRJjPFNOEHMHCqnYriGSVrJ0zfclcoG7aJ8SUZMG8Rnl7sgt_3118gUW1SFCCoQA1WNesmKSywWQHyQ5NhUtBag1hF5A3xEoyRzHthq9CadAAESoZLM-s7edTe0EhvMA_NzHSyuQHCPX4',
    techTags: [{ name: 'React', class: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-transparent' }]
  },
  {
    id: 2,
    slug: 'fintech-dashboard-node',
    title: 'Fintech Dashboard Node',
    price: '2.100.000đ',
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVlQ1wHFGcAgrWK0061_m5SezHXzXVXMaX6YkEZCiz6sgDXbIibYuK7TUytqWDzr2QJ93keJwZbWIquuGgpF8YdaCSBiTmM7jzO9RraNFDK3uylE60tk_DkJNpbYdhN2QtWgG5wuVHx3dI6qWS2fTkiHO5Z_iaedYUvHNuNuGXN6lNQhQGzYRBU1v5SZ_xhmp5JJ2y7bt51MlEJruv8t9d-lJYBxyZR-IK6kym8_f9QTQ9YBXWasXPxUbN20-vqmm-NcqPaR_YJpU',
    techTags: [{ name: 'Vue', class: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-transparent' }]
  }
])

const parsePrice = (priceStr) => parseInt(String(priceStr).replace(/\./g, '').replace('đ', '')) || 0
const formatPrice = (val) => new Intl.NumberFormat('vi-VN').format(val) + 'đ'

const subtotal = computed(() =>
  cartItems.value.reduce((acc, item) => acc + parsePrice(item.price) * item.quantity, 0)
)
const discount = computed(() => couponApplied.value ? Math.round(subtotal.value * couponDiscount.value) : 0)
const total = computed(() => subtotal.value - discount.value)

const increase = (id) => {
  const item = cartItems.value.find(i => i.id === id)
  if (item) item.quantity++
}
const decrease = (id) => {
  const item = cartItems.value.find(i => i.id === id)
  if (item && item.quantity > 1) item.quantity--
}
const remove = (id) => {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
}
const applyCoupon = () => {
  couponError.value = ''
  if (couponCode.value.toUpperCase() === 'ANDEV10') {
    couponDiscount.value = 0.1
    couponApplied.value = true
  } else {
    couponError.value = 'Mã giảm giá không hợp lệ hoặc đã hết hạn.'
    couponApplied.value = false
    couponDiscount.value = 0
  }
}
const handleCheckout = async () => {
  if (cartItems.value.length === 0) return

  isCheckingOut.value = true
  // Giả lập gọi API tạo đơn hàng (POST /api/orders)
  // Gửi payload chứa list sản phẩm, mã giảm giá, v.v.
  await new Promise(r => setTimeout(r, 1200))
  isCheckingOut.value = false

  // Giả lập backend sẽ trả về ID của đơn hàng vừa tạo
  const newOrderId = 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  
  // Chuyển hướng sang chi tiết đơn hàng kèm ID trên URL
  router.push(`/order/${newOrderId}`)
}
</script>

<template>
  <div class="bg-slate-50 dark:bg-background-dark min-h-screen pt-28 pb-20 relative overflow-hidden">
    <!-- Background Glows -->
    <div class="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Breadcrumb -->
      <div class="mb-8" data-reveal="fade-in">
        <BaseBreadcrumb :items="[
          { name: 'Trang chủ', path: '/' },
          { name: 'Giỏ hàng' }
        ]" />
      </div>

      <!-- Empty State -->
      <transition name="fade" mode="out-in">
        <div key="empty" v-if="cartItems.length === 0" class="flex flex-col items-center justify-center text-center py-24 gap-6 animate-fade-up">
          <div class="w-28 h-28 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center mb-2">
            <PackageOpen class="w-14 h-14 text-slate-300 dark:text-slate-600" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Giỏ hàng trống</h2>
            <p class="text-slate-500 dark:text-slate-400 max-w-sm">Bạn chưa thêm sản phẩm nào vào giỏ. Hãy khám phá kho Source Code tuyệt vời của chúng tôi!</p>
          </div>
          <BaseButton to="/source-code" variant="primary" size="lg" class="shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all">
            <template #icon-right><ArrowRight class="w-5 h-5" /></template>
            Khám phá Source Code
          </BaseButton>
        </div>

        <!-- Cart Content -->
        <div key="content" v-else class="flex flex-col xl:flex-row gap-8 items-start">
          <!-- Left: Cart Items -->
          <div class="flex-1 min-w-0 space-y-4">
            <!-- Header -->
            <div class="flex items-center justify-between mb-2" data-reveal="fade-in">
              <h1 class="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <ShoppingCart class="w-5 h-5" />
                </div>
                Giỏ hàng
                <span class="text-base font-bold text-slate-400 dark:text-slate-500">({{ cartItems.length }} sản phẩm)</span>
              </h1>
              <button @click="cartItems = []" class="text-xs font-bold text-red-400 hover:text-red-500 transition-colors hover:underline">Xóa tất cả</button>
            </div>

            <!-- Items List -->
            <TransitionGroup name="list" tag="div" class="space-y-3 relative">
              <div v-for="item in cartItems" :key="item.id">
                <CartItem
                  :item="item"
                  @increase="increase"
                  @decrease="decrease"
                  @remove="remove"
                />
              </div>
            </TransitionGroup>

            <!-- Continue Shopping -->
            <div class="pt-4" data-reveal="fade-up">
              <BaseButton to="/source-code" variant="outline" size="sm" class="border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                <template #icon-left><ArrowRight class="w-4 h-4 rotate-180" /></template>
                Tiếp tục mua hàng
              </BaseButton>
            </div>
          </div>

          <!-- Right: Order Summary -->
          <div class="w-full xl:w-[360px] shrink-0 xl:sticky xl:top-28 space-y-4" data-reveal="fade-left">
            <!-- Coupon -->
            <div class="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
              <h3 class="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 mb-4">
                <Ticket class="w-4 h-4 text-primary" />
                Mã giảm giá
              </h3>
              <div class="flex gap-2">
                <BaseInput
                  v-model="couponCode"
                  placeholder="Nhập mã giảm giá..."
                  class="flex-1"
                  @keyup.enter="applyCoupon"
                />
                <BaseButton @click="applyCoupon" variant="primary" size="sm" class="shrink-0 px-4">Áp dụng</BaseButton>
              </div>
              <p v-if="couponError" class="mt-2 text-xs font-medium text-red-500">{{ couponError }}</p>
              <p v-if="couponApplied" class="mt-2 text-xs font-bold text-emerald-500">✓ Đã áp dụng mã ANDEV10 - Giảm 10%</p>
              <p class="mt-3 text-[11px] text-slate-400 dark:text-slate-500">Thử mã <span class="font-bold text-primary">ANDEV10</span> để giảm 10%</p>
            </div>

            <!-- Summary Card -->
            <div class="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 class="text-base font-bold text-slate-900 dark:text-white">Tóm tắt đơn hàng</h3>

              <div class="space-y-3">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-slate-500 dark:text-slate-400">Tạm tính ({{ cartItems.length }} sản phẩm)</span>
                  <span class="font-bold text-slate-900 dark:text-white">{{ formatPrice(subtotal) }}</span>
                </div>
                <div v-if="couponApplied" class="flex items-center justify-between text-sm">
                  <span class="text-emerald-600 dark:text-emerald-400 font-medium">Giảm giá (ANDEV10)</span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">- {{ formatPrice(discount) }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-slate-500 dark:text-slate-400">Phí dịch vụ</span>
                  <span class="font-bold text-emerald-500">Miễn phí</span>
                </div>
              </div>

              <div class="border-t border-slate-100 dark:border-slate-700 pt-4">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-slate-900 dark:text-white">Tổng cộng</span>
                  <span class="text-2xl font-black text-primary">{{ formatPrice(total) }}</span>
                </div>
                <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Đã bao gồm thuế VAT (nếu có)</p>
              </div>

              <BaseButton
                @click="handleCheckout"
                variant="primary"
                size="lg"
                fullWidth
                :loading="isCheckingOut"
                class="shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all"
              >
                <template #icon-left><CreditCard class="w-5 h-5" /></template>
                Xác nhận thanh toán
              </BaseButton>

              <div class="grid grid-cols-2 gap-3 pt-1">
                <div v-for="item in ['Bảo mật 100%', 'Hỗ trợ 24/7']" :key="item" class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px) scale(0.98);
}
.list-leave-active {
  position: absolute;
  width: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-up {
  animation: fadeUp 0.4s ease forwards;
}
</style>
