<script setup>
import { Clock, Plus } from 'lucide-vue-next'
import GlassCard from './GlassCard.vue'

defineProps({
  transactions: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section data-reveal="fade-left">
    <div class="flex items-center justify-between mb-6">
      <h3 class="flex items-center gap-2 text-xl font-bold text-white uppercase tracking-tight">
        <Clock class="w-5 h-5 text-primary" />
        Lịch sử nạp
      </h3>
      <button class="text-xs text-primary font-bold hover:underline">Xem tất cả</button>
    </div>
    
    <div class="space-y-3">
      <GlassCard 
        v-for="tx in transactions" 
        :key="tx.id" 
        padding="p-4" 
        class="hover:bg-white/5 transition-colors cursor-pointer group border-transparent hover:border-slate-800"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shrink-0 border border-slate-800">
              <Plus class="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div class="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{{ tx.method }}</div>
              <div class="text-[10px] text-slate-500 font-bold mt-0.5">{{ tx.date }}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-black text-white">+{{ tx.amount.toLocaleString('vi-VN') }}đ</div>
            <div class="flex items-center gap-1 justify-end mt-1">
              <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span class="text-[10px] text-emerald-400 font-black uppercase">Thành công</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  </section>
</template>
