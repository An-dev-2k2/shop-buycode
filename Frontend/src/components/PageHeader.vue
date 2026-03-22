<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="mb-5 relative z-10">
    <h1 class="text-xl font-extrabold uppercase text-slate-900 dark:text-white tracking-tight">{{ title }}</h1>
    <p v-if="subtitle" class="text-slate-500 dark:text-slate-400 text-xs md:text-sm">{{ subtitle }}</p>
  </div>
</template>
