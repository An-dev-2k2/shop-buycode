<script setup>
import { ref } from 'vue'
import { Wallet, Info } from 'lucide-vue-next'
import GlassCard from '../components/GlassCard.vue'
import BaseBreadcrumb from '../components/BaseBreadcrumb.vue'
import WalletBalanceCard from '../components/WalletBalanceCard.vue'
import DepositForm from '../components/DepositForm.vue'
import TransactionHistoryList from '../components/TransactionHistoryList.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

// State / Mock Data
const currentBalance = ref(1250000)

const recentTransactions = [
  { id: 1, type: 'topup', method: 'Chuyển khoản MB Bank', date: 'Hôm nay, 09:15', amount: 500000, status: 'success' },
  { id: 2, type: 'topup', method: 'Chuyển khoản MB Bank', date: 'Hôm qua, 21:30', amount: 200000, status: 'success' },
  { id: 3, type: 'topup', method: 'Chuyển khoản MB Bank', date: '17/03/2026', amount: 1000000, status: 'success' },
]
</script>

<template>
  <div class="bg-background-dark min-h-screen pt-28 pb-20 relative overflow-hidden">
    <!-- Background Mesh Glows -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Page Header -->
      <div class="mb-8" data-reveal="fade-in">
        <div class="mb-3">
          <BaseBreadcrumb :items="[
            { name: 'Trang chủ', path: '/' },
            { name: 'Nạp tiền' }
          ]" />
        </div>
        
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex items-center gap-5">
            <div class="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-primary border border-blue-500/20 group">
              <Wallet class="w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h1 class="text-2xl uppercase font-black text-white mb-1 tracking-tight">Nạp tiền vào tài khoản</h1>
              <p class="text-slate-400 font-medium">Chọn phương thức và số tiền để bắt đầu nạp</p>
            </div>
          </div>
          
          <WalletBalanceCard :balance="currentBalance" />
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 items-start">
        
        <!-- MAIN CONTENT (Left) -->
        <div class="lg:w-2/3">
          <DepositForm />
        </div>

        <!-- SIDEBAR (Right) -->
        <div class="lg:w-1/3 flex flex-col gap-8 lg:sticky lg:top-24">
          <TransactionHistoryList :transactions="recentTransactions" />

          <!-- Warning Card -->
          <GlassCard padding="p-6" class="bg-amber-500/5 border-amber-500/20" data-reveal="fade-left" data-reveal-delay="200">
            <div class="flex items-start gap-4">
              <div class="p-2 rounded-lg bg-amber-500/20 text-amber-500 shrink-0">
                <Info class="w-5 h-5" />
              </div>
              <div>
                <h4 class="text-amber-500 font-bold mb-2">Lưu ý quan trọng</h4>
                <ul class="text-xs text-slate-400 space-y-2 list-disc ml-3 leading-relaxed">
                  <li>Chỉ thực hiện nạp tiền tại website chính thức <b>andev.vn</b></li>
                  <li>Nhập chính xác <b>Nội dung nạp</b> để hệ thống tự động cộng tiền trong 5-10 phút.</li>
                  <li>Nếu sau 30 phút chưa có tiền, vui lòng liên hệ <b>CSKH</b> qua Fanpage.</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  </div>
</template>
