<script setup>
defineOptions({
  inheritAttrs: false
})
defineProps({
  variant: {
    type: String,
    default: 'default' // 'default', 'primary', 'success', 'warning', 'danger'
  },
  size: {
    type: String,
    default: 'sm' // 'xs', 'sm', 'md'
  }
})

const variantClasses = {
  default: 'border border-gray-700/70',
  slate: 'bg-slate-800 text-slate-300 border border-slate-700/70',
  primary: 'bg-primary/10 text-primary border border-primary/20',
  success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
  danger: 'bg-red-500/10 text-red-500 border border-red-500/20',
}

const sizeClasses = {
  xs: 'px-2.5 py-1 text-[10px]',
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-1.5 text-sm',
}
</script>

<template>
  <span 
    :class="[
      'inline-flex items-center justify-center font-bold rounded-full uppercase tracking-wider',
      variantClasses[variant],
      sizeClasses[size],
      $attrs.class
    ]"
  >
    <slot />
  </span>
</template>
