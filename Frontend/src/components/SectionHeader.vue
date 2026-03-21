<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  align: {
    type: String,
    default: 'left' // 'left', 'center'
  },
  reveal: {
    type: String,
    default: 'fade-up'
  }
})
</script>

<template>
  <div 
    :class="[
      '',
      align === 'center' ? 'text-center' : 'text-left'
    ]"
    :data-reveal="reveal"
  >
    <div 
      v-if="align === 'left'"
      class="flex items-center gap-3 mb-2"
    >
      <span class="w-8 h-1 bg-primary rounded-full"></span>
      <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white">{{ title }}</h2>
    </div>
    <div v-else>
      <h2 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
        {{ title }}
      </h2>
      <div v-if="subtitle" class="max-w-2xl mx-auto">
        <p class="text-slate-500 dark:text-slate-400 text-lg">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </div>
</template>