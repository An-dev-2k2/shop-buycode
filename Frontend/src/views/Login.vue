<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, CheckCircle2, ArrowRight, Shield, Zap, Clock, Lock, Mail } from 'lucide-vue-next'
import BaseCheckboxV2 from '../components/BaseCheckboxV2.vue'
import BaseButton from '../components/BaseButton.vue'
import AuthPanel from '../components/AuthPanel.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

const router = useRouter()

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const showPassword = ref(false)
const isLoading = ref(false)
const errors = ref({})

const stats = [
  { value: '10,000+', label: 'Sản phẩm' },
  { value: '5,000+',  label: 'Developers' },
  { value: '50,000+', label: 'Khách hàng' },
]

const validate = () => {
  errors.value = {}
  if (!form.value.email.trim()) errors.value.email = 'Vui lòng nhập email'
  if (!form.value.password) errors.value.password = 'Vui lòng nhập mật khẩu'
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return
  isLoading.value = true
  // Giả lập login
  await new Promise(r => setTimeout(r, 1000))
  isLoading.value = false
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-background-dark flex pt-24 lg:pt-0">
    <AuthPanel 
      badge="Chào mừng trở lại!"
      title="Giải pháp <span class='gradient-text'>Website</span><br />& Source Code chuyên nghiệp<br />dành cho bạn"
      description="Tiếp tục hành trình xây dựng và phát triển dự án công nghệ của bạn cùng BuySource."
      data-reveal="fade-right"
    />

    <!-- ===== RIGHT PANEL – Login Form ===== -->
    <div class="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 sm:pt-10 lg:pt-10">
      <div class="w-full max-w-md">
        <div class="lg:hidden mb-8 text-center">
          <router-link to="/">
            <img src="/logo.png" alt="BuySource" class="h-8 w-auto mx-auto" />
          </router-link>
        </div>

        <div class="mb-8 text-center lg:text-left" data-reveal="fade-up">
          <h2 class="text-3xl font-black text-white mb-2">Đăng nhập ngay</h2>
          <p class="text-slate-400 text-sm">Nâng tầm dự án của bạn cùng BuySource</p>
        </div>

        <BaseButton
          variant="secondary"
          fullWidth
          size="lg"
          class="mb-6"
          data-reveal="fade-up"
          data-reveal-delay="100"
        >
          <template #icon-left>
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </template>
          Đăng nhập bằng Google
        </BaseButton>

        <div class="relative flex items-center mb-6" data-reveal="fade-up" data-reveal-delay="150">
          <div class="flex-grow border-t border-slate-800"></div>
          <span class="flex-shrink mx-4 text-xs text-slate-500 font-bold uppercase tracking-widest">Hoặc bằng tài khoản email</span>
          <div class="flex-grow border-t border-slate-800"></div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div data-reveal="fade-up" data-reveal-delay="200">
            <label class="block text-sm font-semibold text-slate-300 mb-2">Email</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Mail class="w-4 h-4" />
              </span>
              <input
                v-model="form.email"
                type="email"
                placeholder="ten-cua-ban@gmail.com"
                class="w-full pl-11 pr-4 py-3.5 bg-slate-900/80 border rounded-2xl text-white placeholder-slate-600 text-sm focus:outline-none transition-all"
                :class="errors.email ? 'border-red-500/60 focus:border-red-500' : 'border-slate-800 focus:border-primary'"
              />
            </div>
            <p v-if="errors.email" class="mt-1.5 text-xs text-red-400 font-medium">{{ errors.email }}</p>
          </div>

          <div data-reveal="fade-up" data-reveal-delay="250">
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-semibold text-slate-300">Mật khẩu</label>
              <a href="#" class="text-xs font-semibold text-primary hover:underline">Quên mật khẩu?</a>
            </div>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Lock class="w-4 h-4" />
              </span>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full pl-11 pr-11 py-3.5 bg-slate-900/80 border rounded-2xl text-white placeholder-slate-600 text-sm focus:outline-none transition-all"
                :class="errors.password ? 'border-red-500/60 focus:border-red-500' : 'border-slate-800 focus:border-primary'"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Eye v-if="!showPassword" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1.5 text-xs text-red-400 font-medium">{{ errors.password }}</p>
          </div>

          <div class="flex items-center justify-between" data-reveal="fade-up" data-reveal-delay="300">
            <BaseCheckboxV2 
              id="remember" 
              v-model="form.remember"
              label="Ghi nhớ đăng nhập"
            />
          </div>

          <BaseButton
            type="submit"
            :loading="isLoading"
            fullWidth
            size="lg"
            class="mt-4"
            data-reveal="fade-up"
            data-reveal-delay="350"
          >
            Đăng nhập ngay
            <template #icon-right>
              <ArrowRight v-if="!isLoading" class="w-5 h-5" />
            </template>
          </BaseButton>
        </form>

        <div class="mt-10 text-center" data-reveal="fade-up" data-reveal-delay="400">
          <p class="text-sm text-slate-500">
            Chưa có tài khoản?
            <router-link to="/register" class="text-primary font-bold hover:underline ml-1">
              Đăng ký tài khoản mới →
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px #0f172a inset;
  -webkit-text-fill-color: #f1f5f9;
}
</style>
