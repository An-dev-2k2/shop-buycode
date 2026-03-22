<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  CheckCircle2, AlertCircle, Copy, Check, Download, ArrowLeft,
  Code, Package, User, Phone, Mail, Clock, CreditCard, ShieldCheck, ArrowRight, Sparkles
} from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

import BaseBreadcrumb from '../components/BaseBreadcrumb.vue'
import BaseButton from '../components/BaseButton.vue'
import OrderStatusBadge from '../components/OrderStatusBadge.vue'

useScrollReveal()
const router = useRouter()
const route = useRoute()

// Countdown auto-redirect
const REDIRECT_DELAY = 8
const countdown = ref(REDIRECT_DELAY)
let countdownTimer = null

const startCountdown = () => {
  countdown.value = REDIRECT_DELAY
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer)
      router.push('/source-code')
    }
  }, 1000)
}

const goToSourceCode = () => {
  clearInterval(countdownTimer)
  router.push('/source-code')
}

const goToOrders = () => {
  clearInterval(countdownTimer)
  router.push('/orders')
}

// Bắt lấy ID đơn hàng từ URL
const currentOrderId = route.params.id

// ---- Mock Order Data ----
// Trong thực tế sẽ dùng onMounted() để gọi API: `GET /api/orders/${currentOrderId}`
const order = ref({
  id: currentOrderId,
  date: new Date().toLocaleDateString('vi-VN', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }),
  status: 'pending',
  coupon: 'ANDEV10',
  discountPercent: 10,
  customer: {
    name: 'Trương Văn An',
    email: 'andev@gmail.com',
    phone: '0912 345 678'
  },
  items: [
    {
      id: 1, slug: 'ecommerce-react-template',
      title: 'E-commerce React Template',
      price: 1250000, quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBveo9JsIahVFCGVUEpwM-ngbFNyVmP6Q2lMlIcSMZVAL1ylneXas7-1s_Wh21JEmSwqmuqvGCCoBcm6OCAShZDCUDMQ0afjG4Ip1WTU81U5VEIkACLXBRGYnw_tPYf08pRJjPFNOEHMHCqnYriGSVrJ0zfclcoG7aJ8SUZMG8Rnl7sgt_3118gUW1SFCCoQA1WNesmKSywWQHyQ5NhUtBag1hF5A3xEoyRzHthq9CadAAESoZLM-s7edTe0EhvMA_NzHSyuQHCPX4',
      techTag: { name: 'React', class: 'text-blue-400 bg-blue-400/10' }
    },
    {
      id: 2, slug: 'fintech-dashboard-node',
      title: 'Fintech Dashboard Node',
      price: 2100000, quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVlQ1wHFGcAgrWK0061_m5SezHXzXVXMaX6YkEZCiz6sgDXbIibYuK7TUytqWDzr2QJ93keJwZbWIquuGgpF8YdaCSBiTmM7jzO9RraNFDK3uylE60tk_DkJNpbYdhN2QtWgG5wuVHx3dI6qWS2fTkiHO5Z_iaedYUvHNuNuGXN6lNQhQGzYRBU1v5SZ_xhmp5JJ2y7bt51MlEJruv8t9d-lJYBxyZR-IK6kym8_f9QTQ9YBXWasXPxUbN20-vqmm-NcqPaR_YJpU',
      techTag: { name: 'Vue', class: 'text-emerald-400 bg-emerald-400/10' }
    }
  ]
})

const paymentState = ref('idle') // 'idle' | 'loading' | 'success' | 'error'
const copiedId = ref(false)
const fmt = (val) => new Intl.NumberFormat('vi-VN').format(val) + 'đ'

const subtotal = computed(() => order.value.items.reduce((s, i) => s + i.price * i.quantity, 0))
const discount = computed(() => Math.round(subtotal.value * (order.value.discountPercent / 100)))
const total = computed(() => subtotal.value - discount.value)

// ---- API Mock: Xử lý thanh toán ----
const handlePayment = async () => {
  paymentState.value = 'loading'
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.1 ? resolve() : reject(new Error('Payment failed'))
      }, 2000)
    })
    order.value.status = 'completed'
    paymentState.value = 'success'
    startCountdown() // Bắt đầu đếm ngược
  } catch {
    paymentState.value = 'error'
  }
}

const copyId = () => {
  navigator.clipboard.writeText(order.value.id)
  copiedId.value = true
  setTimeout(() => copiedId.value = false, 2000)
}
const retryPayment = () => { paymentState.value = 'idle' }
</script>

