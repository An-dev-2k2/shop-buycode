<script setup>
import { computed } from 'vue'
import { Download, Clock, ExternalLink, Code, Globe, FileText, CheckCircle2 } from 'lucide-vue-next'
import BaseBadge from './BaseBadge.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const statusBadge = computed(() => {
  switch (props.order.status) {
    case 'completed': return { variant: 'success', text: 'Hoàn thành' }
    case 'processing': return { variant: 'warning', text: 'Đang xử lý' }
    default: return { variant: 'slate', text: 'Không xác định' }
  }
})
</script>

<template>
  <!-- Source Code Order -->
  <div v-if="order.type === 'source_code'" 
       class="group relative bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
    
    <div class="flex flex-col md:flex-row justify-between gap-6">
      <div class="flex gap-5">
        <!-- Icon -->
        <div class="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-primary/10 flex items-center justify-center text-primary shadow-inner border border-blue-100 dark:border-blue-500/20">
          <Code class="w-7 h-7" />
        </div>
        
        <div class="space-y-2">
          <div class="flex flex-wrap items-center gap-3">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors tracking-tight">{{ order.name }}</h3>
            <BaseBadge variant="primary" size="xs" class="font-bold tracking-wider">{{ order.version }}</BaseBadge>
          </div>
          
          <div class="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span class="flex items-center gap-1.5"><FileText class="w-4 h-4 text-slate-400" /> Mã ĐH: <span class="text-slate-700 dark:text-slate-300">{{ order.id }}</span></span>
            <span class="hidden sm:inline w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <span class="flex items-center gap-1.5"><Clock class="w-4 h-4 text-slate-400" /> Ngày mua: <span class="text-slate-700 dark:text-slate-300">{{ order.date }}</span></span>
          </div>
          
          <div class="pt-1 flex flex-wrap items-center gap-2">
            <template v-if="order.techTags">
              <BaseBadge 
                v-for="tag in order.techTags" 
                :key="tag.name"
                size="xs"
                :class="tag.class"
              >
                {{ tag.name }}
              </BaseBadge>
            </template>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col md:items-end justify-center shrink-0 border-t md:border-t-0 pt-5 md:pt-0 border-slate-100 dark:border-slate-700/60 mt-2 md:mt-0">
        <div class="flex items-center md:flex-col justify-between md:justify-center w-full gap-3 md:gap-1 text-right mb-4 md:mb-0">
          <span class="font-black text-lg text-slate-900 dark:text-white">{{ order.price }}</span>
          <BaseBadge :variant="statusBadge.variant" size="sm" class="flex items-center gap-1.5">
            <CheckCircle2 v-if="order.status === 'completed'" class="w-3.5 h-3.5" />
            {{ statusBadge.text }}
          </BaseBadge>
        </div>
        <BaseButton variant="primary" size="sm" class="w-full md:w-auto shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all group-hover:scale-[1.02] mt-2 ">
          <template #icon-left><Download class="w-4 h-4" /></template>
          Tải Source Code
        </BaseButton>
      </div>
    </div>
  </div>

  <!-- Website Order -->
  <div v-else-if="order.type === 'website'" 
       class="group relative bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-500/40 dark:hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
    
    <!-- Left Accent line -->
    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-teal-500 opacity-80"></div>
    
    <div class="flex flex-col md:flex-row justify-between gap-6 pl-2">
      <div class="flex gap-5 w-full">
        <!-- Icon -->
        <div class="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner border border-emerald-100 dark:border-emerald-500/20">
          <Globe class="w-7 h-7" />
        </div>
        
        <div class="space-y-3 w-full max-w-2xl">
          <div class="flex flex-wrap items-center justify-between md:justify-start gap-3">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">{{ order.name }}</h3>
            <BaseBadge :variant="statusBadge.variant" size="xs" class="font-bold tracking-wider">{{ statusBadge.text }}</BaseBadge>
          </div>
          
          <div class="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span class="flex items-center gap-1.5"><FileText class="w-4 h-4 text-slate-400" /> Mã ĐH: <span class="text-slate-700 dark:text-slate-300">{{ order.id }}</span></span>
            <span class="hidden sm:inline w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <span class="flex items-center gap-1.5"><Clock class="w-4 h-4 text-slate-400" /> Hạn chót: <span class="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded">{{ order.dueDate }}</span></span>
          </div>
          
          <!-- Modern Progress Bar -->
          <div class="w-full pt-1">
            <div class="flex justify-between items-end mb-2">
              <span class="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Tiến độ hoàn thành</span>
              <span class="text-sm font-black text-emerald-600 dark:text-emerald-400">{{ order.progress }}%</span>
            </div>
            <div class="w-full bg-slate-100 dark:bg-slate-700/50 rounded-full h-2.5 shadow-inner overflow-hidden">
              <div class="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full transition-all duration-1000 relative" :style="{ width: `${order.progress}%` }">
                 <div class="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col md:items-end justify-center shrink-0 border-t md:border-t-0 pt-5 md:pt-0 border-slate-100 dark:border-slate-700/60 mt-2 md:mt-0">
        <div class="flex items-center md:flex-col justify-between md:justify-center w-full gap-3 md:gap-1 text-right mb-4 md:mb-0">
          <span class="font-black text-lg text-slate-900 dark:text-white">{{ order.price }}</span>
        </div>
        <BaseButton variant="outline" size="sm" class="w-full md:w-auto mt-auto border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 group-hover:border-emerald-500/50 transition-all">
          <template #icon-right><ExternalLink class="w-4 h-4" /></template>
          Xem chi tiết
        </BaseButton>
      </div>
    </div>
  </div>
</template>
