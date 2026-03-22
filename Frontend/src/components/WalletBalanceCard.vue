<script setup>
import GlassCard from './GlassCard.vue'

defineProps({
  balance: {
    type: Number,
    required: true
  }
})

const formatPrice = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value).replace('₫', 'đ')
}
</script>

<template>
  <GlassCard padding="p-6 md:px-8" class="border-primary/20 bg-primary/5 min-w-[300px] hover:shadow-primary/10 transition-all">
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs uppercase tracking-widest text-slate-400 font-bold">Số dư hiện tại</span>
      <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
    </div>
    <div class="text-3xl font-black text-white flex items-center gap-2">
      {{ formatPrice(balance) }}
    </div>
  </GlassCard>
</template>
