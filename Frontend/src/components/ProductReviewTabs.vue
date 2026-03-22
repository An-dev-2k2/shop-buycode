<script setup>
import { ref } from 'vue'
import { Star } from 'lucide-vue-next'
import GlassCard from './GlassCard.vue'
import BaseButton from './BaseButton.vue'

const userRating = ref(0)
const hoverRating = ref(0)
const reviewText = ref('')

const setRating = (rating) => {
  userRating.value = rating
}

const submitReview = () => {
  if (userRating.value === 0) {
    alert('Vui lòng chọn số sao đánh giá.')
    return
  }
  // Xử lý gửi đánh giá
  console.log('Submitted review:', { rating: userRating.value, text: reviewText.value })
  alert('Cảm ơn bạn đã đánh giá!')
  userRating.value = 0
  reviewText.value = ''
}
</script>

<template>
  <div class="mt-8 border-t border-white/10 pt-8" data-reveal="fade-up">
    <h3 class="text-xl font-bold text-white mb-6">Đánh giá khách hàng</h3>
    <div class="flex flex-col md:flex-row gap-8">
      <GlassCard class="md:w-1/3 flex flex-col items-center justify-center" data-reveal="fade-right" data-reveal-delay="100">
        <span class="text-5xl font-bold text-white">4.9</span>
        <div class="flex text-yellow-500 my-2">
          <Star class="w-4 h-4 fill-current" />
          <Star class="w-4 h-4 fill-current" />
          <Star class="w-4 h-4 fill-current" />
          <Star class="w-4 h-4 fill-current" />
          <Star class="w-4 h-4 fill-current" />
        </div>
        <span class="text-sm text-slate-400">324 đánh giá</span>
      </GlassCard>
      <div class="flex-1 flex flex-col gap-4">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-1">
            <div class="flex items-center justify-between text-sm">
              <span class="text-white">Tuyệt vời</span>
              <span class="text-slate-400">92%</span>
            </div>
            <div class="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div class="h-full bg-primary w-[92%]"></div>
            </div>
          </div>
          <!-- Review Item -->
          <div class="flex gap-4 pt-4 border-t border-white/5">
            <div class="size-10 rounded-full bg-slate-700 overflow-hidden shrink-0">
              <img class="w-full h-full object-cover" alt="Reviewer avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgqPZZ4XST3N0VyeKOWVU_j4Ry3H9-iTOCqcs5l8D0ZeRzdmRaXdnsitFU2fXDr8QqzCMZfG-SlJgW9N8nrkDsN12dFhooUhhj-YNg9OmzUxU4HbIiMv7gNuDU7NMhb09xA3wpNgs21avUKH0zXBhAAruPfFqYpeR6yzI8s4hSPXDhkwNF1rn1jdh6ZLwJTs5yfm3IuEPGhPGGvDtp1vdhWAM-wlauYGrzf8hg3ufetROZdChLDQ1mjdkM0lIaj1OdSNTSqCfNJFs" />
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-bold text-white">Alex Nguyen</span>
                <div class="flex text-yellow-500 text-[10px]">
                  <Star class="w-3 h-3 fill-current" />
                  <Star class="w-3 h-3 fill-current" />
                  <Star class="w-3 h-3 fill-current" />
                  <Star class="w-3 h-3 fill-current" />
                  <Star class="w-3 h-3 fill-current" />
                </div>
              </div>
              <p class="text-sm text-slate-400">Code rất sạch và dễ tùy chỉnh. Tôi đã triển khai cho khách hàng của mình chỉ trong 2 ngày.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Submit Review -->
    <GlassCard class="mt-8" data-reveal="fade-up">
      <h4 class="text-lg font-bold text-white mb-4">Đánh giá sản phẩm này</h4>
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1" @mouseleave="hoverRating = 0">
            <div v-for="star in 5" :key="star"
              class="relative w-8 h-8 cursor-pointer transition-transform hover:scale-110">
              <Star class="absolute inset-0 w-full h-full text-slate-600" />
              <Star v-if="(hoverRating ? hoverRating : userRating) >= star - 0.5"
                class="absolute inset-0 w-full h-full text-yellow-500 fill-current transition-all"
                :style="{ clipPath: (hoverRating ? hoverRating : userRating) === star - 0.5 ? 'inset(0 50% 0 0)' : 'none' }" />
              <div class="absolute inset-0 flex z-10">
                <div class="w-1/2 h-full" @mouseenter="hoverRating = star - 0.5"
                  @click="setRating(star - 0.5)"></div>
                <div class="w-1/2 h-full" @mouseenter="hoverRating = star" @click="setRating(star)"></div>
              </div>
            </div>
          </div>
          <span class="ml-2 text-sm font-bold text-yellow-500" v-if="userRating > 0">{{ userRating }} sao</span>
          <span class="ml-2 text-sm text-slate-400 font-medium" v-else>Chọn số sao</span>
        </div>
        <textarea v-model="reviewText" rows="4" placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
          class="w-full bg-slate-800/50 border border-white/10 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"></textarea>
        <BaseButton @click="submitReview" class="self-end" size="md">
          Gửi đánh giá
        </BaseButton>
      </div>
    </GlassCard>
  </div>
</template>
