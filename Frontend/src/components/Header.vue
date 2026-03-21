<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  ChevronDown, 
  User, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Wallet 
} from 'lucide-vue-next'

const isScrolled = ref(false)
// ... (rest of refs)
const isMobileMenuOpen = ref(false)
const isLoggedIn = ref(false)
const isUserMenuOpen = ref(false)

const navLinks = [
  { name: 'Trang chủ', path: '/' },
  { name: 'Source Code', path: '/source-code' },
  { name: 'Liên hệ', path: '/contact' },
  { name: 'Nạp tiền', path: '/wallet' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const closeMenuOutside = (e) => {
  if (isUserMenuOpen.value && !e.target.closest('.user-menu-container')) {
    isUserMenuOpen.value = false
  }
}

const login = () => {
  isLoggedIn.value = true
}

const logout = () => {
  isLoggedIn.value = false
  isUserMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', closeMenuOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', closeMenuOutside)
})
</script>

<template>
  <!-- Wrapper để floating -->
  <header 
    class="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4 
           sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none"
    :class="isScrolled ? 'pt-2' : 'pt-4'"
  >
    <!-- Container -->
    <div 
      class="pointer-events-auto w-full max-w-7xl rounded-2xl transition-all 
             duration-300 relative border border-solid"
      :class="[
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg shadow-slate-200/50 dark:shadow-black/20 border-slate-200/50 dark:border-white/10' 
          : 'bg-transparent border-transparent'
      ]"
    >
      <div class="flex items-center justify-between h-16 px-4 md:px-6">
        
        <!-- Left: Logo -->
        <RouterLink 
          to="/" 
          class="flex items-center gap-2 group cursor-pointer shrink-0"
        >
          <!-- <Zap 
            class="w-8 h-8 text-primary fill-primary transition-transform 
                   group-hover:scale-110" 
          />
          <span class="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
            BuySource
          </span> -->
          <img src="/logo.png" class="w-28" alt="logo">
        </RouterLink>

        <!-- Center: Navigation (Desktop) -->
        <nav class="hidden md:flex items-center space-x-1 lg:space-x-4">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.name" 
            :to="link.path"
            class="px-3 py-2 text-sm font-medium rounded-lg text-slate-600 
                   dark:text-slate-300 hover:text-primary dark:hover:text-primary 
                   hover:bg-blue-500/10 dark:hover:bg-blue-500/10 transition-colors"
            active-class="!text-primary dark:text-primary !bg-blue-500/10 dark:bg-blue-500/10"
          >
            {{ link.name }}
          </RouterLink>
        </nav>

        <!-- Right: Actions -->
        <div class="flex items-center gap-2 md:gap-4 shrink-0">
          
          <!-- Auth / User -->
          <template v-if="!isLoggedIn">
            <div class="hidden sm:flex items-center gap-2">
              <RouterLink 
                to="/login"
                class="px-4 py-2 text-sm font-bold text-slate-700 
                       dark:text-slate-200 hover:text-primary 
                       dark:hover:text-primary transition-colors"
              >
                Đăng nhập
              </RouterLink>
              
              <RouterLink 
                to="/register"
                class="px-5 py-2.5 text-sm font-bold text-white gradient-button 
                       rounded-xl shadow-md cursor-pointer transition-all 
                       hover:-translate-y-0.5"
              >
                Đăng ký
              </RouterLink>
            </div>
          </template>
          
          <template v-else>
            <!-- User Dropdown Menu -->
            <div class="relative flex items-center user-menu-container pl-2">
              <button 
                @click.stop="isUserMenuOpen = !isUserMenuOpen"
                class="flex items-center gap-2 p-1 pl-2.5 pr-1.5 rounded-full 
                       border border-slate-200 dark:border-slate-700 
                       hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                title="Account menu"
              >
                <span class="hidden md:block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Hi, Andev
                </span>
                
                <img 
                  src="https://ui-avatars.com/api/?name=Andev&background=0D8ABC&color=fff" 
                  alt="Avatar" 
                  class="w-8 h-8 rounded-full ml-1 border border-slate-200 dark:border-slate-700" 
                />
                
                <ChevronDown 
                  class="w-4 h-4 text-slate-500 transition-transform duration-200"
                  :class="isUserMenuOpen ? 'rotate-180' : ''"
                />
              </button>

              <!-- Dropdown Panel -->
              <div 
                v-if="isUserMenuOpen"
                class="absolute top-12 right-0 mt-2 w-56 bg-white dark:bg-slate-900 
                       rounded-2xl shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 
                       overflow-hidden py-2 transition-all origin-top-right z-50 
                       transform opacity-100 scale-100"
              >
                <div class="px-4 py-2">
                  <p class="text-sm font-medium text-slate-900 dark:text-white">Andev Team</p>
                  <p class="text-xs text-slate-500 truncate">hello@buy-source.com</p>
                </div>
                
                <div class="h-px bg-slate-200 dark:bg-slate-800 my-1"></div>
                
                <a 
                  href="#" 
                  class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 
                         hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary 
                         group flex items-center gap-2"
                >
                  <User class="w-4 h-4 text-slate-400 group-hover:text-primary" />
                  Hồ sơ của tôi
                </a>
                
                <RouterLink 
                  to="/wallet" 
                  class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 
                         hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary 
                         group flex items-center gap-2"
                  @click="isUserMenuOpen = false"
                >
                  <Wallet class="w-4 h-4 text-slate-400 group-hover:text-primary" />
                  Ví của tôi
                </RouterLink>
                
                <a 
                  href="#" 
                  class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 
                         hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary 
                         group flex items-center gap-2"
                >
                  <ShoppingBag class="w-4 h-4 text-slate-400 group-hover:text-primary" />
                  Đơn hàng
                </a>
                
                <a 
                  href="#" 
                  class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 
                         hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary 
                         group flex items-center gap-2"
                >
                  <Settings class="w-4 h-4 text-slate-400 group-hover:text-primary" />
                  Cài đặt
                </a>
                
                <div class="h-px bg-slate-200 dark:bg-slate-800 my-1"></div>
                
                <button 
                  @click="logout" 
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 
                         dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 
                         group flex items-center gap-2 transition-colors"
                >
                  <LogOut class="w-4 h-4" /> 
                  Đăng xuất
                </button>
              </div>
            </div>
          </template>

          <!-- Mobile Menu Button -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 text-slate-600 dark:text-slate-300 
                   hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg 
                   transition-colors ml-1"
          >
            <X v-if="isMobileMenuOpen" class="w-6 h-6" />
            <Menu v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div 
        v-show="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 
               dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 
               dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-20"
      >
        <nav class="flex flex-col py-2">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.name" 
            :to="link.path"
            @click="isMobileMenuOpen = false"
            class="px-5 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 
                   hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary 
                   transition-colors border-b border-slate-100 
                   dark:border-slate-800/50 last:border-0"
            active-class="text-primary dark:text-primary bg-primary/5 dark:bg-primary/10"
          >
            {{ link.name }}
          </RouterLink>
          
          <div 
            v-if="!isLoggedIn" 
            class="p-5 grid grid-cols-2 gap-3 border-t border-slate-100 
                   dark:border-slate-800/50 mt-2"
          >
            <RouterLink 
              to="/login"
              @click="isMobileMenuOpen = false" 
              class="py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 
                     border border-slate-300 dark:border-slate-600 rounded-xl 
                     text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Đăng nhập
            </RouterLink>
            
            <RouterLink 
              to="/register"
              @click="isMobileMenuOpen = false"
              class="py-2.5 text-sm font-bold text-white gradient-button rounded-xl shadow-md text-center"
            >
              Đăng ký
            </RouterLink>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
<!-- gradient-text-header is defined in style.css -->
