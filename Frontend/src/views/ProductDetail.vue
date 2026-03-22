<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Star, StarHalf, Download, Calendar } from 'lucide-vue-next'

import ProductCard from '@/components/ProductCard.vue'
import GlassCard from '@/components/GlassCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue'

import ProductGallery from '@/components/ProductGallery.vue'
import ProductInfoPanel from '@/components/ProductInfoPanel.vue'
import ProductReviewTabs from '@/components/ProductReviewTabs.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

const route = useRoute()
const productSlug = route.params.slug

// Mock Main Product
const product = ref({
  id: 1,
  slug: productSlug || 'ecommerce-dashboard',
  title: 'Full-Stack E-Commerce Dashboard',
  price: 599000,
  originalPrice: 799000,
  rating: 4.9,
  reviews: 324,
  downloads: 2847,
  updated: '15/03/2024',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtRRoxZq9Q1qucOXmNgSQOLHSlafola-ADjxdhzQDWK60NKn-9s5sOtzunA-ecuyQKAdn8RJOjdSohsawZmHgxAhplljxAhbw2sowSFoPeugZFOpVRnAzseJP5rl0MStUnGcQ0-nBM_-CcQ0HKZcMpAs8m431LJboAknHOE34HotbyVBRHzOq8FLRN6LgjT0uHC4VhQB4X8mtwPVFdACFwXmYcTyJgh9Tz5HhlpVKIxcMXE3ohy1r7_8ayMFKU8M0dOoArWUBf1aw',
  techTags: [
    { name: 'React', class: 'text-blue-400 bg-blue-400/10' },
    { name: 'Node.js', class: 'text-green-400 bg-green-400/10' }
  ],
  author: {
    name: 'DevMaster Pro',
    title: 'Tác giả tinh nhuệ • 50+ Sản phẩm',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdW9MzdmTadEwp-f-QBxEzSMp7qS7uP6nwCqUcXs_4maN6GiPhtkU8_0vVwJNLgHNrD_UStEkZP4GaSy34t5fYDhzvQp62CO0Fu-5SVpGhdaB_mt68dgZZEaU7lgLnY0dQr5dRiPZm5iOb3Ro4OQDNSJ1i9o0eX5WaFwEE3iwk9gPOduXanQoZ4MnQ1VDJawfWMmH-AKFLFRGCVE3-5NKrlWOwtautEtagY38OMw-f2wrOhndUmSF5gflOEPe0-BZzXzz_zRQawks'
  }
})

// Mock related products
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
</script>

<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen pt-24 pb-20">
    <main class="max-w-7xl mx-auto px-6 py-6">
      <!-- Breadcrumb -->
      <div class="mb-8" data-reveal="fade-in">
        <BaseBreadcrumb :items="[
          { name: 'Trang chủ', path: '/' },
          { name: 'Source Code', path: '/source-code' },
          { name: product.title }
        ]" />
      </div>
      
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Content (65%) -->
        <div class="lg:w-[65%] flex flex-col gap-8">
          
          <ProductGallery :image="product.image" />

          <!-- Product Info Mid Section -->
          <div class="flex flex-col gap-6">
            <div>
              <h2 class="text-3xl font-bold text-white mb-4">{{ product.title }}</h2>
              <div class="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div class="flex items-center gap-1.5">
                  <div class="flex text-yellow-500">
                    <Star class="w-4 h-4 fill-current" />
                    <Star class="w-4 h-4 fill-current" />
                    <Star class="w-4 h-4 fill-current" />
                    <Star class="w-4 h-4 fill-current" />
                    <StarHalf class="w-4 h-4 fill-current" />
                  </div>
                  <span class="text-slate-200 font-medium">{{ product.rating }}</span>
                  <span>({{ product.reviews }} đánh giá)</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <Download class="w-4 h-4" />
                  <span>{{ product.downloads }} lượt tải</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <Calendar class="w-4 h-4" />
                  <span>Cập nhật: {{ product.updated }}</span>
                </div>
              </div>
            </div>
            
            <!-- Developer Profile -->
            <GlassCard padding="p-4" border class="flex items-center justify-between" data-reveal="fade-up" data-reveal-delay="150">
              <div class="flex items-center gap-3">
                <div class="size-12 rounded-full overflow-hidden border border-primary/40">
                  <img class="w-full h-full object-cover" data-alt="Developer profile avatar" :src="product.author.avatar" />
                </div>
                <div>
                  <p class="text-white font-bold">{{ product.author.name }}</p>
                  <p class="text-xs text-slate-400">{{ product.author.title }}</p>
                </div>
              </div>
              <BaseButton variant="outline" size="sm">Theo dõi</BaseButton>
            </GlassCard>
            
            <!-- Description & Tech Stack -->
            <div class="flex flex-col gap-6" data-reveal="fade-up" data-reveal-delay="200">
              <div class="flex flex-wrap gap-2">
                <BaseBadge 
                  :class="tech.class" 
                  v-for="tech in product.techTags" 
                  :key="tech.name"
                >
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
            
            <ProductReviewTabs />
          </div>
        </div>

        <!-- Right Sidebar (35%) -->
        <div class="lg:w-[35%]">
          <ProductInfoPanel :product="product" />
        </div>
      </div>

      <!-- Related Products -->
      <section class="mt-20 mb-12">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-2xl font-bold text-white">Sản phẩm liên quan</h3>
          <a class="text-sm font-semibold text-primary hover:underline" href="#">Xem tất cả</a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <template v-for="(prod, index) in relatedProducts" :key="prod.slug">
            <div data-reveal="fade-up" :data-reveal-delay="index * 100">
              <ProductCard :product="prod" />
            </div>
          </template>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
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

.gradient-bg {
  background: linear-gradient(135deg, var(--color-primary) 0%, #7c3aed 100%);
}
</style>
