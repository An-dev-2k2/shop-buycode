<script setup>
import { ref, watch, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import BasePagination from '../components/BasePagination.vue'
import BaseBadge from '../components/BaseBadge.vue'
import GlassCard from '../components/GlassCard.vue'
import BaseBreadcrumb from '../components/BaseBreadcrumb.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseCheckbox from '../components/BaseCheckbox.vue'
import { 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown, 
  SlidersHorizontal, 
  Search, 
  Check, 
  Star 
} from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

const searchQuery = ref('')
const selectedCategories = ref(['all'])
const selectedTechs = ref(['react'])
const minPrice = ref(500000)
const maxPrice = ref(3000000)
const absoluteMin = 0
const absoluteMax = 5000000
const STEP_RANGE = 100000

// Thêm state phân trang
const currentPage = ref(1)
const totalPages = ref(3)

// Ràng buộc min không vượt max
watch(minPrice, (val) => {
  if (val < absoluteMin) minPrice.value = absoluteMin
  if (val > maxPrice.value - STEP_RANGE) minPrice.value = maxPrice.value - STEP_RANGE
})

// Ràng buộc max không vượt min
watch(maxPrice, (val) => {
  if (val > absoluteMax) maxPrice.value = absoluteMax
  if (val < minPrice.value + STEP_RANGE) maxPrice.value = minPrice.value + STEP_RANGE
})

const minPercent = computed(() => ((minPrice.value - absoluteMin) / (absoluteMax - absoluteMin)) * 100)
const maxPercent = computed(() => ((maxPrice.value - absoluteMin) / (absoluteMax - absoluteMin)) * 100)

const formatPrice = (val) => {
  return new Intl.NumberFormat('vi-VN').format(val) + 'đ'
}

// Logic for exclusive "All" category
watch(selectedCategories, (newVal, oldVal) => {
  if (newVal.includes('all') && !oldVal.includes('all')) {
    // Just checked 'all', remove everything else
    selectedCategories.value = ['all']
  } else if (newVal.length > 1 && newVal.includes('all')) {
    // 'all' was already checked, but a new item was added, remove 'all'
    selectedCategories.value = newVal.filter(item => item !== 'all')
  } else if (newVal.length === 0) {
    // If nothing is selected, default back to 'all'
    selectedCategories.value = ['all']
  }
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = ['all']
  selectedTechs.value = []
  minPrice.value = 0
  maxPrice.value = 5000000
}

const categories = [
  { id: 'all', name: 'Tất cả' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'mobile', name: 'Mobile App' },
]

const technologies = [
  { id: 'react', name: 'React' },
  { id: 'vue', name: 'Vue' },
  { id: 'nodejs', name: 'NodeJS' },
  { id: 'tailwind', name: 'Tailwind' },
  { id: 'flutter', name: 'Flutter' },
]

const products = [
  {
    id: 1,
    slug: 'ecommerce-react-template',
    title: 'E-commerce React Template',
    description: 'Giao diện bán hàng hiện đại với giỏ hàng và thanh toán Stripe.',
    rating: 4.9,
    price: '1.250.000đ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBveo9JsIahVFCGVUEpwM-ngbFNyVmP6Q2lMlIcSMZVAL1ylneXas7-1s_Wh21JEmSwqmuqvGCCoBcm6OCAShZDCUDMQ0afjG4Ip1WTU81U5VEIkACLXBRGYnw_tPYf08pRJjPFNOEHMHCqnYriGSVrJ0zfclcoG7aJ8SUZMG8Rnl7sgt_3118gUW1SFCCoQA1WNesmKSywWQHyQ5NhUtBag1hF5A3xEoyRzHthq9CadAAESoZLM-s7edTe0EhvMA_NzHSyuQHCPX4',
    techTags: [
      { name: 'React', class: 'text-blue-400 bg-blue-400/10' },
      { name: 'Node.js', class: 'text-green-400 bg-green-400/10' }
    ],
    catColor: 'bg-primary'
  },
  {
    id: 2,
    slug: 'fintech-dashboard-node',
    title: 'Fintech Dashboard Node',
    description: 'Hệ thống quản lý tài chính doanh nghiệp tích hợp API ngân hàng.',
    rating: 5.0,
    price: '2.100.000đ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVlQ1wHFGcAgrWK0061_m5SezHXzXVXMaX6YkEZCiz6sgDXbIibYuK7TUytqWDzr2QJ93keJwZbWIquuGgpF8YdaCSBiTmM7jzO9RraNFDK3uylE60tk_DkJNpbYdhN2QtWgG5wuVHx3dI6qWS2fTkiHO5Z_iaedYUvHNuNuGXN6lNQhQGzYRBU1v5SZ_xhmp5JJ2y7bt51MlEJruv8t9d-lJYBxyZR-IK6kym8_f9QTQ9YBXWasXPxUbN20-vqmm-NcqPaR_YJpU',
    techTags: [
      { name: 'React', class: 'text-blue-400 bg-blue-400/10' },
      { name: 'Node.js', class: 'text-green-400 bg-green-400/10' }
    ],
    catColor: 'bg-emerald-600'
  },
  {
    id: 3,
    slug: 'social-media-app-flutter',
    title: 'Social Media App Flutter',
    description: 'Ứng dụng mạng xã hội đầy đủ tính năng chat, đăng bài và story.',
    rating: 4.8,
    price: '3.500.000đ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHoUqRk_Es3GxvMpKvAEqk5z1n4P1suVgY_Cl9d1GD5gr3eww3eNs3kry3U1HItFYZNQqIVQnbw5_8Cl5lOiL9dJrZaHakv3buwFU8eQGsTL1u-YJpSRKnceEqGdWjAfXtJuuyTxk53SPQgdtIeDMtj2v9nRY_4YjsjJGuQNqzggBjiKzB55TsvqDU_4v5AobNDtAdSHj3HqVa1kQldIUuL2uHNdcr6cwRpSn-gaiQbFoVjFOoVy2rJY_2UYSDEMLSBhsRs07ffjQ',
    techTags: [
      { name: 'React', class: 'text-blue-400 bg-blue-400/10' },
      { name: 'Node.js', class: 'text-green-400 bg-green-400/10' }
    ],
    catColor: 'bg-blue-400'
  },
  {
    id: 4,
    slug: 'ai-chatbot-python',
    title: 'AI Chatbot Python',
    description: 'Bot chat tự động tích hợp GPT-4 cho chăm sóc khách hàng.',
    rating: 4.7,
    price: '1.500.000đ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP3rqfYjdGRtE7fiffqo9ytGZO1oJko-XQkQHqrgny_iH6Y67w9CY-8zzZ011Yx9q_HlY4FKajAhF9UFK8kF7eMVIX0z03bp-VprmvXcz07mAeAlhxA_AL1W6QnirEp59UkiB38TZ6DBnYo9wjeG8zunWPsagfJxtgvriO05ejvDRk46KmpVbMtkKNcF93GW8C3H_0HNfS3KIpy7iS9aYaCJVkVnFZIfRh-QGCp3TVdAGd6HpIBPmUKE-3HJ-Gj7AT5yNrid1zczg',
    techTags: [
      { name: 'React', class: 'text-blue-400 bg-blue-400/10' },
      { name: 'Node.js', class: 'text-green-400 bg-green-400/10' }
    ],
    catColor: 'bg-yellow-600'
  },
  {
    id: 5,
    slug: 'booking-system-vue',
    title: 'Booking System Vue',
    description: 'Hệ thống đặt lịch hẹn chuyên nghiệp cho spa, phòng khám.',
    rating: 4.9,
    price: '950.000đ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp2xQglsfhz3RWGfEmaU0x5aHg2b7Czb3HRhE33o8NKxVOPcwJ4sm5eQvSvMnjYcF3QU6SRuxpyGs4UN3iexl3FGq9R_VbTdwGvIjNN8ygB0Y8uY4B4d-V4HMv0M1Bn6qbvGI-_2GeDNjC_dGu3aOU0YM-Th2z3uUgjTIwZeNafHX71U7BqQtOdwg1jXwT5E-3yOMggJF2J4ILZZz4ApI3W46MCRTt26zT_en5VJWrKcs9k9m8js35u6nkjcqmq7ZlNdCiHrV8N9s',
    techTags: [
      { name: 'React', class: 'text-blue-400 bg-blue-400/10' },
      { name: 'Node.js', class: 'text-green-400 bg-green-400/10' }
    ],
    catColor: 'bg-teal-600'
  },
  {
    id: 6,
    slug: 'portfolio-tailwind',
    title: 'Portfolio Tailwind',
    description: 'Template portfolio cá nhân siêu nhẹ, chuẩn SEO và Responsive.',
    rating: 4.6,
    price: '690.000đ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT_pn9Eayh3PBHamwqz5fKO-QYtqpmfUfFn4d1cubqq2x19XZqKPnca1uM_y8grA2mOEcCxGgTThXo07L3duFTtHe_EJ_68PAqJX2v2Ey2-bYy_u5JXs1ZPaIl_0Zyj3jUtnf6uaGU9ROema2008KwjgXCvO1qqbVlNxDCGB1py4QuMmYAZ2VBzrd4249X0lgYYUl7JUNMf9jGK17OZQGU2do1oqiFdZn6h9QTas9fBv7IIP9-RY0079PmEr8f0DTib2pIyomfujc',
    techTags: [
      { name: 'React', class: 'text-blue-400 bg-blue-400/10' },
      { name: 'Node.js', class: 'text-green-400 bg-green-400/10' }
    ],
    catColor: 'bg-purple-600'
  }
]
</script>

<template>
  <div class="bg-slate-50 dark:bg-background-dark min-h-screen pt-28 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header Area (Breadcrumb + Title) -->
      <div class="mb-8 pt-4" data-reveal="fade-in">
        <div class="mb-3">
          <BaseBreadcrumb :items="[
            { name: 'Trang chủ', path: '/' },
            { name: 'Khám phá', path: '/source-code' },
            { name: 'Source Code' }
          ]" />
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        
        <!-- Sidebar Filter (25%) -->
        <aside class="w-full lg:w-1/4 shrink-0" data-reveal="fade-right">
          <GlassCard padding="p-6" class="sticky top-28">
            <!-- Filters Header -->
            <div class="flex items-center gap-2 mb-6">
              <SlidersHorizontal class="w-5 h-5 text-primary" />
              <h3 class="text-lg font-bold text-slate-900 dark:text-white border-b border-transparent pb-0">Bộ lọc</h3>
            </div>
            
            <div class="space-y-6">
              <!-- Internal Search -->
                <BaseInput 
                  v-model="searchQuery"
                  placeholder="Nhập từ khóa..."
                  :icon="Search"
                />

              <!-- Category -->
              <div>
                <p class="text-sm font-bold tracking-tight text-slate-300 mb-3">Danh mục</p>
                <div class="space-y-2">
                  <BaseCheckbox
                    v-for="cat in categories"
                    :key="cat.id"
                    v-model="selectedCategories"
                    :id="`cat-${cat.id}`"
                    :label="cat.name"
                    :value="cat.id"
                  />
                </div>
              </div>

              <!-- Tech Stack -->
              <div>
                <p class="text-sm font-bold tracking-tight text-slate-300 mb-3">Công nghệ</p>
                <div class="grid grid-cols-2 gap-3">
                  <label 
                    v-for="tech in technologies" 
                    :key="tech.id"
                    class="relative flex items-center justify-center p-3 rounded-xl 
                           bg-slate-800/30 hover:bg-slate-800/80 border border-transparent 
                           hover:border-slate-700/80 active:scale-[0.98] active:bg-slate-800 
                           cursor-pointer transition-all group overflow-hidden"
                  >
                    <input 
                      v-model="selectedTechs"
                      :value="tech.id"
                      type="checkbox"
                      class="peer sr-only"
                    />
                    <div class="absolute inset-0 bg-blue-500/10 opacity-0 peer-checked:opacity-100 transition-opacity border border-transparent peer-checked:border-blue-500/40 rounded-xl z-0"></div>
                    <span class="text-[11px] font-bold text-slate-400 peer-checked:text-primary transition-colors uppercase tracking-wider z-10">
                      {{ tech.name }}
                    </span>
                  </label>
                </div>
              </div>

              <!-- Price Range -->
              <div>
                <div class="flex justify-between items-center mb-4">
                  <p class="text-sm font-bold tracking-tight text-slate-300">Khoảng giá</p>
                  <span class="text-xs text-primary font-black bg-blue-500/10 px-2 py-0.5 rounded-lg border border-blue-500/20 whitespace-nowrap">
                    {{ formatPrice(minPrice) }} - {{ formatPrice(maxPrice) }}
                  </span>
                </div>
                <!-- Dual Range Slider Container -->
                <div class="relative w-full h-1.5 bg-slate-800 rounded-lg mt-2 mb-4">
                  <!-- Active Track -->
                  <div class="absolute h-full bg-primary rounded-lg pointer-events-none" 
                       :style="{ left: minPercent + '%', right: (100 - maxPercent) + '%' }"></div>
                  
                  <!-- Min Thumb -->
                  <input 
                    type="range" 
                    :min="absoluteMin" 
                    :max="absoluteMax" 
                    :step="STEP_RANGE"
                    v-model.number="minPrice"
                    class="absolute w-full top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none dual-range" 
                  />
                  <!-- Max Thumb -->
                  <input 
                    type="range" 
                    :min="absoluteMin" 
                    :max="absoluteMax" 
                    :step="STEP_RANGE"
                    v-model.number="maxPrice"
                    class="absolute w-full top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none dual-range" 
                  />
                </div>
                <div class="flex justify-between text-[10px] text-slate-500 font-semibold tracking-wider">
                  <span>0đ</span>
                  <span>5.000.000đ+</span>
                </div>
              </div>

              <!-- Star Rating -->
              <div class="mb-4">
                <p class="text-sm font-bold tracking-tight text-slate-300 mb-3">Đánh giá tối thiểu</p>
                <div class="space-y-2">
                  <button class="flex items-center gap-2 w-full hover:bg-slate-800/80 p-2.5 rounded-xl transition-all border border-transparent hover:border-slate-700/50 active:scale-[0.98] active:bg-slate-800 group">
                    <div class="flex items-center gap-0.5">
                      <Star class="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <Star class="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <Star class="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <Star class="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <Star class="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <span class="text-[11px] font-bold ml-auto bg-slate-800/50 group-hover:bg-slate-700 px-2 py-1 rounded-md text-slate-300 transition-colors">4+ SAO</span>
                  </button>
                </div>
              </div>

              <BaseButton
                variant="outline"
                fullWidth
                @click="resetFilters"
              >
                Xóa tất cả bộ lọc
              </BaseButton>
            </div>
          </GlassCard>
        </aside>

        <!-- Product Grid (75%) -->
        <main class="w-full lg:w-3/4">
          <!-- Toolbar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4" data-reveal="fade-up">
            <div>
              <h1 class="text-3xl font-black tracking-tight mb-2">Khám phá Source Code</h1>
              <p class="text-slate-400">Khám phá các template và script cao cấp cho dự án của bạn.</p>
            </div>
            
            <div class="flex items-center gap-3">
              <BaseButton variant="outline" size="sm">
                <span>Sắp xếp</span>
                <template #icon-right>
                  <ChevronDown class="w-4 h-4" />
                </template>
              </BaseButton>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <template v-for="(product, index) in products" :key="product.id">
              <div
                data-reveal="fade-up"
                :data-reveal-delay="index * 100"
              >
                <ProductCard
                  :product="product"
                />
              </div>
            </template>
          </div>

          <!-- Pagination -->
          <div class="mt-12" data-reveal="fade-up" data-reveal-delay="400">
            <BasePagination 
              v-model:current-page="currentPage" 
              :total-pages="totalPages" 
            />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="range"].dual-range::-webkit-slider-thumb {
  pointer-events: auto;
  appearance: none;
  width: 14px;
  height: 14px;
  background-color: #3b82f6; /* Tailwind blue-500 as fallback */
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: 2px solid white;
}

input[type="range"].dual-range::-moz-range-thumb {
  pointer-events: auto;
  width: 14px;
  height: 14px;
  background-color: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: 2px solid white;
}

/* Checkbox peer-checked override for scoped component context */

/* Checkbox peer-checked override for scoped component context */
.peer:checked ~ .peer-checked\:bg-primary,
input:checked ~ .peer-checked\:bg-primary {
  background-color: var(--color-primary-solid) !important;
}
.peer:checked ~ .peer-checked\:border-primary,
input:checked ~ .peer-checked\:border-primary {
  border-color: var(--color-primary-solid) !important;
}
.peer:checked ~ .peer-checked\:text-primary,
input:checked ~ .peer-checked\:text-primary {
  color: var(--color-primary) !important;
}
</style>
