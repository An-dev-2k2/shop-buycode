<script setup>
import { CheckCircle2 } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <label :for="id" class="flex items-start gap-3 cursor-pointer group">
    <div class="relative mt-0.5 flex-shrink-0">
      <input 
        :id="id"
        type="checkbox" 
        class="sr-only" 
        :checked="modelValue"
        @change="toggle"
      />
      <div
        class="w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center p-0.5"
        :class="modelValue 
          ? 'bg-primary border-primary' 
          : 'bg-transparent border-slate-700 group-hover:border-slate-500'"
      >
        <CheckCircle2 v-if="modelValue" class="w-full h-full text-white" />
      </div>
    </div>
    <span class="text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-5">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
