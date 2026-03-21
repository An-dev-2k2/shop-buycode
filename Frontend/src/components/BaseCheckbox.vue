<script setup>
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: [Boolean, Array],
    default: false
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number, Boolean],
    default: null
  },
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const isChecked = computed({
  get: () => {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue.includes(props.value)
    }
    return props.modelValue
  },
  set: (val) => {
    if (Array.isArray(props.modelValue)) {
      const newValue = [...props.modelValue]
      if (val) {
        newValue.push(props.value)
      } else {
        const index = newValue.indexOf(props.value)
        if (index > -1) {
          newValue.splice(index, 1)
        }
      }
      emit('update:modelValue', newValue)
    } else {
      emit('update:modelValue', val)
    }
  }
})
</script>

<template>
  <label 
    :for="id"
    class="relative flex items-center gap-3 p-3 rounded-xl cursor-pointer 
           transition-all hover:bg-slate-800/40 border border-transparent 
           hover:border-slate-800/80 active:scale-[0.98] group"
  >
    <input 
      :id="id"
      v-model="isChecked"
      type="checkbox"
      class="peer sr-only"
    />
    <!-- Background Highlight -->
    <div 
      class="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 
             peer-checked:opacity-100 transition-opacity border border-transparent
             peer-checked:border-blue-500/30"
    ></div>
    <!-- Checkbox Square -->
    <div 
      class="relative w-5 h-5 flex flex-shrink-0 items-center justify-center 
             rounded border border-slate-600 bg-slate-800/80 
             peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors 
             z-10 shadow-inner shadow-black/20"
    >
      <Check 
        class="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 
               transition-all scale-50 peer-checked:scale-100" 
      />
    </div>
    <!-- Label -->
    <span 
      class="text-sm font-semibold text-slate-400 peer-checked:text-white 
             group-hover:text-slate-200 transition-colors z-10"
    >
      {{ label }}
    </span>
  </label>
</template>
