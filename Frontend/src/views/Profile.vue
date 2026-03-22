<script setup>
import { ref } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import PageHeader from '../components/PageHeader.vue'
import ProfileSidebar from '../components/ProfileSidebar.vue'
import BaseBreadcrumb from '../components/BaseBreadcrumb.vue'

const userProfileData = ref({
  name: 'Trương Văn An',
  username: 'minkhoa.dev',
  avatar: 'https://ui-avatars.com/api/?name=Andev&background=0D8ABC&color=fff&size=120',
  orders: 23,
  reviews: 5,
  walletBalance: '1.25M'
})

const formData = ref({
  name: 'Trương Văn An',
  phone: '0912345678'
})

const passwordData = ref({
  current: '',
  new: '',
  confirm: ''
})

useScrollReveal()
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Breadcrumb -->
      <div class="mb-8" data-reveal="fade-in">
        <BaseBreadcrumb :items="[
          { name: 'Trang chủ', path: '/' },
          { name: formData.name },
          { name: 'Thông tin cá nhân' }
        ]" />
      </div>

      <div class="flex flex-col lg:flex-row items-start gap-8">
        
        <!-- Sidebar Component -->
        <ProfileSidebar :user="userProfileData" />

        <!-- Main Content -->
        <div class="flex-1 space-y-6 lg:min-w-0" data-reveal="fade-up" data-reveal-delay="100">
          <PageHeader 
            title="Thông tin cá nhân" 
            subtitle="Quản lý thông tin tài khoản và tùy chọn cài đặt của bạn" 
          />
          
          <div class="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-10">
              <!-- Wallet Card -->
              <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-md relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-4 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
                  <svg class="w-16 h-16" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                </div>
                <div class="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 class="text-blue-100 font-medium text-sm mb-1">Số dư ví</h3>
                    <div class="text-2xl font-bold tracking-tight mb-2">1.250.000 đ</div>
                    <div class="flex items-center gap-1 text-xs text-blue-100 bg-blue-400/30 w-fit px-2 py-1 rounded-full backdrop-blur-sm shadow-inner">
                      <span class="font-medium">+200.000đ hôm nay</span>
                    </div>
                  </div>
                  <RouterLink to="/wallet" class="mt-6 flex items-center gap-1 text-sm font-semibold hover:text-blue-100 transition-colors pointer-events-auto w-fit">
                    Nạp tiền
                    <ChevronRight class="w-4 h-4" />
                  </RouterLink>
                </div>
              </div>
              
              <!-- Total Deposited Info Card -->
              <div class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/50 flex flex-col justify-between">
                <div>
                  <h3 class="text-slate-500 dark:text-slate-400 font-medium text-sm mb-1">Tổng đã nạp</h3>
                  <div class="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">5.750.000 đ</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">
                    Tháng này: <span class="text-slate-700 dark:text-slate-300 font-semibold">4 giao dịch</span>
                  </div>
                </div>
                <RouterLink to="/wallet" class="mt-6 flex items-center gap-1 text-sm font-semibold text-primary hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit">
                  Lịch sử
                  <ChevronRight class="w-4 h-4" />
                </RouterLink>
              </div>
              
              <!-- Total Orders Info Card -->
              <div class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/50 flex flex-col justify-between">
                <div>
                  <h3 class="text-slate-500 dark:text-slate-400 font-medium text-sm mb-1">Tổng đơn hàng</h3>
                  <div class="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">23 đơn</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center gap-1">
                    <span class="text-green-600 dark:text-green-500 font-medium whitespace-nowrap">20 hoàn thành</span>
                    <span class="hidden sm:inline">·</span>
                    <span class="text-amber-500 font-medium whitespace-nowrap">2 đang xử lý</span>
                  </div>
                </div>
                <a href="#" class="mt-6 flex items-center gap-1 text-sm font-semibold text-primary hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit">
                  Xem đơn
                  <ChevronRight class="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div class="h-px bg-slate-100 dark:bg-slate-800 my-8"></div>
            
            <div class="flex items-start justify-between mb-6">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="w-4 h-1 bg-primary rounded-full"></span>
                  <h2 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Cập nhật thông tin</h2>
                </div>
                <p class="text-slate-500 dark:text-slate-400 text-sm max-w-lg ml-6">Thay đổi thông tin liên hệ và dữ liệu cá nhân của bạn trên BuySource.</p>
              </div>
            </div>

            <form class="space-y-4 mb-10 relative z-10" @submit.prevent>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Họ và tên</label>
                  <BaseInput v-model="formData.name" placeholder="Nhập họ và tên" />
                </div>
                <div>
                  <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Số điện thoại</label>
                  <BaseInput v-model="formData.phone" type="tel" placeholder="Nhập số điện thoại" />
                </div>
              </div>
              <div class="pt-4 flex justify-end">
                <BaseButton variant="primary" size="md" type="submit">
                  Lưu thay đổi
                </BaseButton>
              </div>
            </form>

            <div class="h-px bg-slate-100 dark:bg-slate-800 my-8"></div>
            
            <div class="flex items-start justify-between mb-6">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="w-4 h-1 bg-emerald-500 rounded-full"></span>
                  <h2 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Đổi mật khẩu</h2>
                </div>
                <p class="text-slate-500 dark:text-slate-400 text-sm max-w-lg ml-6">Đảm bảo tài khoản của bạn đang sử dụng một mật khẩu dài, ngẫu nhiên để giữ an toàn.</p>
              </div>
            </div>

            <form class="space-y-4" @submit.prevent>
              <div class="grid grid-cols-1 gap-4 max-w-xl">
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mật khẩu hiện tại</label>
                  <BaseInput v-model="passwordData.current" type="password" placeholder="Nhập mật khẩu hiện tại" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mật khẩu mới</label>
                  <BaseInput v-model="passwordData.new" type="password" placeholder="Nhập mật khẩu mới" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Xác nhận mật khẩu mới</label>
                  <BaseInput v-model="passwordData.confirm" type="password" placeholder="Nhập lại mật khẩu mới" />
                </div>
              </div>
              <div class="pt-4 flex justify-start">
                <BaseButton variant="secondary" size="md" type="submit">
                  Cập nhật mật khẩu
                </BaseButton>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
