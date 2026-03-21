<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  icon: {
    type: Object,
    default: null
  },
  className: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<template>
  <div class="relative group" :class="className">
    <div 
      v-if="icon" 
      class="absolute inset-y-0 left-3 flex items-center pointer-events-none"
    >
      <component 
        :is="icon" 
        class="w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" 
      />
    </div>
    <input 
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      class="w-full bg-[#0D1117]/50 border border-slate-700/50 rounded-xl py-2.5 pr-3 text-sm 
             focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-200 outline-none 
             transition-all placeholder:text-slate-500 shadow-inner"
      :class="[icon ? 'pl-10' : 'pl-4']"
    />
  </div>
</template>
