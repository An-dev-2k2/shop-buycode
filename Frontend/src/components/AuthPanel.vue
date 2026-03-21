<script setup>
import GlassCard from './GlassCard.vue'

defineProps({
  badge: {
    type: String,
    default: 'Marketplace Giao diện & Dịch vụ WEB #1'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stats: {
    type: Array,
    default: () => [
      { value: '10,000+', label: 'Sản phẩm' },
      { value: '5,000+',  label: 'Developers' },
      { value: '50,000+', label: 'Khách hàng' },
    ]
  }
})
</script>

<template>
  <div class="hidden lg:flex lg:w-1/2 xl:w-[55%] relative flex-col justify-center p-12 overflow-hidden bg-[#080B16]">
    <!-- Background glows -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[160px] animate-pulse"></div>
      <div class="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[140px] animate-pulse" style="animation-delay: 2s"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--color-primary-rgb),0.05)_0%,transparent_70%)]"></div>
    </div>

    <!-- Center content -->
    <div class="relative z-10">
      <!-- Headline -->
      <div class="mb-10 text-reveal-trigger">
        <span class="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 rounded-full mb-5">
          {{ badge }}
        </span>
        <h1 class="text-4xl xl:text-5xl font-black leading-tight text-white mb-4" v-html="title"></h1>
        <p class="text-slate-400 text-lg">
          {{ description }}
        </p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4 mb-10">
        <GlassCard 
          v-for="stat in stats" 
          :key="stat.label"
          padding="p-4"
          class="text-center"
        >
          <div class="text-2xl font-black gradient-text mb-1">{{ stat.value }}</div>
          <div class="text-xs text-slate-500 font-semibold uppercase tracking-wider">{{ stat.label }}</div>
        </GlassCard>
      </div>

      <!-- Custom slot for testimonials or other info -->
      <slot />
    </div>
  </div>
</template>
