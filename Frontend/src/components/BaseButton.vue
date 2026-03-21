<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // 'primary', 'secondary', 'outline', 'ghost'
  },
  size: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg', 'xl'
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
  to: {
    type: String,
    default: '',
  },
  fullWidth: {
    type: Boolean,
    default: false,
  }
})

const variantClasses = {
  primary: 'gradient-button text-white shadow-lg shadow-primary/20',
  secondary: 'bg-white text-slate-900 hover:bg-slate-100 shadow-lg',
  outline: 'border border-slate-700 text-slate-200 hover:bg-slate-800',
  ghost: 'text-slate-400 hover:text-primary hover:bg-primary/5',
  'ghost-primary': 'bg-blue-500/10 text-primary border border-blue-500/20 hover:bg-blue-500/20',
}

const sizeClasses = {
  sm: 'px-4 py-2.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
}

const computedClasses = computed(() => [
  'inline-flex items-center justify-center gap-2 font-bold transition-all rounded-xl active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed',
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.fullWidth ? 'w-full' : '',
])
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to || null"
    :type="to ? null : type"
    :disabled="disabled || loading"
    :class="computedClasses"
  >
    <svg v-if="loading" class="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>
