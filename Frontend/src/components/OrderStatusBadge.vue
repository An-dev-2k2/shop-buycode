<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true // 'pending', 'processing', 'completed', 'cancelled', 'failed'
  },
  size: {
    type: String,
    default: 'md' // 'sm', 'md', 'lg'
  }
})

const statusMap = {
  pending: {
    label: 'Chờ thanh toán',
    class: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700/40'
  },
  processing: {
    label: 'Đang xử lý',
    class: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-700/40'
  },
  completed: {
    label: 'Hoàn thành',
    class: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-700/40'
  },
  cancelled: {
    label: 'Đã hủy',
    class: 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-700/50 dark:text-slate-400 dark:border-slate-700'
  },
  failed: {
    label: 'Thất bại',
    class: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700/40'
  }
}

const sizeClass = {
  sm: 'text-[11px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
  lg: 'text-sm px-3 py-1.5'
}

const config = computed(() => statusMap[props.status] || statusMap.pending)
</script>

<template>
  <span 
    class="inline-flex items-center gap-1.5 font-bold rounded-lg border"
    :class="[config.class, sizeClass[size]]"
  >
    <span class="w-1.5 h-1.5 rounded-full bg-current opacity-80"></span>
    {{ config.label }}
  </span>
</template>
