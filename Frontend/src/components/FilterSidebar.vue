<script setup>
import { computed } from 'vue'
import { Search, Star, SlidersHorizontal } from 'lucide-vue-next'
import BaseInput from './BaseInput.vue'
import BaseCheckbox from './BaseCheckbox.vue'
import BaseButton from './BaseButton.vue'
import GlassCard from './GlassCard.vue'

const searchQuery = defineModel('searchQuery', { default: '' })
const selectedCategories = defineModel('selectedCategories', { default: () => [] })
const selectedTechs = defineModel('selectedTechs', { default: () => [] })
const minPrice = defineModel('minPrice', { default: 0 })
const maxPrice = defineModel('maxPrice', { default: 5000000 })

const emit = defineEmits(['reset'])

const absoluteMin = 0
const absoluteMax = 5000000
const STEP_RANGE = 100000

const categories = [
  { id: 'all', name: 'Tất cả' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'mobile', name: 'Mobile App' }
]

const technologies = [
  { id: 'react', name: 'React' },
  { id: 'vue', name: 'Vue' },
  { id: 'nodejs', name: 'NodeJS' },
  { id: 'tailwind', name: 'Tailwind' },
  { id: 'flutter', name: 'Flutter' }
]

const minPercent = computed(() => ((minPrice.value - absoluteMin) / (absoluteMax - absoluteMin)) * 100)
const maxPercent = computed(() => ((maxPrice.value - absoluteMin) / (absoluteMax - absoluteMin)) * 100)

const formatPrice = (val) => {
  return new Intl.NumberFormat('vi-VN').format(val) + 'đ'
}
</script>

<template>
  <GlassCard padding="p-6" class="sticky top-28">
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
        <div class="relative w-full h-1.5 bg-slate-800 rounded-lg mt-2 mb-4">
          <div class="absolute h-full bg-primary rounded-lg pointer-events-none" 
               :style="{ left: minPercent + '%', right: (100 - maxPercent) + '%' }"></div>
          
          <input 
            type="range" 
            :min="absoluteMin" 
            :max="absoluteMax" 
            :step="STEP_RANGE"
            v-model.number="minPrice"
            class="absolute w-full top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none dual-range" 
          />
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
        @click="$emit('reset')"
      >
        Xóa tất cả bộ lọc
      </BaseButton>
    </div>
  </GlassCard>
</template>

<style scoped>
input[type="range"].dual-range::-webkit-slider-thumb {
  pointer-events: auto;
  appearance: none;
  width: 14px;
  height: 14px;
  background-color: #3b82f6;
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
