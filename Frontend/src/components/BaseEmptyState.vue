<script setup>
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  icon: {
    type: Object, // Lucide icon component
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  actionText: {
    type: String,
    default: 'Quay lại trang chủ'
  },
  actionTo: {
    type: String,
    default: '/'
  },
  actionVariant: {
    type: String,
    default: 'primary'
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center py-16 md:py-24 px-4 w-full" data-reveal="fade-up">
    <div class="w-28 h-28 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center mb-6">
      <component :is="icon" class="w-12 h-12 text-slate-300 dark:text-slate-600" />
    </div>
    
    <div class="max-w-md mx-auto space-y-2 mb-8">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">{{ title }}</h2>
      <p v-if="description" class="text-base text-slate-500 dark:text-slate-400">{{ description }}</p>
    </div>
    
    <BaseButton v-if="actionTo" :to="actionTo" :variant="actionVariant" size="lg" class="shadow-lg hover:-translate-y-0.5 transition-all">
      {{ actionText }}
    </BaseButton>
    <slot name="actions"></slot>
  </div>
</template>
