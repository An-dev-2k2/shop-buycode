<script setup>
import { ref, computed } from 'vue'
import { 
  CreditCard, 
  Banknote, 
  Info, 
  QrCode, 
  Check, 
  Copy 
} from 'lucide-vue-next'
import BaseInput from './BaseInput.vue'
import BaseBadge from './BaseBadge.vue'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'
import GlassCard from './GlassCard.vue'

const selectedAmount = ref(1000000)
const customAmount = ref('')
const copiedField = ref(null)
const showQRModal = ref(false)

// Bank Info
const bankInfo = {
  bankId: 'mb',
  bankName: 'MB Bank',
  accountNumber: '1234567890',
  accountName: 'TRUONG VAN AN',
  content: 'PAY9K2H7M',
  logo: 'https://img.vietqr.io/image/mb-logo.png'
}

const quickAmounts = [200000, 500000, 1000000, 2000000, 5000000]

const qrUrl = computed(() => {
  const amount = selectedAmount.value || 0
  const description = encodeURIComponent(bankInfo.content)
  const accountName = encodeURIComponent(bankInfo.accountName)
  return `https://img.vietqr.io/image/${bankInfo.bankId}-${bankInfo.accountNumber}-compact2.png?amount=${amount}&addInfo=${description}&accountName=${accountName}`
})

const formatPrice = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value).replace('₫', 'đ')
}

const setAmount = (val) => {
  selectedAmount.value = val
  customAmount.value = ''
}

const handleCustomAmount = (e) => {
  const val = parseInt(e.target.value) || 0
  selectedAmount.value = val
}

const copyToClipboard = (text, field) => {
  navigator.clipboard.writeText(text)
  copiedField.value = field
  setTimeout(() => {
    copiedField.value = null
  }, 2000)
}
</script>

