<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  ChevronRight, Search, ShoppingCart, Bell, Monitor, Smartphone, Star,
  StarHalf, Download, Calendar, CheckCircle2, Share2, Heart, Flag, ShieldCheck, RotateCcw,
  Tablet, X, FileCode2, Zap, ArrowRight, HelpCircle
} from 'lucide-vue-next'

import ProductCard from '@/components/ProductCard.vue'
import GlassCard from '@/components/GlassCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

const route = useRoute()
const productSlug = route.params.slug

const userRating = ref(0)
const hoverRating = ref(0)
const reviewText = ref('')

const relatedProducts = [
  {
    title: 'Multi-Vendor Marketplace Kit',
    slug: 'multi-vendor-marketplace-kit',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE3jHuvuA93pV_sxAKgkq2LTGEnQ5mP5KS5LhCuC_UDSh74GNNUspTgVbvfRwhY_SDrA0ZMne4Iw6W6qQ53_bDE3pC0QydwjqnD8ErBAK3eWj8MSq428b_0ZF2BjBUhePnN3r5iu2BTF6hqjWMg_EI83nKj1vlpbZvfxe7nuByF5H1Xy5D9oTarVaDWzmhFUtge6WQBtNc9l2rLTJwI9NZZiB9JEKhwoUX9kGLp8oXLYWHz2GEnmXqNGG7HXGfphg05pXQ-dRfwuI',
    tag: 'NEXT.JS',
    price: '1.299.000đ',
    rating: 4.8,
    techTags: [
      { name: 'React', class: 'text-blue-400 bg-blue-400/10' },
      { name: 'Node.js', class: 'text-green-400 bg-green-400/10' }
    ]
  },
  {
    title: 'Professional POS System v2',
    slug: 'professional-pos-system-v2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu8fxNNnuNwceUc-tElddFt9tV-CXQinpeziHHFrWMFUoPGd0Dn3wKqtEIwM6vmqbNitWy7l5PwI0xAKyO_AqVihz-OUkfYmspmC5il_auZZnSYFtAW9FYvve8ayHx6PhQiPwK4lnC-sg05S9RpEnqR9-0DtgrV_SMoJiI0cuvQ3xmUueL8dR_oXuFSnbDhhUFBIbLZ1GbUNmkq2So--f33nrVa2PVWRADyJAGi-rlJM4kBLUGrJuqF4cHSURvMePxgwbhCrMEFq8',
    tag: 'VUE',
    price: '850.000đ',
    rating: 5.0,
    techTags: [
      { name: 'Vue 3', class: 'text-emerald-400 bg-emerald-400/10' },
      { name: 'Tailwind', class: 'text-cyan-400 bg-cyan-400/10' }
    ]
  },
  {
    title: 'Mobile CRM & Leads Manager',
    slug: 'mobile-crm-leads-manager',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1iaX9fNEyuq4M2IYN3ZtdPW0VqF519Gq_6mWw_ged2Lp_PPcNFdEapo9mTJ_vURLslWi77Nze60nJXrbsYWQds9q5GyT_N-tXi-CR-UniNLZgBvDvl5XByfZ2lhsBt-yNdR01St8135_nhDDWqzmhxxLKnXztZTJTflbzlNYt8jNuNqB-URm1ViRx1whMlWtsIWurVmyzTNpddkELMCqLizsOysYVoddrruLMAyr1oo713Q2aWe5sLK5N8Zy0oQ5UeCjOuBlqMv0',
    tag: 'FLUTTER',
    price: '450.000đ',
    rating: 4.7,
    techTags: [
      { name: 'Flutter', class: 'text-sky-400 bg-sky-400/10' },
      { name: 'Firebase', class: 'text-amber-400 bg-amber-400/10' }
    ]
  },
  {
    title: 'Modern SaaS Landing UI Kit',
    slug: 'modern-saas-landing-ui-kit',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_J9y-ZBeHTe_XhtRYpWW4ImTHfXTS5KfXGeNvXPwZ5A57caHB8xQIaEWh8GnvPHosa9gGSNZtIJDOn1tJI22I0NuclCG6ha6IG2GS4teZ8GPQPoYe3amNJoIezK7bGsqCUWWZe8DPZTrcygXTjNMks0SMV7QHjnWY7iYRDaZN-nKFmI0i8vuaYctXu7VmnOKINeBMGaYPlpwJ6lXRlh40llbt-zXnOpBxhg1VxXzloFbVMSjXF7aCghZwQEfUjVo3hmh6IZLSiEA',
    tag: 'HTML',
    price: '299.000đ',
    rating: 4.9,
    techTags: [
      { name: 'HTML5', class: 'text-orange-500 bg-orange-500/10' },
      { name: 'CSS3', class: 'text-blue-500 bg-blue-500/10' }
    ]
  }
]