<template>
  <div class="bg-slate-50 dark:bg-background-dark min-h-screen pt-28 pb-20 relative overflow-hidden">
    <div class="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[0%] left-[-5%] w-[25%] h-[30%] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <div class="mb-8" data-reveal="fade-in">
        <BaseBreadcrumb :items="[
          { name: 'Trang chủ', path: '/' },
          { name: 'Giỏ hàng', path: '/cart' },
          { name: 'Thông tin đơn hàng' }
        ]" />
      </div>

      <!-- ===== Payment SUCCESS - Full Page Screen ===== -->
      <Transition name="success-scale" mode="out-in">
        <div v-if="paymentState === 'success'" class="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
          <!-- Animated ring + checkmark -->
          <div class="relative mb-10">
            <!-- Outer pulse ring -->
            <div class="absolute -inset-6 rounded-full border-2 border-emerald-500/20 animate-ping"></div>
            <!-- Mid glow ring -->
            <div class="absolute -inset-3 rounded-full bg-emerald-500/5 border border-emerald-500/20"></div>
            <!-- Icon circle -->
            <div class="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/40">
              <CheckCircle2 class="w-12 h-12 text-white" />
            </div>
          </div>

          <!-- Success text -->
          <div class="space-y-3 mb-8">
            <div class="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-700/40 mb-2">
              <Sparkles class="w-3.5 h-3.5" /> Giao dịch thành công
            </div>
            <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Cảm ơn bạn!</h2>
            <p class="text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              Đơn hàng của bạn đã được xác nhận. Chúng tôi đang xử lý và sẽ gửi source code qua email sớm nhất có thể.
            </p>
          </div>

          <!-- Order Summary Card -->
          <div class="w-full max-w-sm mx-auto bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm mb-8 text-left space-y-3">
            <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
              <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Mã đơn hàng</span>
              <div class="flex items-center gap-2">
                <span class="text-sm font-black text-slate-900 dark:text-white tracking-wider">{{ order.id }}</span>
                <button @click="copyId" class="p-1 rounded-md text-slate-400 hover:text-primary transition-colors">
                  <Check v-if="copiedId" class="w-3.5 h-3.5 text-emerald-500" />
                  <Copy v-else class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-500 dark:text-slate-400">Số sản phẩm</span>
              <span class="font-bold text-slate-900 dark:text-white">{{ order.items.length }} sản phẩm</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-500 dark:text-slate-400">Giảm giá</span>
              <span class="font-bold text-emerald-500">- {{ fmt(discount) }}</span>
            </div>
            <div class="flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-3">
              <span class="font-bold text-slate-900 dark:text-white">Tổng đã thanh toán</span>
              <span class="text-xl font-black text-primary">{{ fmt(total) }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center gap-3 mb-8">
            <BaseButton @click="goToOrders" variant="outline" size="lg" class="w-full sm:w-auto border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 min-w-[180px]">
              <template #icon-left><Package class="w-5 h-5" /></template>
              Xem đơn hàng
            </BaseButton>
            <BaseButton @click="goToSourceCode" variant="primary" size="lg" class="w-full sm:w-auto shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all min-w-[180px]">
              <template #icon-right><ArrowRight class="w-5 h-5" /></template>
              Tiếp tục mua hàng
            </BaseButton>
          </div>

          <!-- Countdown auto-redirect -->
          <div class="w-full max-w-sm mx-auto">
            <p class="text-xs text-slate-400 dark:text-slate-500 mb-2 text-center">
              Tự động chuyển sau <span class="font-bold text-slate-600 dark:text-slate-300">{{ countdown }}s</span>
            </p>
            <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                class="bg-primary h-full rounded-full transition-all duration-1000 ease-linear"
                :style="{ width: `${(countdown / REDIRECT_DELAY) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- ===== Main Order Detail Content ===== -->
      <Transition name="success-scale" mode="out-in">
        <div v-if="paymentState !== 'success'" class="flex flex-col xl:flex-row gap-8 items-start">

          <!-- LEFT: Order Info -->
          <div class="flex-1 min-w-0 space-y-6">

            <!-- Order Header Card -->
            <div class="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 md:p-6 shadow-sm" data-reveal="fade-up">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Mã đơn hàng</p>
                  <div class="flex items-center gap-2">
                    <h1 class="text-lg font-black text-slate-900 dark:text-white tracking-tight">{{ order.id }}</h1>
                    <button @click="copyId" class="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-all" title="Sao chép">
                      <Check v-if="copiedId" class="w-3.5 h-3.5 text-emerald-500" />
                      <Copy v-else class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <OrderStatusBadge :status="order.status" size="md" />
                  <span class="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Clock class="w-3.5 h-3.5" /> {{ order.date }}
                  </span>
                </div>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3 border-t border-slate-100 dark:border-slate-700 pt-4">
                <div>
                  <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Tên khách hàng</p>
                  <p class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5"><User class="w-3.5 h-3.5 text-slate-400" /> {{ order.customer.name }}</p>
                </div>
                <div>
                  <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Email</p>
                  <p class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5"><Mail class="w-3.5 h-3.5 text-slate-400" /> {{ order.customer.email }}</p>
                </div>
                <div>
                  <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Điện thoại</p>
                  <p class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5"><Phone class="w-3.5 h-3.5 text-slate-400" /> {{ order.customer.phone }}</p>
                </div>
              </div>
            </div>

            <!-- Products List -->
            <div class="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm" data-reveal="fade-up" data-reveal-delay="100">
              <div class="px-5 md:px-6 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 class="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <Package class="w-4 h-4 text-primary" /> Sản phẩm trong đơn
                </h2>
              </div>
              <div class="divide-y divide-slate-100 dark:divide-slate-700">
                <div v-for="item in order.items" :key="item.id" class="flex items-start gap-4 p-5 md:p-6 group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <div class="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-900">
                    <img :src="item.image" :alt="item.title" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <span :class="['text-[11px] font-bold px-2 py-0.5 rounded-md mr-2', item.techTag.class]">{{ item.techTag.name }}</span>
                    <h3 class="font-bold text-slate-900 dark:text-white text-sm mt-1.5 line-clamp-2 group-hover:text-primary transition-colors">{{ item.title }}</h3>
                    <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Số lượng: {{ item.quantity }}</p>
                  </div>
                  <div class="text-right shrink-0">
                    <p class="text-[11px] text-slate-400 uppercase tracking-wider mb-1">Đơn giá</p>
                    <p class="font-black text-slate-900 dark:text-white">{{ fmt(item.price) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Back link (mobile only) -->
            <div class="xl:hidden">
              <button @click="router.back()" class="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors">
                <ArrowLeft class="w-4 h-4" /> Quay lại giỏ hàng
              </button>
            </div>
          </div>

          <!-- RIGHT: Payment Panel (sticky) -->
          <div class="w-full xl:w-[340px] shrink-0 xl:sticky xl:top-28 space-y-4" data-reveal="fade-left">

            <!-- Order Summary -->
            <div class="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard class="w-4 h-4 text-primary" /> Thanh toán đơn hàng
              </h3>

              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-slate-500 dark:text-slate-400">Tạm tính</span>
                  <span class="font-bold text-slate-900 dark:text-white">{{ fmt(subtotal) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-emerald-600 dark:text-emerald-400 font-medium">Giảm giá ({{ order.coupon }})</span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">- {{ fmt(discount) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-slate-500 dark:text-slate-400">Phí dịch vụ</span>
                  <span class="font-bold text-emerald-500">Miễn phí</span>
                </div>
                <div class="border-t border-slate-100 dark:border-slate-700 pt-3 flex justify-between items-center">
                  <span class="font-bold text-slate-900 dark:text-white">Tổng cộng</span>
                  <span class="text-2xl font-black text-primary">{{ fmt(total) }}</span>
                </div>
              </div>

              <!-- Payment CTA -->
              <Transition name="fade" mode="out-in">
                <!-- Error State -->
                <div v-if="paymentState === 'error'" class="space-y-3">
                  <div class="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 rounded-xl">
                    <AlertCircle class="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p class="text-sm font-bold text-red-700 dark:text-red-400">Thanh toán thất bại</p>
                      <p class="text-xs text-red-500 dark:text-red-500 mt-0.5">Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại.</p>
                    </div>
                  </div>
                  <BaseButton @click="retryPayment" variant="primary" fullWidth size="lg" class="shadow-lg shadow-primary/30">
                    Thử lại
                  </BaseButton>
                </div>

                <!-- Idle / Loading State -->
                <div v-else class="space-y-3">
                  <BaseButton
                    @click="handlePayment"
                    variant="primary"
                    fullWidth
                    size="lg"
                    :loading="paymentState === 'loading'"
                    :disabled="paymentState === 'loading'"
                    class="shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all"
                  >
                    <template #icon-left v-if="paymentState !== 'loading'">
                      <CreditCard class="w-5 h-5" />
                    </template>
                    {{ paymentState === 'loading' ? 'Đang xử lý...' : 'Thanh toán ngay' }}
                  </BaseButton>
                </div>
              </Transition>
            </div>

            <!-- Back to Cart btn -->
            <div class="hidden xl:block">
              <button @click="router.back()" class="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors">
                <ArrowLeft class="w-4 h-4" /> Quay lại giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(8px); }

.success-scale-enter-active { transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.success-scale-leave-active { transition: all 0.3s ease; }
.success-scale-enter-from { opacity: 0; transform: scale(0.92) translateY(24px); }
.success-scale-leave-to { opacity: 0; transform: scale(1.02) translateY(-12px); }
</style>
