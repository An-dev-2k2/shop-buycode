<script setup>
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:currentPage', 'change'])

const pages = computed(() => {
  const arr = []
  for (let i = 1; i <= props.totalPages; i++) {
    arr.push(i)
  }
  return arr
})

const handlePageChange = (page) => {
  if (page < 1 || page > props.totalPages || page === props.currentPage || props.disabled) return
  emit('update:currentPage', page)
  emit('change', page)
}
</script>

<template>
  <div class="flex justify-center gap-2">
    <!-- Prev -->
    <button 
      @click="handlePageChange(currentPage - 1)"
      :disabled="currentPage === 1 || disabled"
      class="w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
      :class="currentPage === 1 || disabled 
        ? 'glass-card text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60' 
        : 'glass-card text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary cursor-pointer'"
    >
      <ChevronLeft class="w-4 h-4" />
    </button>

    <!-- Pages -->
    <button 
      v-for="page in pages" 
      :key="page"
      @click="handlePageChange(page)"
      :disabled="disabled"
      class="w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all"
      :class="page === currentPage 
        ? 'bg-primary text-white shadow-lg shadow-primary/30' 
        : 'glass-card hover:border-primary hover:text-primary dark:hover:text-primary text-slate-600 dark:text-slate-300 cursor-pointer'"
    >
      {{ page }}
    </button>

    <!-- Next -->
    <button 
      @click="handlePageChange(currentPage + 1)"
      :disabled="currentPage === totalPages || disabled"
      class="w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
      :class="currentPage === totalPages || disabled 
        ? 'glass-card text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60' 
        : 'glass-card text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary cursor-pointer'"
    >
      <ChevronRight class="w-4 h-4" />
    </button>
  </div>
</template>
