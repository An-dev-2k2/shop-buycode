<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  maxWidth: {
    type: String,
    default: 'max-w-md'
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

// Handle ESC key
const handleEsc = (e) => {
  if (e.key === 'Escape' && props.show) {
    close()
  }
}

// Lock scroll when modal is open
watch(() => props.show, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}, { immediate: true })

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          @click="close"
        ></div>

        <!-- Modal Content -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div 
            v-if="show"
            class="relative w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] z-10 overflow-hidden"
            :class="maxWidth"
          >
            <!-- Header -->
            <div v-if="title || $slots.header" class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 shrink-0">
              <slot name="header">
                <h3 class="text-lg font-bold text-white uppercase tracking-tight">{{ title }}</h3>
              </slot>
              <button 
                @click="close"
                class="p-2 hover:bg-slate-800 rounded-xl text-slate-500 hover:text-white transition-all ml-4"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <!-- Absolute Close Button (if no header) -->
            <button 
              v-else
              @click="close"
              class="absolute top-4 right-4 p-2 bg-slate-800/50 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all z-20 backdrop-blur-sm"
            >
              <X class="w-5 h-5" />
            </button>

            <!-- Body -->
            <div class="p-6 overflow-y-auto custom-scrollbar flex-grow">
              <slot></slot>
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="px-6 py-4 bg-slate-950/50 border-t border-slate-800 shrink-0">
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Custom scrollbar for modal body */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #334155;
}
</style>
