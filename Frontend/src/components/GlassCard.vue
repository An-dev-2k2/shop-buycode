<script setup>
defineProps({
  padding: {
    type: String,
    default: 'p-6'
  },
  hover: {
    type: Boolean,
    default: false
  },
  reveal: {
    type: String,
    default: ''
  },
  revealDelay: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div 
    class="glass-card rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl transition-all duration-300"
    :class="[padding, hover ? 'hover:bg-blue-500/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10' : '']"
    :data-reveal="reveal || null"
    :data-reveal-delay="revealDelay || null"
  >
    <slot />
  </div>
</template>

<style scoped>
.glass-card {
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  background: rgba(255, 255, 255, 0.03);
}
</style>
