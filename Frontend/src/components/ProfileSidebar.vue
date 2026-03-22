<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { 
  User, 
  Wallet, 
  ShoppingBag, 
  LogOut,
  CheckCircle2,
  Camera,
  Upload
} from 'lucide-vue-next'

import BaseBadge from './BaseBadge.vue'
import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      name: 'Trương Văn An',
      username: 'andev',
      avatar: 'https://ui-avatars.com/api/?name=Andev&background=0D8ABC&color=fff&size=120',
      orders: 23,
      reviews: 5,
      walletBalance: '1.25M'
    })
  }
})

const route = useRoute()
const showAvatarModal = ref(false)

const sidebarLinks = [
  { name: 'Thông tin cá nhân', icon: User, path: '/profile' },
  { name: 'Nạp tiền', icon: Wallet, path: '/wallet' },
  { name: 'Đơn hàng của tôi', icon: ShoppingBag, path: '/orders' },
]

const isActive = (path) => {
  return route.path === path
}
</script>

<template>
  <div class="w-full shrink-0 space-y-6 lg:w-80 lg:sticky lg:top-28 lg:h-max" data-reveal="fade-right">
    <!-- Profile Card -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-black/20 border border-slate-200/60 dark:border-slate-800/60 flex flex-col items-center relative text-center pb-6">
      <!-- Background element -->
      <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-t-2xl overflow-hidden">
         <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(white 1px, transparent 1px); background-size: 16px 16px;"></div>
      </div>
      
      <div 
        class="relative mt-16 mb-3 group cursor-pointer z-10"
        @click="showAvatarModal = true"
      >
        <img :src="user.avatar" alt="Avatar" class="w-28 h-28 rounded-full border-4 border-white dark:border-slate-900 shadow-xl object-cover transition-transform duration-300 group-hover:scale-105">
        
        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center border-4 border-transparent backdrop-blur-sm">
          <Camera class="w-8 h-8 text-white drop-shadow-md" />
        </div>
        
        <div class="absolute bottom-1 right-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-full border-2 border-white dark:border-slate-900 shadow-md w-7 h-7 flex items-center justify-center z-10">
          <CheckCircle2 class="w-4 h-4" />
        </div>
      </div>
      
      <div class="px-6 w-full flex flex-col items-center">
        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">{{ user.name }}</h2>
        <div class="flex items-center justify-center gap-2 mb-4">
          <BaseBadge variant="primary" size="sm" class="shadow-sm">Thành viên Bạc</BaseBadge>
          <BaseBadge variant="slate" size="sm" class="normal-case opacity-80 bg-transparent border-slate-200 dark:border-slate-700">Tham gia: 01/2024</BaseBadge>
        </div>
        <p class="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-[220px] leading-relaxed">Khách hàng thân thiết của nền tảng BuySource</p>
        
        <div class="grid grid-cols-3 gap-2 w-full p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
          <div class="text-center">
            <div class="text-xl font-bold text-slate-900 dark:text-white">{{ user.orders }}</div>
            <div class="text-[11px] uppercase tracking-wide font-medium text-slate-500 dark:text-slate-400 mt-1">Đơn hàng</div>
          </div>
          <div class="text-center border-l border-r border-slate-200 dark:border-slate-700/50">
            <div class="text-xl font-bold text-slate-900 dark:text-white">{{ user.reviews }}</div>
            <div class="text-[11px] uppercase tracking-wide font-medium text-slate-500 dark:text-slate-400 mt-1">Đánh giá</div>
          </div>
          <div class="text-center">
            <div class="text-xl font-bold text-primary dark:text-blue-400">{{ user.walletBalance }}</div>
            <div class="text-[11px] uppercase tracking-wide font-medium text-slate-500 dark:text-slate-400 mt-1">Số dư</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Navigation -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
      <nav class="space-y-1">
        <template v-for="(link, index) in sidebarLinks" :key="index">
          <component 
            :is="link.path !== '#' ? 'RouterLink' : 'a'" 
            :to="link.path !== '#' ? link.path : undefined"
            :href="link.path === '#' ? '#' : undefined"
            class="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-colors font-medium text-sm"
            :class="isActive(link.path) ? 'bg-primary/10 text-primary dark:bg-primary/20 bg-blue-50 dark:bg-blue-900/10' : 'text-slate-600 dark:text-slate-300 hover:bg-blue-900/10 dark:hover:bg-blue-900/10 hover:text-primary dark:hover:text-primary'"
          >
            <component :is="link.icon" class="w-5 h-5" />
            {{ link.name }}
          </component>
        </template>
        
        <div class="h-px bg-slate-100 dark:bg-slate-800 my-4"></div>
        
        <button class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10">
          <LogOut class="w-5 h-5" />
          Đăng xuất
        </button>
      </nav>
    </div>

    <!-- Avatar Update Modal -->
    <BaseModal
      :show="showAvatarModal"
      title="Cập nhật ảnh đại diện"
      maxWidth="max-w-sm"
      @close="showAvatarModal = false"
    >
      <div class="flex flex-col items-center justify-center pt-2 pb-4">
        <label class="w-32 h-32 rounded-full border-4 border-slate-700/50 mb-6 relative overflow-hidden group cursor-pointer block">
          <img :src="user.avatar" alt="Current Avatar" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <Upload class="w-6 h-6 text-white mb-1" />
             <span class="text-xs text-white font-medium">Tải ảnh lên</span>
          </div>
          <input type="file" class="hidden" accept="image/*">
        </label>
        
        <p class="text-sm text-slate-400 text-center mb-6 max-w-[250px]">
          Hỗ trợ định dạng JPG, PNG hoặc GIF. Kích thước tối đa 5MB.
        </p>
        
        <div class="flex items-center gap-3 w-full">
          <BaseButton variant="outline" class="flex-1" @click="showAvatarModal = false">
            Hủy bỏ
          </BaseButton>
          <BaseButton variant="primary" class="flex-1" @click="showAvatarModal = false">
            Lưu thay đổi
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  </div>
</template>
