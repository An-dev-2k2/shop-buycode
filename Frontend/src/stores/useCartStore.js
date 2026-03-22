import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([
    // Mock initial data so the cart isn't empty on load
    {
      id: 1,
      slug: 'ecommerce-react-template',
      title: 'E-commerce React Template',
      price: 1250000,
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBveo9JsIahVFCGVUEpwM-ngbFNyVmP6Q2lMlIcSMZVAL1ylneXas7-1s_Wh21JEmSwqmuqvGCCoBcm6OCAShZDCUDMQ0afjG4Ip1WTU81U5VEIkACLXBRGYnw_tPYf08pRJjPFNOEHMHCqnYriGSVrJ0zfclcoG7aJ8SUZMG8Rnl7sgt_3118gUW1SFCCoQA1WNesmKSywWQHyQ5NhUtBag1hF5A3xEoyRzHthq9CadAAESoZLM-s7edTe0EhvMA_NzHSyuQHCPX4',
      techTags: [{ name: 'React', class: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-transparent' }]
    },
    {
      id: 2,
      slug: 'fintech-dashboard-node',
      title: 'Fintech Dashboard Node',
      price: 2100000,
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVlQ1wHFGcAgrWK0061_m5SezHXzXVXMaX6YkEZCiz6sgDXbIibYuK7TUytqWDzr2QJ93keJwZbWIquuGgpF8YdaCSBiTmM7jzO9RraNFDK3uylE60tk_DkJNpbYdhN2QtWgG5wuVHx3dI6qWS2fTkiHO5Z_iaedYUvHNuNuGXN6lNQhQGzYRBU1v5SZ_xhmp5JJ2y7bt51MlEJruv8t9d-lJYBxyZR-IK6kym8_f9QTQ9YBXWasXPxUbN20-vqmm-NcqPaR_YJpU',
      techTags: [{ name: 'Vue', class: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-transparent' }]
    }
  ])

  const cartCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const subtotal = computed(() => 
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const addToCart = (product) => {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (id) => {
    items.value = items.value.filter(i => i.id !== id)
  }

  const increaseQuantity = (id) => {
    const item = items.value.find(i => i.id === id)
    if (item) item.quantity++
  }

  const decreaseQuantity = (id) => {
    const item = items.value.find(i => i.id === id)
    if (item && item.quantity > 1) item.quantity--
  }

  const clearCart = () => {
    items.value = []
  }

  return { 
    items, 
    cartCount, 
    subtotal, 
    addToCart, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    clearCart 
  }
})
