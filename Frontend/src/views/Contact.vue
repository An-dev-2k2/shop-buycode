<script setup>
import { ref } from 'vue'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Globe, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ChevronRight,
  User,
  Type
} from 'lucide-vue-next'
import GlassCard from '../components/GlassCard.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseInput from '../components/BaseInput.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isLoading = ref(false)
const isSuccess = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  // Giả lập gửi form
  await new Promise(r => setTimeout(r, 1500))
  isLoading.value = false
  isSuccess.value = true
  
  // Reset form sau 3 giây
  setTimeout(() => {
    isSuccess.value = false
    form.value = { name: '', email: '', subject: '', message: '' }
  }, 3000)
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@andev.vn',
    description: 'Chúng tôi sẽ phản hồi trong vòng 24h.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    icon: Phone,
    title: 'Điện thoại',
    value: '+84 123 456 789',
    description: 'Thứ 2 - Thứ 6, 8:00 - 18:00.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10'
  },
  {
    icon: MapPin,
    title: 'Văn phòng',
    value: 'Quận 1, TP. Hồ Chí Minh',
    description: 'Hãy ghé thăm và trò chuyện cùng chúng tôi.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  }
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'Linkedin' },
  { icon: Instagram, href: '#', label: 'Instagram' }
]
</script>

<template>
  <div class="bg-background-dark min-h-screen pt-28 pb-20 relative overflow-hidden">
    <!-- Background Mesh Glows -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Header Area -->
      <div class="mb-12" data-reveal="fade-in">
        <nav class="flex items-center gap-2 text-sm text-slate-500 mb-4 font-medium">
          <router-link to="/" class="hover:text-primary transition-colors">Trang chủ</router-link>
          <ChevronRight class="w-4 h-4" />
          <span class="text-slate-300">Liên hệ</span>
        </nav>
        <h1 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Kết nối với <span class="gradient-text">Andev</span>
        </h1>
        <p class="text-slate-400 max-w-2xl text-lg">
          Bạn có ý tưởng hay hoặc cần tư vấn về giải pháp phần mềm? 
          Hãy để lại lời nhắn, chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn.
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-12">
        
        <!-- Left: Contact Info -->
        <div class="lg:w-1/3 flex flex-col gap-6">
          <template v-for="(info, index) in contactInfo" :key="info.title">
            <GlassCard 
              padding="p-6" 
              class="group hover:border-primary/30 transition-all"
              data-reveal="fade-right"
              :data-reveal-delay="index * 100"
            >
              <div class="flex items-start gap-4">
                <div :class="['p-3 rounded-xl shrink-0 transition-transform group-hover:scale-110', info.bg, info.color]">
                  <component :is="info.icon" class="w-6 h-6" />
                </div>
                <div>
                  <h4 class="text-white font-bold mb-1">{{ info.title }}</h4>
                  <p class="text-slate-100 font-medium mb-1">{{ info.value }}</p>
                  <p class="text-xs text-slate-500 italic">{{ info.description }}</p>
                </div>
              </div>
            </GlassCard>
          </template>

          <!-- Social Links Card -->
          <GlassCard 
            padding="p-6" 
            class="mt-auto"
            data-reveal="fade-right"
            data-reveal-delay="300"
          >
            <h4 class="text-white font-bold mb-4">Mạng xã hội</h4>
            <div class="flex gap-3">
              <a 
                v-for="social in socialLinks" 
                :key="social.label"
                :href="social.href"
                class="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center 
                       text-slate-400 hover:bg-primary hover:text-white transition-all 
                       active:scale-90 border border-transparent hover:border-white/10"
              >
                <component :is="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </GlassCard>
        </div>

        <!-- Right: Contact Form -->
        <div class="lg:w-2/3">
          <GlassCard 
            padding="p-8 md:p-10" 
            class="relative overflow-hidden"
            data-reveal="fade-left"
          >
            <!-- Form Success Overlay -->
            <transition name="fade">
              <div 
                v-if="isSuccess" 
                class="absolute inset-0 bg-slate-900/90 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-6"
              >
                <div class="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                  <CheckCircle2 class="w-10 h-10 text-emerald-500" />
                </div>
                <h3 class="text-2xl font-bold text-white mb-2">Gửi thành công!</h3>
                <p class="text-slate-400">Cảm ơn bạn đã liên hệ. Andev sẽ phản hồi bạn sớm nhất có thể.</p>
              </div>
            </transition>

            <form @submit.prevent="handleSubmit" class="relative z-10">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label class="block text-sm font-bold text-slate-300 mb-2">Họ và tên</label>
                  <BaseInput 
                    v-model="form.name"
                    placeholder="Nguyễn Văn A"
                    :icon="User"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-bold text-slate-300 mb-2">Email</label>
                  <BaseInput 
                    v-model="form.email"
                    type="email"
                    placeholder="example@email.com"
                    :icon="Mail"
                    required
                  />
                </div>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-bold text-slate-300 mb-2">Chủ đề</label>
                <BaseInput 
                  v-model="form.subject"
                  placeholder="Tư vấn dịch vụ Website / Mua Source Code..."
                  :icon="Type"
                  required
                />
              </div>

              <div class="mb-8">
                <label class="block text-sm font-bold text-slate-300 mb-2">Lời nhắn</label>
                <div class="relative">
                  <div class="absolute left-4 top-4 text-slate-500">
                    <MessageSquare class="w-5 h-5" />
                  </div>
                  <textarea 
                    v-model="form.message"
                    rows="5"
                    placeholder="Hãy chia sẻ chi tiết nhu cầu của bạn..."
                    class="w-full pl-12 pr-4 py-4 bg-slate-900/80 border border-slate-800 rounded-2xl 
                           text-white placeholder-slate-600 text-sm focus:outline-none 
                           focus:border-primary transition-all resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              <BaseButton 
                type="submit" 
                size="lg" 
                :loading="isLoading"
                fullWidth
              >
                Gửi thông tin ngay
                <template #icon-left>
                  <Send v-if="!isLoading" class="w-5 h-5" />
                </template>
              </BaseButton>
            </form>
          </GlassCard>
        </div>

      </div>

      <!-- stylzed "Map" or visual element -->
      <div class="mt-20" data-reveal="fade-up">
        <GlassCard padding="p-0" class="h-64 md:h-96 overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 mix-blend-overlay z-10 pointer-events-none group-hover:opacity-0 transition-opacity"></div>
          <img 
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200" 
            class="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
            alt="Map Preview"
          />
          <div class="absolute inset-0 flex items-center justify-center z-20">
            <div class="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center scale-90 sm:scale-100">
              <p class="text-primary font-bold uppercase tracking-widest text-xs mb-2">Trụ sở chính</p>
              <p class="text-white text-xl font-black">Andev</p>
              <p class="text-slate-400 text-sm">TP. Hà Nội, Việt Nam</p>
              <BaseButton variant="ghost-primary" size="sm" class="mt-4">
                Xem trên Google Maps
              </BaseButton>
            </div>
          </div>
        </GlassCard>
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
