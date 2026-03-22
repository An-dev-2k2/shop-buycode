<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String, // 'card', 'text', 'avatar', 'button', 'badge'
    default: 'text'
  },
  lines: {
    type: Number,
    default: 1
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: 'auto'
  },
  circle: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
})

const skeletonClass = computed(() => {
  const base = 'animate-pulse bg-slate-200 dark:bg-slate-800'
  
  if (props.type === 'avatar' || props.circle) {
    return `${base} rounded-full`
  }
  
  if (props.type === 'card') {
    return `${base} rounded-2xl`
  }

  if (props.type === 'button') {
    return `${base} rounded-xl h-10 w-32`
  }

  // default 'text'
  return `${base} rounded-md h-4`
})
</script>

<template>
  <div v-if="type === 'card'" :class="[skeletonClass, className]" :style="{ width, height: height === 'auto' ? '200px' : height }">
    <slot></slot>
  </div>
  
  <div v-else-if="type === 'text' && lines > 1" class="space-y-2">
    <div 
      v-for="i in lines" 
      :key="i"
      :class="[skeletonClass, className]"
      :style="{ width: i === lines ? '80%' : width }"
    ></div>
  </div>

  <div 
    v-else
    :class="[skeletonClass, className]" 
    :style="{ width, height: height === 'auto' && type === 'avatar' ? width : height }"
  ></div>
</template>