<template>
  <div class="flex flex-col gap-10">
    <!-- Step 1: Payment Method -->
    <section data-reveal="fade-up">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-black">1</div>
        <h3 class="text-xl font-bold text-white uppercase tracking-tight">Chọn phương thức thanh toán</h3>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          class="flex items-center gap-4 p-5 rounded-2xl border transition-all text-left bg-blue-500/10 border-blue-500 ring-2 ring-blue-500/20"
        >
          <div class="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center shrink-0">
            <CreditCard class="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <div class="text-white font-black">Chuyển khoản ngân hàng</div>
            <div class="text-emerald-400 text-[10px] uppercase font-bold tracking-widest mt-1">Duyệt tự động 24/7</div>
          </div>
        </button>
      </div>
    </section>

    <!-- Step 2: Select Amount -->
    <section data-reveal="fade-up" data-reveal-delay="100">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-blue-500/20">2</div>
        <h3 class="text-xl font-bold text-white uppercase tracking-tight">Số tiền cần nạp</h3>
      </div>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
        <button 
          v-for="amount in quickAmounts" 
          :key="amount"
          @click="setAmount(amount)"
          class="group relative px-4 py-5 rounded-2xl border transition-all duration-300 overflow-hidden"
          :class="selectedAmount === amount 
            ? 'bg-blue-600 border-blue-400 text-white shadow-xl shadow-blue-500/30 scale-[1.05] z-10' 
            : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-800/60 hover:-translate-y-1'"
        >
          <!-- Shine effect on hover -->
          <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          
          <!-- Dot indicator -->
          <div 
            class="absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
            :class="[
              selectedAmount === amount 
                ? 'bg-white scale-110' 
                : 'bg-blue-500 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-50'
            ]"
          ></div>

          <div class="relative flex flex-col items-center justify-center">
            <span class="text-lg font-black tracking-tight">{{ formatPrice(amount).replace(',00', '').replace('đ', '') }}</span>
          </div>
        </button>
      </div>
      
      <div class="max-w-md" data-reveal="fade-in">
        <label class="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">Hoặc nhập số tiền tùy chỉnh</label>
        
        <BaseInput 
          v-model="customAmount"
          @input="handleCustomAmount"
          type="number"
          placeholder="Nhập số tiền khác..."
          :icon="Banknote"
          className="group"
        />
        
        <p class="mt-4 text-xs text-slate-500 flex items-center gap-2">
          <Info class="w-3.5 h-3.5 text-blue-400" />
          Mã QR sẽ tự động cập nhật số tiền sau khi bạn nhập xong.
        </p>
      </div>
    </section>

    <!-- Divider with Glow -->
    <div class="relative py-4" data-reveal="fade-in">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
      </div>
    </div>

    <!-- Final Details & QR -->
    <section data-reveal="fade-up" data-reveal-delay="200">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-emerald-500/20">3</div>
        <h3 class="text-xl font-bold text-white uppercase tracking-tight">Thực hiện thanh toán</h3>
      </div>

      <GlassCard padding="p-0" class="overflow-hidden border-slate-800 shadow-2xl">
        <div class="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-800/50">
          
          <!-- Left: QR Area (Compact & Focused) -->
          <div class="lg:w-[300px] p-6 flex flex-col items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
            <div @click="showQRModal = true" class="relative group/qr cursor-pointer">
              <!-- Glow effect -->
              <div class="absolute -inset-4 bg-emerald-500/10 rounded-[40px] blur-2xl opacity-0 group-hover/qr:opacity-100 transition-opacity"></div>
              
              <div class="bg-white p-4 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative z-10 transition-transform overflow-hidden group-hover/qr:scale-[1.03]">
                <img :src="qrUrl" alt="VietQR" class="w-44 sm:w-52 rounded-xl">
                
                <!-- Hover overlay -->
                <div class="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover/qr:opacity-100 transition-all flex flex-col items-center justify-center gap-2 rounded-3xl">
                  <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <QrCode class="w-5 h-5 text-black" />
                  </div>
                  <span class="text-[10px] font-black text-white uppercase tracking-widest">Phóng to mã</span>
                </div>
              </div>
            </div>

            <div class="mt-8 flex flex-col items-center gap-3 w-full">
              <div class="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] text-center leading-relaxed">
                Quét QRCode để <br/> thanh toán tự động
              </div>
            </div>
          </div>

          <!-- Right: Information Details (Vertical Stream) -->
          <div class="flex-grow p-8 sm:p-6 bg-slate-950/20">
            <div class="space-y-8">
              
              <!-- Bank Header Item -->
              <div class="flex items-center justify-between pb-6 border-b border-slate-800/50">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 rounded-2xl bg-blue-500/10 p-2.5 flex items-center justify-center border border-blue-500/30 shadow-xl ring-2 ring-blue-500/10">
                    <img :src="bankInfo.logo" :alt="bankInfo.bankName" class="w-full h-full object-contain">
                  </div>
                  <div>
                    <h4 class="text-white font-black text-xl leading-tight">{{ bankInfo.bankName }}</h4>
                    <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mt-0.5">Nạp tiền bằng QR</p>
                  </div>
                </div>
                <BaseBadge variant="success" size="sm">Hệ thống Auto</BaseBadge>
              </div>

              <!-- Info Rows -->
              <div class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1">
                  <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest w-40">Chủ tài khoản</span>
                  <span class="text-base font-black text-slate-100 uppercase tracking-tight">{{ bankInfo.accountName }}</span>
                </div>

                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-1 border-t border-slate-900/50">
                  <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest w-40">Số tài khoản</span>
                  <div class="flex items-center gap-4 group/item">
                    <span class="text-xl sm:text-2xl font-mono font-black text-white tracking-[0.1em]">{{ bankInfo.accountNumber }}</span>
                    <button 
                      @click="copyToClipboard(bankInfo.accountNumber, 'acc')"
                      class="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-all active:scale-90"
                    >
                      <Check v-if="copiedField === 'acc'" class="w-4 h-4 text-emerald-400" />
                      <Copy v-else class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 border-dashed">
                  <span class="text-[10px] font-black text-blue-400/80 uppercase tracking-widest w-40">Nội dung nạp</span>
                  <div class="flex items-center gap-4 flex-grow sm:flex-grow-0 justify-between sm:justify-end">
                    <span class="text-xl sm:text-xl font-black text-blue-400 tracking-[0.15em]">{{ bankInfo.content }}</span>
                    <button 
                      @click="copyToClipboard(bankInfo.content, 'content')"
                      class="p-3 bg-blue-500/20 border border-blue-500/30 rounded-2xl text-blue-400 hover:bg-blue-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-blue-500/10"
                    >
                      <Check v-if="copiedField === 'content'" class="w-5 h-5" />
                      <Copy v-else class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Footer: Total Summary -->
              <div class="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span class="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-1 block text-center sm:text-left">Số tiền bạn thanh toán</span>
                  <div class="text-3xl sm:text-4xl font-black text-white tracking-tight">{{ formatPrice(selectedAmount) }}</div>
                </div>
                
                <div class="flex items-center gap-4 py-3 px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div class="text-right">
                    <p class="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Duyệt tức thì</p>
                    <p class="text-[9px] text-slate-500 font-bold uppercase mt-0.5 whitespace-nowrap">Hỗ trợ 24/7</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  </div>

  <BaseModal 
    :show="showQRModal" 
    @close="showQRModal = false"
    title="Quét mã thanh toán"
    maxWidth="max-w-lg"
  >
    <div class="flex flex-col items-center text-center">
      <div class="bg-white p-6 rounded-[32px] shadow-2xl mb-6 ring-1 ring-slate-200 text-center">
        <img :src="qrUrl" alt="QR" class="mx-auto w-40 sm:w-60 lg:w-72 rounded-2xl">
      </div>
      
      <div class="w-full space-y-4">
        <div class="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div class="text-left">
            <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tổng tiền</p>
            <p class="text-xl font-black text-white">{{ formatPrice(selectedAmount) }}</p>
          </div>
          <div class="text-right">
            <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Nội dung nạp</p>
            <p class="text-xl font-black text-blue-400 tracking-widest">{{ bankInfo.content }}</p>
          </div>
        </div>
        
        <p class="text-xs text-slate-400 leading-relaxed px-4">
          Mở ứng dụng ngân hàng và chọn chức năng <b>Quét mã QR</b> để thực hiện thanh toán tự động.
        </p>
        
        <BaseButton 
          variant="primary" 
          fullWidth 
          class="py-4 rounded-2xl font-black uppercase tracking-widest mt-2"
          @click="showQRModal = false"
        >
          Đã hiểu
        </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
</style>
