<script setup>
import { ChevronRight } from 'lucide-vue-next'

defineProps({
  items: {
    type: Array, // Expected: [{ name: 'Trang chủ', path: '/' }, { name: 'Current Page' }]
    required: true
  }
})
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-400">
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-2">
        <RouterLink 
          v-if="item.path" 
          :to="item.path" 
          class="hover:text-primary transition-colors font-medium"
        >
          {{ item.name }}
        </RouterLink>
        <span 
          v-else 
          class="text-slate-900 dark:text-slate-200 font-medium"
          aria-current="page"
        >
          {{ item.name }}
        </span>

        <ChevronRight 
          v-if="index < items.length - 1" 
          class="w-4 h-4 opacity-50 shrink-0" 
        />
      </li>
    </ol>
  </nav>
</template>
