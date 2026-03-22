<script setup>
import { ShoppingCart, Monitor, Zap, CheckCircle2, Share2, Heart, Flag, ShieldCheck, RotateCcw } from 'lucide-vue-next'
import GlassCard from './GlassCard.vue'
import BaseButton from './BaseButton.vue'
import BaseBadge from './BaseBadge.vue'
import { useCartStore } from '../stores/useCartStore'
import { useRouter } from 'vue-router'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const router = useRouter()

const formatPrice = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value).replace('₫', 'đ')
}

const handleBuyNow = () => {
  cartStore.addToCart(props.product)
  router.push('/cart')
}

const handleAddToCart = () => {
  cartStore.addToCart(props.product)
  alert('Đã thêm sản phẩm vào giỏ hàng!')
}
</script>

<template>
  <div class="sticky top-24 flex flex-col gap-6">
    <!-- Price Card -->
    <GlassCard padding="p-8" class="flex flex-col gap-6 !bg-blue-500/20 border !border-blue-500/30" data-reveal="fade-left">
      <div class="flex items-center justify-between">
        <BaseBadge variant="danger">Sale -25%</BaseBadge>
        <span class="text-slate-400 text-sm line-through">{{ formatPrice(product.originalPrice || 799000) }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-4xl font-black gradient-text">{{ formatPrice(product.price) }}</span>
      </div>
      <div class="flex flex-col gap-3">
        <BaseButton size="lg" fullWidth @click="handleBuyNow">
          <template #icon-left><Zap class="w-4 h-4" /></template>
          MUA NGAY
        </BaseButton>
        
        <div class="flex items-center gap-3">
          <BaseButton variant="ghost-primary" fullWidth @click="handleAddToCart">
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
        <div class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 text-center">
          <ShieldCheck class="w-8 h-8 text-primary" />
          <span class="text-[10px] uppercase font-bold text-slate-400">Secure Payment</span>
        </div>
        <div class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 text-center">
          <RotateCcw class="w-8 h-8 text-primary" />
          <span class="text-[10px] uppercase font-bold text-slate-400">14 Days Refund</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #60a5fa, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
