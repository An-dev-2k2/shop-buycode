<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowRight, Star } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'
import GlassCard from './GlassCard.vue'

const techBadges = [
  { name: 'Vue.js',     shadow: 'rgba(65,184,131,0.5)',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',                   pos: 'top-[18%] left-[7%]',       anim: 'animate-float-1' },
  { name: 'React',      shadow: 'rgba(97,218,251,0.5)',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',                   pos: 'top-[12%] right-[9%]',      anim: 'animate-float-2' },
  { name: 'Node.js',   shadow: 'rgba(104,160,99,0.5)',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',                pos: 'top-[50%] left-[4%]',       anim: 'animate-float-3' },
  { name: 'Express',   shadow: 'rgba(200,200,200,0.3)',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',              pos: 'top-[45%] right-[5%]',      anim: 'animate-float-4' },
  { name: 'MongoDB',   shadow: 'rgba(77,179,61,0.5)',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',              pos: 'bottom-[22%] left-[10%]',   anim: 'animate-float-5' },
  { name: 'HTML5',     shadow: 'rgba(227,79,38,0.5)',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',                  pos: 'top-[28%] right-[4%]',      anim: 'animate-float-1' },
  { name: 'CSS3',      shadow: 'rgba(21,114,182,0.5)',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',                    pos: 'bottom-[18%] right-[13%]',  anim: 'animate-float-2' },
  { name: 'JavaScript',shadow: 'rgba(247,223,30,0.5)',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',        pos: 'top-[65%] right-[6%]',      anim: 'animate-float-3' },
  { name: 'Tailwind',  shadow: 'rgba(56,189,248,0.5)',    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',      pos: 'bottom-[12%] left-[30%]',   anim: 'animate-float-4' },
]

// Canvas 3D Tech Globe Logic
const canvasRef = ref(null)
let animationFrameId
let resizeHandler

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  
  let width, height
  
  resizeHandler = () => {
    const parent = canvas.parentElement
    if(!parent) return
    width = parent.clientWidth
    height = parent.clientHeight
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
  }
  
  window.addEventListener('resize', resizeHandler)
  resizeHandler()

  // Generate sphere particles
  const particles = []
  const numParticles = window.innerWidth < 768 ? 80 : 180
  
  for(let i = 0; i < numParticles; i++) {
    const theta = Math.random() * 2 * Math.PI
    const phi = Math.acos((Math.random() * 2) - 1)
    const x = Math.sin(phi) * Math.cos(theta)
    const y = Math.sin(phi) * Math.sin(theta)
    const z = Math.cos(phi)
    particles.push({ originX: x, originY: y, originZ: z })
  }

  let rotationX = 0
  let rotationY = 0

  const draw = () => {
    ctx.clearRect(0, 0, width, height)
    
    rotationY -= 0.0015
    rotationX += 0.0005
    
    const cosY = Math.cos(rotationY)
    const sinY = Math.sin(rotationY)
    const cosX = Math.cos(rotationX)
    const sinX = Math.sin(rotationX)
    
    const projected = []
    const containerRadius = Math.min(width, height) * 0.45
    const fov = 800
    
    particles.forEach(p => {
      let rx = p.originX * containerRadius
      let ry = p.originY * containerRadius
      let rz = p.originZ * containerRadius

      let x1 = rx * cosY - rz * sinY
      let z1 = rz * cosY + rx * sinY
      
      let y2 = ry * cosX - z1 * sinX
      let z2 = z1 * cosX + ry * sinX
      
      const distance = fov + z2
      const scale = distance > 0 ? fov / distance : 0
      
      const x2D = (width * 0.5) + x1 * scale
      const y2D = (height * 0.5) + y2 * scale
      
      projected.push({ x: x2D, y: y2D, z: z2, scale })
    })
    
    projected.sort((a, b) => b.z - a.z)
    
    ctx.lineWidth = 0.6
    for(let i = 0; i < projected.length; i++) {
      const p1 = projected[i]
      if(p1.z < -fov / 2) continue
      
      ctx.beginPath()
      ctx.arc(p1.x, p1.y, 2 * p1.scale, 0, Math.PI * 2)
      const alpha = Math.max(0.1, 1 - (p1.z + containerRadius)/(containerRadius*2))
      ctx.fillStyle = `rgba(14, 165, 233, ${alpha})`
      ctx.fill()
      
      for(let j = i + 1; j < projected.length; j++) {
        const p2 = projected[j]
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distSq = dx*dx + dy*dy
        
        const connectionDist = (width < 768 ? 2000 : 5000) * Math.max(0.5, p1.scale)
        if(distSq < connectionDist) {
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          const lineAlpha = (1 - distSq / connectionDist) * alpha
          ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha * 0.4})` 
          ctx.stroke()
        }
      }
    }
    
    animationFrameId = requestAnimationFrame(draw)
  }
  
  draw()
})

onUnmounted(() => {
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <section class="relative min-h-screen flex items-center overflow-hidden bg-background-light dark:bg-background-dark">
    
    <!-- Tech Globe Canvas Background -->
    <div class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <!-- Subtle Background Glows -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
      <div class="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]"></div>
      
      <!-- Interactive Tech Globe -->
      <canvas ref="canvasRef" class="absolute inset-0 w-full h-full opacity-60"></canvas>

      <!-- Floating Tech Stack Badges -->
      <div 
        v-for="tech in techBadges" 
        :key="tech.name"
        :class="['absolute hidden sm:block', tech.pos, tech.anim]"
      >
        <img 
          :src="tech.logo" 
          :alt="tech.name" 
          class="w-10 h-10 object-contain"
          :style="{ filter: `drop-shadow(0 0 10px ${tech.shadow}) drop-shadow(0 0 22px ${tech.shadow})` }"
        />
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center max-w-4xl mx-auto">
        <h1 
          class="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight hero-animate"
          style="animation-delay: 0.1s"
        >
          Source Code & <span class="gradient-text">Dịch vụ Website</span> chuyên nghiệp
        </h1>
        
        <p 
          class="text-lg md:text-xl text-slate-400 mb-10 font-medium hero-animate"
          style="animation-delay: 0.25s"
        >
          Giải pháp công nghệ tối ưu và thiết kế Website chuyên nghiệp từ Andev.
        </p>
        
        <div 
          class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 hero-animate"
          style="animation-delay: 0.4s"
        >
          <BaseButton 
            to="/source-code"
            size="xl"
          >
            Khám phá ngay 
            <template #icon-right>
              <ArrowRight class="w-5 h-5" />
            </template>
          </BaseButton>
          
          <BaseButton 
            to="/register"
            variant="outline"
            size="xl"
          >
            Tham gia ngay
          </BaseButton>
        </div>

        <!-- Stats -->
        <div 
          class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 hero-animate"
          style="animation-delay: 0.55s"
        >
          <GlassCard padding="p-6" class="text-center">
            <div class="text-3xl font-black gradient-text mb-1">10,000+</div>
            <div class="text-xs uppercase tracking-widest text-slate-500 font-bold">Sản phẩm</div>
          </GlassCard>
          
          <GlassCard padding="p-6" class="text-center">
            <div class="text-3xl font-black gradient-text mb-1">5,000+</div>
            <div class="text-xs uppercase tracking-widest text-slate-500 font-bold">Developer</div>
          </GlassCard>
          
          <GlassCard padding="p-6" class="text-center">
            <div class="text-3xl font-black gradient-text mb-1">50,000+</div>
            <div class="text-xs uppercase tracking-widest text-slate-500 font-bold">Khách hàng</div>
          </GlassCard>
          
          <GlassCard padding="p-6" class="text-center">
            <div class="text-3xl font-black gradient-text mb-1 flex items-center justify-center gap-1">
              4.9
              <Star class="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
            <div class="text-xs uppercase tracking-widest text-slate-500 font-bold">Đánh giá</div>
          </GlassCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}
.animate-float-1 { animation: float 6s ease-in-out infinite; }
.animate-float-2 { animation: float 8s ease-in-out infinite 1s; }
.animate-float-3 { animation: float 7s ease-in-out infinite 2s; }
.animate-float-4 { animation: float 9s ease-in-out infinite 0.5s; }
.animate-float-5 { animation: float 7.5s ease-in-out infinite 3s; }
</style>
