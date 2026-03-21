<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, CheckCircle2, ArrowRight, Star, Shield, Zap, Clock } from 'lucide-vue-next'
import BaseCheckboxV2 from '../components/BaseCheckboxV2.vue'
import BaseButton from '../components/BaseButton.vue'
import AuthPanel from '../components/AuthPanel.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

const router = useRouter()

const form = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false,
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errors = ref({})

const stats = [
  { value: '10,000+', label: 'Sản phẩm' },
  { value: '5,000+',  label: 'Developers' },
  { value: '50,000+', label: 'Khách hàng' },
]

const trustBadges = [
  { icon: CheckCircle2, text: 'Truy cập ngay sau khi mua' },
  { icon: Shield,       text: 'Bảo mật SSL 256-bit' },
  { icon: Zap,          text: 'Hoàn tiền trong 7 ngày' },
  { icon: Clock,        text: 'Hỗ trợ kỹ thuật 24/7' },
]

const validate = () => {
  errors.value = {}
  if (!form.value.fullName.trim()) errors.value.fullName = 'Vui lòng nhập họ và tên'
  if (!form.value.email.trim()) errors.value.email = 'Vui lòng nhập email'
  else if (!/\S+@\S+\.\S+/.test(form.value.email)) errors.value.email = 'Email không hợp lệ'
  if (!form.value.password) errors.value.password = 'Vui lòng nhập mật khẩu'
  else if (form.value.password.length < 8) errors.value.password = 'Mật khẩu phải ít nhất 8 ký tự'
  if (form.value.confirmPassword !== form.value.password) errors.value.confirmPassword = 'Mật khẩu không khớp'
  if (!form.value.agree) errors.value.agree = 'Vui lòng đồng ý với điều khoản'
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1500))
  isLoading.value = false
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-background-dark flex pt-24 lg:pt-0">

    <AuthPanel 
      badge="Marketplace Giao diện & Dịch vụ WEB #1"
      title="Nâng tầm dự án với<br /><span class='gradient-text'>Source Code</span> & Dịch vụ<br />chuyên nghiệp"
      description="Giải pháp phần mềm tối ưu và đội ngũ chuyên gia hỗ trợ dự án của bạn từ A-Z."
      data-reveal="fade-right"
    >
      <!-- Custom content (Testimonial simplified) -->
      <div class="mt-10 glass-card p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl">
        <div class="flex items-center gap-1 mb-3">
          <Star v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-yellow-400" />
        </div>
        <p class="text-slate-300 text-sm italic">
          "Mua source code ở đây tiết kiệm được hàng tuần coding. Chất lượng xuất sắc!"
        </p>
      </div>
    </AuthPanel>

    <!-- ===== RIGHT PANEL – Register Form ===== -->
    <div class="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 sm:pt-10 lg:pt-28">
      <div class="w-full max-w-md">

        <!-- Mobile logo -->
        <div class="lg:hidden mb-8">
          <router-link to="/">
            <img src="/logo.png" alt="BuySource" class="h-8 w-auto" />
          </router-link>
        </div>

        <!-- Heading -->
        <div class="mb-8" data-reveal="fade-up">
          <h2 class="text-3xl font-black text-white mb-2">Tạo tài khoản miễn phí</h2>
          <p class="text-slate-400 text-sm">Nâng tầm dự án của bạn ngay hôm nay</p>
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
          Tiếp tục với Google
        </BaseButton>

        <div class="relative flex items-center mb-6" data-reveal="fade-up" data-reveal-delay="150">
          <div class="flex-grow border-t border-slate-800"></div>
          <span class="flex-shrink mx-4 text-xs text-slate-500 font-bold uppercase tracking-widest">Hoặc đăng ký bằng email</span>
          <div class="flex-grow border-t border-slate-800"></div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">

          <!-- Full Name -->
          <div data-reveal="fade-up" data-reveal-delay="200">
            <label class="block text-sm font-semibold text-slate-300 mb-1.5">Họ và tên</label>
            <input
              v-model="form.fullName"
              type="text"
              placeholder="Nguyễn Văn A"
              class="w-full px-4 py-3 bg-slate-900/80 border rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none transition-all"
              :class="errors.fullName ? 'border-red-500/60 focus:border-red-500' : 'border-slate-700 focus:border-primary'"
            />
            <p v-if="errors.fullName" class="mt-1 text-xs text-red-400">{{ errors.fullName }}</p>
          </div>

          <!-- Email -->
          <div data-reveal="fade-up" data-reveal-delay="250">
            <label class="block text-sm font-semibold text-slate-300 mb-1.5">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="example@email.com"
              class="w-full px-4 py-3 bg-slate-900/80 border rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none transition-all"
              :class="errors.email ? 'border-red-500/60 focus:border-red-500' : 'border-slate-700 focus:border-primary'"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-400">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div data-reveal="fade-up" data-reveal-delay="300">
            <label class="block text-sm font-semibold text-slate-300 mb-1.5">Mật khẩu</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Tối thiểu 8 ký tự"
                class="w-full px-4 py-3 pr-11 bg-slate-900/80 border rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none transition-all"
                :class="errors.password ? 'border-red-500/60 focus:border-red-500' : 'border-slate-700 focus:border-primary'"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Eye v-if="!showPassword" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-xs text-red-400">{{ errors.password }}</p>
          </div>

          <!-- Confirm Password -->
          <div data-reveal="fade-up" data-reveal-delay="350">
            <label class="block text-sm font-semibold text-slate-300 mb-1.5">Xác nhận mật khẩu</label>
            <div class="relative">
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Nhập lại mật khẩu"
                class="w-full px-4 py-3 pr-11 bg-slate-900/80 border rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none transition-all"
                :class="errors.confirmPassword ? 'border-red-500/60 focus:border-red-500' : 'border-slate-700 focus:border-primary'"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Eye v-if="!showConfirmPassword" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="mt-1 text-xs text-red-400">{{ errors.confirmPassword }}</p>
          </div>

          <!-- Agree terms -->
          <div data-reveal="fade-up" data-reveal-delay="400">
            <BaseCheckboxV2 
              id="agree" 
              v-model="form.agree"
            >
              Tôi đồng ý với
              <a href="#" class="text-primary hover:underline">Điều khoản dịch vụ</a>
              và
              <a href="#" class="text-primary hover:underline">Chính sách bảo mật</a>
            </BaseCheckboxV2>
            <p v-if="errors.agree" class="mt-1 text-xs text-red-400 pl-8">{{ errors.agree }}</p>
          </div>

          <BaseButton
            type="submit"
            :loading="isLoading"
            fullWidth
            size="lg"
            class="mt-2"
            data-reveal="fade-up"
            data-reveal-delay="450"
          >
            Tạo tài khoản miễn phí
            <template #icon-right>
              <ArrowRight v-if="!isLoading" class="w-4 h-4" />
            </template>
          </BaseButton>
        </form>

        <!-- Login link -->
        <p class="text-center text-sm text-slate-500 mt-6" data-reveal="fade-up" data-reveal-delay="500">
          Đã có tài khoản?
          <router-link to="/login" class="text-primary font-semibold hover:underline ml-1">
            Đăng nhập →
          </router-link>
        </p>
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
