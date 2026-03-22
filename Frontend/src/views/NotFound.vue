<script setup>
import { Home, ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import BaseButton from '../components/BaseButton.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()
const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-background-dark pt-28 pb-20 relative overflow-hidden flex flex-col justify-center items-center">
    <!-- Background Mesh Glows -->
    <div class="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[10%] right-[20%] w-[30%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="container mx-auto px-4 max-w-4xl relative z-10 text-center flex flex-col items-center">
      <!-- 404 Visual -->
      <div 
        class="relative mb-8"
        data-reveal="fade-up"
      >
        <h1 class="text-[140px] md:text-[220px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-700/80 dark:to-slate-900 drop-shadow-sm select-none">
          404
        </h1>
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="text-xl md:text-3xl font-black gradient-text uppercase tracking-widest backdrop-blur-md bg-white/50 dark:bg-slate-900/60 px-8 py-3 rounded-2xl border border-white/20 dark:border-white/10 shadow-xl">
            Mất kết nối
          </div>
        </div>
      </div>

      <!-- Text content -->
      <div class="max-w-xl mx-auto space-y-4 mb-10" data-reveal="fade-up" data-reveal-delay="100">
        <h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Không tìm thấy trang</h2>
        <p class="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
          Trang bạn đang cố gắng truy cập không tồn tại, đã bị gỡ bỏ hoặc bạn không có quyền truy cập. Hãy kiểm tra lại đường dẫn.
        </p>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row items-center gap-4" data-reveal="fade-up" data-reveal-delay="200">
        <BaseButton @click="router.go(-1)" variant="outline" size="lg" class="w-full sm:w-auto min-w-[160px] border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
          <template #icon-left><ArrowLeft class="w-5 h-5" /></template>
          Quay lại
        </BaseButton>
        <BaseButton to="/" variant="primary" size="lg" class="w-full sm:w-auto shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all min-w-[160px]">
          <template #icon-left><Home class="w-5 h-5" /></template>
          Về Trang Chủ
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #60a5fa, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
