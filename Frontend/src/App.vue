<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col selection:bg-primary/30">
    <Header />
    <main class="flex-1 w-full relative">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
</style>
