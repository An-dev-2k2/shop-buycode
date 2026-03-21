<script setup>
import { Zap, Facebook, Twitter, Linkedin } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-slate-900 text-slate-400 py-20 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div class="col-span-1 md:col-span-2 lg:col-span-1">
          <div class="flex justify-center">
            <img src="/logo.png" class="w-[200px] mb-3" alt="logo">
          </div>
          <p class="mb-6 max-w-sm text-slate-400">
            Hệ sinh thái Source Code & Dịch vụ Website chuyên nghiệp được phát triển bởi 
            <span class="text-primary font-bold">Andev</span>. BuySource cam kết mang lại 
            giải pháp công nghệ tối ưu và uy tín hàng đầu cho dự án của bạn.
          </p>
          <div class="flex gap-4">
            <a 
              href="#" 
              class="w-10 h-10 rounded-full bg-slate-800 flex items-center 
                     justify-center hover:bg-primary hover:text-white transition-all"
            >
              <Facebook class="w-5 h-5" />
            </a>
            <a 
              href="#" 
              class="w-10 h-10 rounded-full bg-slate-800 flex items-center 
                     justify-center hover:bg-primary hover:text-white transition-all"
            >
              <Twitter class="w-5 h-5" />
            </a>
            <a 
              href="#" 
              class="w-10 h-10 rounded-full bg-slate-800 flex items-center 
                     justify-center hover:bg-primary hover:text-white transition-all"
            >
              <Linkedin class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h4 class="text-white font-bold mb-6">Khám phá</h4>
          <ul class="space-y-4 text-sm">
            <li><router-link to="/register" class="hover:text-primary transition-colors">Tham gia ngay</router-link></li>
            <li><router-link to="/login" class="hover:text-primary transition-colors">Đăng nhập tài khoản</router-link></li>
            <li><a href="#" class="hover:text-primary transition-colors">Về chúng tôi</a></li>
            <li><router-link to="/source-code" class="hover:text-primary transition-colors">Sản phẩm nổi bật</router-link></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-white font-bold mb-6">Hỗ trợ</h4>
          <ul class="space-y-4 text-sm">
            <li><a href="#" class="hover:text-primary transition-colors">Trung tâm trợ giúp</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Điều khoản dịch vụ</a></li>
            <li><a href="#" class="hover:text-primary transition-colors">Chính sách bảo mật</a></li>
            <li><router-link to="/contact" class="hover:text-primary transition-colors">Liên hệ với chúng tôi</router-link></li>
          </ul>
        </div>

        <!-- Payments -->
        <div>
          <h4 class="text-white font-bold mb-6">Thanh toán an toàn</h4>
          <p class="text-sm mb-6">Chúng tôi hỗ trợ đa dạng các phương thức thanh toán phổ biến.</p>
          <div class="flex flex-wrap gap-4 items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
              alt="PayPal" 
              class="h-6 opacity-50 hover:opacity-100 transition-opacity" 
              loading="lazy"
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" 
              alt="Visa" 
              class="h-4 opacity-50 hover:opacity-100 transition-opacity" 
              loading="lazy"
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
              alt="Mastercard" 
              class="h-8 opacity-50 hover:opacity-100 transition-opacity" 
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      <div 
        class="pt-8 border-t border-slate-800 text-center text-xs 
               tracking-wide flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p>&copy; 2026 BuySource - Một sản phẩm của Andev. All rights reserved.</p>
        <p>Phát triển bởi <span class="text-primary font-bold mx-1">Andev</span></p>
      </div>
    </div>
  </footer>
</template>
