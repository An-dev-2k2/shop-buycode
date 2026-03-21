<script setup>
import { defineAsyncComponent } from 'vue'
import CategoryCard from '../components/CategoryCard.vue'
import HeroSection from '../components/HeroSection.vue'
import SectionHeader from '../components/SectionHeader.vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { 
  Code2, 
  Layout, 
  Blocks, 
  Grid, 
  Wrench, 
  Palette
} from 'lucide-vue-next'

// Lazy load sections
const FeaturedProductsSection = defineAsyncComponent(() =>
  import('../components/FeaturedProductsSection.vue')
)
const NewArrivalsSection = defineAsyncComponent(() =>
  import('../components/NewArrivalsSection.vue')
)

const categories = [
  { 
    name: 'Source Code', 
    itemCount: '2,500+', 
    icon: Code2, 
    bgClass: 'bg-primary/10', 
    textClass: 'text-primary' 
  },
  { 
    name: 'Templates', 
    itemCount: '1,800+', 
    icon: Layout, 
    bgClass: 'bg-purple-500/10', 
    textClass: 'text-purple-500' 
  },
  { 
    name: 'Plugins', 
    itemCount: '1,200+', 
    icon: Blocks, 
    bgClass: 'bg-blue-500/10', 
    textClass: 'text-blue-500' 
  },
  { 
    name: 'UI Kits', 
    itemCount: '900+', 
    icon: Grid, 
    bgClass: 'bg-pink-500/10', 
    textClass: 'text-pink-500' 
  },
  { 
    name: 'Services', 
    itemCount: '400+', 
    icon: Wrench, 
    bgClass: 'bg-cyan-500/10', 
    textClass: 'text-cyan-500' 
  },
  { 
    name: 'Themes', 
    itemCount: '1,100+', 
    icon: Palette, 
    bgClass: 'bg-orange-500/10', 
    textClass: 'text-orange-500' 
  }
]

useScrollReveal()
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Category Section -->
    <section class="py-24 bg-background-light dark:bg-background-dark">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Khám phá theo danh mục" 
          reveal="fade-up"
        />
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <template v-for="(cat, index) in categories" :key="cat.name">
            <div
              data-reveal="zoom-in"
              :data-reveal-delay="index * 80"
            >
              <router-link 
                v-if="cat.name === 'Source Code'" 
                to="/source-code" 
                class="block"
              >
                <CategoryCard :category="cat" />
              </router-link>
              <CategoryCard v-else :category="cat" />
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <FeaturedProductsSection />

    <!-- New Arrivals Section -->
    <NewArrivalsSection />
  </div>
</template>