const setRating = (rating) => {
  userRating.value = rating
}

const submitReview = () => {
  if (userRating.value === 0) {
    alert('Vui lòng chọn số sao đánh giá.')
    return
  }
  // Xử lý gửi đánh giá
  console.log('Submitted review:', { rating: userRating.value, text: reviewText.value })
  alert('Cảm ơn bạn đã đánh giá!')
  userRating.value = 0
  reviewText.value = ''
}
</script>

<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen pt-24 pb-20">
    <main class="max-w-7xl mx-auto px-6 py-6">
      <!-- Breadcrumb -->
      <div class="mb-8" data-reveal="fade-in">
        <BaseBreadcrumb :items="[
          { name: 'Trang chủ', path: '/' },
          { name: 'Source Code', path: '/source-code' },
          { name: 'E-Commerce Dashboard' }
        ]" />
      </div>
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Content (60%) -->
        <div class="lg:w-[65%] flex flex-col gap-8">
          <!-- Hero Image & Preview Toggle -->
          <div class="flex flex-col gap-4" data-reveal="fade-right">
            <div
              class="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-slate-800 shadow-2xl shadow-primary/10">
              <img class="w-full h-full object-cover"
                data-alt="Modern high tech e-commerce dashboard preview screenshot"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtRRoxZq9Q1qucOXmNgSQOLHSlafola-ADjxdhzQDWK60NKn-9s5sOtzunA-ecuyQKAdn8RJOjdSohsawZmHgxAhplljxAhbw2sowSFoPeugZFOpVRnAzseJP5rl0MStUnGcQ0-nBM_-CcQ0HKZcMpAs8m431LJboAknHOE34HotbyVBRHzOq8FLRN6LgjT0uHC4VhQB4X8mtwPVFdACFwXmYcTyJgh9Tz5HhlpVKIxcMXE3ohy1r7_8ayMFKU8M0dOoArWUBf1aw" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-60">
              </div>
            </div>

          </div>
          <!-- Product Info -->
          <div class="flex flex-col gap-6">
            <div>
              <h2 class="text-3xl font-bold text-white mb-4">Full-Stack E-Commerce Dashboard</h2>
              <div class="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div class="flex items-center gap-1.5">
                  <div class="flex text-yellow-500">
                    <Star class="w-4 h-4  fill-current" />
                    <Star class="w-4 h-4  fill-current" />
                    <Star class="w-4 h-4  fill-current" />
                    <Star class="w-4 h-4  fill-current" />
                    <StarHalf class="w-4 h-4" />
                  </div>
                  <span class="text-slate-200 font-medium">4.9</span>
                  <span>(324 đánh giá)</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <Download class="w-4 h-4" />
                  <span>2,847 lượt tải</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <Calendar class="w-4 h-4" />
                  <span>Cập nhật: 15/03/2024</span>
                </div>
              </div>
            </div>
            <!-- Developer Profile -->
            <GlassCard padding="p-4" border class="flex items-center justify-between" data-reveal="fade-up" data-reveal-delay="150">
              <div class="flex items-center gap-3">
                <div class="size-12 rounded-full overflow-hidden border border-primary/40">
                  <img class="w-full h-full object-cover" data-alt="Developer profile avatar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdW9MzdmTadEwp-f-QBxEzSMp7qS7uP6nwCqUcXs_4maN6GiPhtkU8_0vVwJNLgHNrD_UStEkZP4GaSy34t5fYDhzvQp62CO0Fu-5SVpGhdaB_mt68dgZZEaU7lgLnY0dQr5dRiPZm5iOb3Ro4OQDNSJ1i9o0eX5WaFwEE3iwk9gPOduXanQoZ4MnQ1VDJawfWMmH-AKFLFRGCVE3-5NKrlWOwtautEtagY38OMw-f2wrOhndUmSF5gflOEPe0-BZzXzz_zRQawks" />
                </div>
                <div>
                  <p class="text-white font-bold">DevMaster Pro</p>
                  <p class="text-xs text-slate-400">Tác giả tinh nhuệ • 50+ Sản phẩm</p>
                </div>
              </div>
              <BaseButton variant="outline" size="sm">Theo dõi</BaseButton>
            </GlassCard>
            <!-- Description & Tech Stack -->
            <div class="flex flex-col gap-6" data-reveal="fade-up" data-reveal-delay="200">
              <div class="flex flex-wrap gap-2">
                <BaseBadge :class="tech.class" v-for="tech in [
      { name: 'React', class: 'text-blue-400 bg-blue-400/10' },
      { name: 'Node.js', class: 'text-green-400 bg-green-400/10' }
    ]" :key="tech.name">
                  {{ tech.name }}
                </BaseBadge>
              </div>
              <article class="prose prose-invert max-w-none text-slate-300">
                <h3 class="text-xl font-bold text-white mb-2">Giới thiệu về sản phẩm</h3>
                <p class="leading-relaxed">
                  Giải pháp quản lý thương mại điện tử toàn diện được xây dựng với kiến trúc Microservices. Dashboard
                  cung cấp các tính năng theo dõi doanh thu thời gian thực, quản lý kho hàng thông minh, và tích hợp
                  thanh toán đa kênh.
                </p>
                <ul class="list-disc pl-5 mt-4 space-y-2">
                  <li>Phân tích dữ liệu với biểu đồ tương tác (Chart.js / Recharts).</li>
                  <li>Hệ thống thông báo thời gian thực qua WebSockets.</li>
                  <li>Quản lý vai trò người dùng (RBAC) linh hoạt.</li>
                  <li>Hỗ trợ đa ngôn ngữ và chế độ Dark Mode chuẩn SEO.</li>
                </ul>
              </article>
            </div>
            <!-- Reviews Section -->
            <div class="mt-8 border-t border-white/10 pt-8" data-reveal="fade-up">
              <h3 class="text-xl font-bold text-white mb-6">Đánh giá khách hàng</h3>
              <div class="flex flex-col md:flex-row gap-8">
                <GlassCard class="md:w-1/3 flex flex-col items-center justify-center" data-reveal="fade-right" data-reveal-delay="100">
                  <span class="text-5xl font-bold text-white">4.9</span>
                  <div class="flex text-yellow-500 my-2">
                    <Star class="w-4 h-4" />
                    <Star class="w-4 h-4" />
                    <Star class="w-4 h-4" />
                    <Star class="w-4 h-4" />
                    <Star class="w-4 h-4" />
                  </div>
                  <span class="text-sm text-slate-400">324 đánh giá</span>
                </GlassCard>
                <div class="flex-1 flex flex-col gap-4">
                  <div class="flex flex-col gap-6">
                    <div class="flex flex-col gap-1">
                      <div class="flex items-center justify-between text-sm">
                        <span class="text-white">Tuyệt vời</span>
                        <span class="text-slate-400">92%</span>
                      </div>
                      <div class="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div class="h-full bg-primary w-[92%]"></div>
                      </div>
                    </div>
                    <!-- Review Item -->
                    <div class="flex gap-4 pt-4 border-t border-white/5">
                      <div class="size-10 rounded-full bg-slate-700 overflow-hidden shrink-0">
                        <img class="w-full h-full" data-alt="Reviewer avatar"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgqPZZ4XST3N0VyeKOWVU_j4Ry3H9-iTOCqcs5l8D0ZeRzdmRaXdnsitFU2fXDr8QqzCMZfG-SlJgW9N8nrkDsN12dFhooUhhj-YNg9OmzUxU4HbIiMv7gNuDU7NMhb09xA3wpNgs21avUKH0zXBhAAruPfFqYpeR6yzI8s4hSPXDhkwNF1rn1jdh6ZLwJTs5yfm3IuEPGhPGGvDtp1vdhWAM-wlauYGrzf8hg3ufetROZdChLDQ1mjdkM0lIaj1OdSNTSqCfNJFs" />
                      </div>
                      <div>
                        <div class="flex items-center gap-2 mb-1">
                          <span class="text-sm font-bold text-white">Alex Nguyen</span>
                          <div class="flex text-yellow-500 text-[10px]">
                            <Star class="w-3 h-3  fill-current" />
                            <Star class="w-3 h-3  fill-current" />
                            <Star class="w-3 h-3  fill-current" />
                            <Star class="w-3 h-3  fill-current" />
                            <Star class="w-3 h-3  fill-current" />
                          </div>
                        </div>
                        <p class="text-sm text-slate-400">Code rất sạch và dễ tùy chỉnh. Tôi đã triển khai cho khách
                          hàng của mình chỉ trong 2 ngày.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Submit Review -->
              <GlassCard class="mt-8" data-reveal="fade-up">
                <h4 class="text-lg font-bold text-white mb-4">Đánh giá sản phẩm này</h4>
                <div class="flex flex-col gap-4">
                  <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1" @mouseleave="hoverRating = 0">
                      <div v-for="star in 5" :key="star"
                        class="relative w-8 h-8 cursor-pointer transition-transform hover:scale-110">
                        <Star class="absolute inset-0 w-full h-full text-slate-600" />
                        <Star v-if="(hoverRating ? hoverRating : userRating) >= star - 0.5"
                          class="absolute inset-0 w-full h-full text-yellow-500 fill-current transition-all"
                          :style="{ clipPath: (hoverRating ? hoverRating : userRating) === star - 0.5 ? 'inset(0 50% 0 0)' : 'none' }" />
                        <div class="absolute inset-0 flex z-10">
                          <div class="w-1/2 h-full" @mouseenter="hoverRating = star - 0.5"
                            @click="setRating(star - 0.5)"></div>
                          <div class="w-1/2 h-full" @mouseenter="hoverRating = star" @click="setRating(star)"></div>
                        </div>
                      </div>
                    </div>
                    <span class="ml-2 text-sm font-bold text-yellow-500" v-if="userRating > 0">{{ userRating }}
                      sao</span>
                    <span class="ml-2 text-sm text-slate-400 font-medium" v-else>Chọn số sao</span>
                  </div>
                  <textarea v-model="reviewText" rows="4" placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                    class="w-full bg-slate-800/50 border border-white/10 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"></textarea>
                  <BaseButton @click="submitReview" class="self-end" size="md">
                    Gửi đánh giá
                  </BaseButton>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
        <!-- Right Sidebar (40%) -->
        <div class="lg:w-[35%]">
          <div class="sticky top-24 flex flex-col gap-6">
            <!-- Price Card -->
            <GlassCard padding="p-8" class="flex flex-col gap-6 !bg-blue-500/20 border !border-blue-500/30" data-reveal="fade-left">
              <div class="flex items-center justify-between">
                <BaseBadge variant="danger">Sale -25%</BaseBadge>
                <span class="text-slate-400 text-sm line-through">799.000đ</span>
              </div>
              <div class="flex flex-col">
                <span class="text-4xl font-black gradient-text">599.000đ</span>
              </div>
              <div class="flex flex-col gap-3">
                <BaseButton size="lg" fullWidth>
                  <template #icon-left><Zap class="w-4 h-4" /></template>
                  MUA NGAY
                </BaseButton>
                
                <div class="flex items-center gap-3">
                  <BaseButton variant="ghost-primary" fullWidth>
                    <template #icon-left><ShoppingCart class="w-5 h-5" /></template>
                    Giỏ hàng
                  </BaseButton>
                  <BaseButton variant="ghost-primary" fullWidth>
                    <template #icon-left><Monitor class="w-5 h-5" /></template>
                    Preview
                  </BaseButton>
                </div>
              </div>
              <div class="space-y-3">
                <div v-for="item in ['Toàn bộ mã nguồn (Client & Server)', 'Tài liệu hướng dẫn chi tiết', '6 tháng hỗ trợ kỹ thuật miễn phí', 'Cập nhật miễn phí trọn đời']" :key="item" class="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 class="w-5 h-5 text-green-500" />
                  {{ item }}
                </div>
              </div>
            </GlassCard>
            <!-- Social & Security -->
            <div class="flex flex-col gap-4" data-reveal="fade-up" data-reveal-delay="200">
              <div class="flex items-center justify-center gap-6 p-4 rounded-xl bg-white/5 border border-white/5">
                <button class="text-slate-400 hover:text-white transition-colors">
                  <Share2 class="w-4 h-4" />
                </button>
                <div class="h-4 w-px bg-white/10"></div>
                <button class="text-slate-400 hover:text-white transition-colors">
                  <Heart class="w-4 h-4" />
                </button>
                <div class="h-4 w-px bg-white/10"></div>
                <button class="text-slate-400 hover:text-white transition-colors">
                  <Flag class="w-4 h-4" />
                </button>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div
                  class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                  <ShieldCheck class="w-8 h-8 text-primary" />
                  <span class="text-[10px] uppercase font-bold text-slate-400">Secure Payment</span>
                </div>
                <div
                  class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                  <RotateCcw class="w-8 h-8 text-primary" />
                  <span class="text-[10px] uppercase font-bold text-slate-400">14 Days Refund</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Related Products -->
      <section class="mt-20 mb-12">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-2xl font-bold text-white">Sản phẩm liên quan</h3>
          <a class="text-sm font-semibold text-primary hover:underline" href="#">Xem tất cả</a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <template v-for="(product, index) in relatedProducts" :key="product.slug">
            <div
              data-reveal="fade-up"
              :data-reveal-delay="index * 100"
            >
              <ProductCard :product="product" />
            </div>
          </template>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Shadow and effects */

.glow-border {
  position: relative;
}

.glow-border::after {
  content: '';
  position: absolute;
  inset: -1px;
  background: linear-gradient(45deg, var(--color-primary), #8b5cf6, var(--color-primary));
  z-index: -1;
  border-radius: inherit;
  opacity: 0.3;
}

.gradient-text {
  background: linear-gradient(90deg, #60a5fa, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-bg {
  background: linear-gradient(135deg, var(--color-primary) 0%, #7c3aed 100%);
}
</style>
