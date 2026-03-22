<script setup>
defineProps({
  image: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-col gap-4" data-reveal="fade-right">
    <div class="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-slate-800 shadow-2xl shadow-primary/10">
      <img class="w-full h-full object-cover" data-alt="Product Preview" :src="image" />
      <div class="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-60"></div>
    </div>
  </div>
</template>
