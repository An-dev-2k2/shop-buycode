<script setup>
import { 
  ExternalLink, 
  Star, 
  Eye, 
  ShoppingCart 
} from 'lucide-vue-next'
import BaseBadge from './BaseBadge.vue'
import BaseButton from './BaseButton.vue'

defineProps({
  product: {
    type: Object,
    required: true
  }
})

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
  e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
}
</script>

<template>
  <div
    class="product-card group relative flex flex-col rounded-2xl overflow-hidden 
           bg-slate-900/40 border border-slate-800/60 transition-all duration-500 
           hover:bg-slate-900/60 hover:border-primary/30 hover:-translate-y-2
           hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_20px_rgba(14,165,233,0.1)]
           cursor-pointer h-full"
    @mousemove="handleMouseMove"
  >
    <!-- Thumbnail Area -->
    <router-link :to="{ name: 'product-detail', params: { slug: product.slug } }" class="relative aspect-video overflow-hidden">
      <div class="w-full h-full overflow-hidden">
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-full object-cover object-top transition-all duration-[3000ms] ease-in-out 
                 group-hover:scale-110 group-hover:object-bottom"
          loading="lazy"
        />
      </div>
      
      <!-- Hover preview icon -->
      <div 
        class="absolute inset-0 flex items-center justify-center opacity-0 
               group-hover:opacity-100 transition-all duration-500 bg-slate-900/40 backdrop-blur-[2px]"
      >
        <div 
          class="w-12 h-12 rounded-full bg-blue-500 border 
                 border-white/20 flex items-center justify-center scale-50 
                 group-hover:scale-100 transition-all duration-500 shadow-[0_0_20px_rgba(14,165,233,0.4)]"
        >
          <ExternalLink class="w-5 h-5 text-white" />
        </div>
      </div>

      <!-- Corner Tag (Optional) -->
      <div 
        v-if="product.tag" 
        class="absolute top-3 left-3 z-10"
      >
        <BaseBadge variant="primary" size="xs">{{ product.tag }}</BaseBadge>
      </div>
    </router-link>

    <!-- Content Area -->
    <div class="p-4 flex flex-col flex-1 gap-3">
      <!-- Badge / Tech Tags -->
      <div class="flex flex-wrap items-center gap-2">
        <template v-if="product.techTags">
          <BaseBadge 
            v-for="tag in product.techTags" 
            :key="tag.name"
            size="xs"
            :class="tag.class"
          >
            {{ tag.name }}
          </BaseBadge>
        </template>
      </div>

      <!-- Title + Description -->
      <div class="space-y-1.5">
        <router-link :to="{ name: 'product-detail', params: { slug: product.slug } }">
          <h3 
            class="text-[15px] font-bold text-slate-100 leading-snug line-clamp-1 
                   group-hover:text-primary transition-colors duration-300"
          >
            {{ product.title }}
          </h3>
        </router-link>
        
        <p 
          v-if="product.description"
          class="text-slate-500 text-[12.5px] leading-relaxed line-clamp-1"
        >
          {{ product.description }}
        </p>

        <!-- Author Info (Optional) -->
        <div v-if="product.author" class="flex items-center gap-2 pt-1">
          <img 
            v-if="product.author.avatar"
            class="w-5 h-5 rounded-full border border-slate-700" 
            :src="product.author.avatar" 
            :alt="product.author.name"
            loading="lazy"
          />
          <span class="text-xs text-slate-400">{{ product.author.name }}</span>
        </div>
      </div>

      <div class="flex-1"></div>

      <!-- Price & Rating -->
      <div class="flex items-center justify-between pt-3 border-t border-white/[0.06]">
        <div>
          <p class="text-[9px] font-bold text-slate-600 uppercase tracking-[0.12em] mb-0.5">
            Giá bán
          </p>
          <span class="text-lg font-black text-white">{{ product.price }}</span>
        </div>
        
        <div 
          v-if="product.rating"
          class="flex items-center gap-1 bg-amber-500/10 border 
                 border-amber-500/20 px-2.5 py-1.5 rounded-full"
        >
          <Star class="w-3 h-3 text-amber-400 fill-amber-400" />
          <span class="text-[11px] font-black text-amber-400 tracking-tight">
            {{ product.rating.toFixed(1) }}
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-2 gap-2.5 mt-2">
        <BaseButton 
          variant="outline" 
          size="sm"
          :to="`/product/${product.slug}`"
        >
          <template #icon-left><Eye class="w-3.5 h-3.5" /></template>
          Chi tiết
        </BaseButton>
        
        <BaseButton 
          size="sm"
          class="shadow-[0_0_20px_rgba(14,165,233,0.2)] group-hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] 
                 group-hover:scale-[1.02] transition-all duration-300"
        >
          <template #icon-left><ShoppingCart class="w-3.5 h-3.5" /></template>
          Thêm giỏ
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  isolation: isolate;
}

.product-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    800px circle at var(--mouse-x, 0) var(--mouse-y, 0),
    rgba(14, 165, 233, 0.06),
    transparent 40%
  );
  z-index: -1;
  opacity: 0;
  transition: opacity 0.5s;
}

.product-card:hover::before {
  opacity: 1;
}

/* Hiệu ứng trơn tru cho ảnh khi scroll-up */
img {
  will-change: object-position, transform;
}
</style>
