<script setup>
import { ref, computed } from 'vue'
import { ChevronRight, Download, Clock, ExternalLink, Code, Globe, FileText, CheckCircle2 } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

import BaseBreadcrumb from '../components/BaseBreadcrumb.vue'
import PageHeader from '../components/PageHeader.vue'
import ProfileSidebar from '../components/ProfileSidebar.vue'
import OrderCard from '../components/OrderCard.vue'

useScrollReveal()

const userProfileData = ref({
  name: 'Trương Văn An',
  username: 'andev',
  avatar: 'https://ui-avatars.com/api/?name=Andev&background=0D8ABC&color=fff&size=120',
  orders: 23,
  reviews: 5,
  walletBalance: '1.25M'
})

const activeTab = ref('all') // 'all', 'source_code', 'website'

const orders = ref([
  {
    id: 'ORD-2024-0891',
    type: 'source_code',
    name: 'E-commerce React Template',
    date: '15/03/2026',
    price: '1.250.000đ',
    status: 'completed',
    techTags: [
      { name: 'React', class: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-transparent' },
      { name: 'Node.js', class: 'text-green-600 dark:text-green-400 bg-green-500/10 border-transparent' }
    ],
    version: 'v2.1.0'
  },
  {
    id: 'ORD-2024-0905',
    type: 'website',
    name: 'Hệ thống Quản lý Thiết Bị - App',
    date: '10/03/2026',
    price: '15.500.000đ',
    status: 'processing',
    progress: 45,
    dueDate: '30/04/2026'
  },
  {
    id: 'ORD-2024-0750',
    type: 'source_code',
    name: 'Fintech Dashboard Node',
    date: '02/02/2026',
    price: '2.100.000đ',
    status: 'completed',
    techTags: [
      { name: 'Vue', class: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-transparent' },
      { name: 'Express', class: 'text-slate-600 dark:text-slate-400 bg-slate-500/10 border-transparent' }
    ],
    version: 'v1.0.5'
  }
])

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orders.value
  return orders.value.filter(o => o.type === activeTab.value)
})

const getStatusBadge = (status) => {
  switch (status) {
    case 'completed': return { variant: 'success', text: 'Hoàn thành' }
    case 'processing': return { variant: 'primary', text: 'Đang triển khai' }
    default: return { variant: 'slate', text: 'Không xác định' }
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Breadcrumb -->
      <div class="mb-8" data-reveal="fade-in">
        <BaseBreadcrumb :items="[
          { name: 'Trang chủ', path: '/' },
          { name: userProfileData.name },
          { name: 'Đơn hàng đã mua' }
        ]" />
      </div>

      <div class="flex flex-col lg:flex-row items-start gap-8">
        <!-- Sidebar -->
        <ProfileSidebar :user="userProfileData" />

        <!-- Main Content -->
        <div class="flex-1 space-y-6 lg:min-w-0" data-reveal="fade-up" data-reveal-delay="100">
          <PageHeader 
            title="Đơn hàng đã mua" 
            subtitle="Quản lý lịch sử giao dịch và trạng thái các sản phẩm / dịch vụ của bạn." 
          />
          
          <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <!-- Tabs -->
            <div class="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <button 
                @click="activeTab = 'all'"
                class="px-4 py-2 text-sm font-semibold rounded-xl transition-all"
                :class="activeTab === 'all' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'"
              >
                Tất cả đơn
              </button>
              <button 
                @click="activeTab = 'source_code'"
                class="px-4 py-2 text-sm font-semibold rounded-xl transition-all flex items-center gap-2"
                :class="activeTab === 'source_code' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40'"
              >
                <Code class="w-4 h-4" />
                Source Code
              </button>
              <button 
                @click="activeTab = 'website'"
                class="px-4 py-2 text-sm font-semibold rounded-xl transition-all flex items-center gap-2"
                :class="activeTab === 'website' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/40'"
              >
                <Globe class="w-4 h-4" />
                Đặt làm Website/App
              </button>
            </div>

            <!-- Orders List -->
            <TransitionGroup 
              name="list" 
              tag="div" 
              class="space-y-4 relative min-h-[300px]"
            >
              <div v-if="filteredOrders.length === 0" key="empty-state" class="text-center py-16 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 w-full">
                <div class="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 dark:border-slate-700/50">
                  <FileText class="w-8 h-8 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Chưa có đơn hàng nào</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">Danh mục yêu cầu hiện tại của bạn đang trống. Hãy khám phá thêm các sản phẩm trên Andev.</p>
              </div>

              <div 
                v-for="(order, index) in filteredOrders" 
                :key="order.id"
                class="w-full"
                data-reveal="fade-up"
                :data-reveal-delay="index * 100"
              >
                <OrderCard :order="order" />
              </div>
            </TransitionGroup>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Transition Group Animations for Orders List */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.list-leave-active {
  position: absolute;
  width: calc(100% - 2px); /* Tương thích với container padding/margin */
}
</style>
