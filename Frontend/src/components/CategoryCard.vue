<script setup>
import GlassCard from './GlassCard.vue'

defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <GlassCard 
    hover
    padding="p-6"
    class="flex flex-col items-center text-center cursor-pointer group"
  >
    <div 
      class="w-14 h-14 rounded-xl flex items-center justify-center 
             mb-4 transition-transform group-hover:scale-110"
      :class="category.bgClass || 'bg-primary/10'"
    >
      <component 
        :is="category.icon" 
        class="w-8 h-8" 
        :class="category.textClass || 'text-primary'"
      />
    </div>
    
    <h3 class="font-bold text-lg mb-1">{{ category.name }}</h3>
    <p class="text-sm text-slate-500">{{ category.itemCount }} items</p>
  </GlassCard>
</template>
