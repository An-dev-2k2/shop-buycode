import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const user = ref(null)

  const login = (userData) => {
    isLoggedIn.value = true
    user.value = userData || {
      name: 'Andev',
      email: 'hello@andev.com',
      avatar: 'https://ui-avatars.com/api/?name=Andev&background=0D8ABC&color=fff'
    }
  }

  const logout = () => {
    isLoggedIn.value = false
    user.value = null
  }

  return { isLoggedIn, user, login, logout }
})
