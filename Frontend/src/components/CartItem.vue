<script setup>
import { computed } from 'vue'
import { Trash2, Minus, Plus } from 'lucide-vue-next'
import BaseBadge from './BaseBadge.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  item: { type: Object, required: true }
})

const emit = defineEmits(['increase', 'decrease', 'remove'])

const subtotal = computed(() => {
  const priceNum = parseInt(String(props.item.price).replace(/\./g, '').replace('đ', '')) || 0
  return new Intl.NumberFormat('vi-VN').format(priceNum * props.item.quantity) + 'đ'
})
</script>

<template>
  <div class="group relative bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-300">
    <div class="flex gap-4">
      <!-- Thumbnail -->
      <router-link :to="`/product/${item.slug}`" class="shrink-0">
        <div class="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
          <img :src="item.image" :alt="item.title" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
        </div>
      </router-link>

      <!-- Info -->
      <div class="flex-1 min-w-0 flex flex-col gap-2">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <BaseBadge size="xs" :class="item.techTags?.[0]?.class">{{ item.techTags?.[0]?.name }}</BaseBadge>
            </div>
            <router-link :to="`/product/${item.slug}`">
              <h3 class="font-bold text-slate-900 dark:text-white text-sm md:text-base leading-snug line-clamp-2 hover:text-primary transition-colors">{{ item.title }}</h3>
            </router-link>
          </div>
          <!-- Remove btn -->
          <button
            @click="emit('remove', item.id)"
            class="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-all"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3 mt-auto">
          <!-- Quantity Control -->
          <div class="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/50 rounded-xl p-1">
            <button
              @click="emit('decrease', item.id)"
              :disabled="item.quantity <= 1"
              class="w-7 h-7 flex items-center justify-center rounded-lg transition-all"
              :class="item.quantity <= 1 ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'"
            >
              <Minus class="w-3.5 h-3.5" />
            </button>
            <span class="w-8 text-center text-sm font-bold text-slate-900 dark:text-white">{{ item.quantity }}</span>
            <button
              @click="emit('increase', item.id)"
              class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-all"
            >
              <Plus class="w-3.5 h-3.5" />
            </button>
          </div>

          <!-- Price -->
          <div class="text-right">
            <p class="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Tổng</p>
            <p class="text-base font-black text-slate-900 dark:text-white">{{ subtotal }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
