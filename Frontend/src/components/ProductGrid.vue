<script setup>
import { Search } from 'lucide-vue-next'
import ProductCard from './ProductCard.vue'
import BaseEmptyState from './BaseEmptyState.vue'
import BaseButton from './BaseButton.vue'

defineProps({
  products: {
    type: Array,
    required: true
  }
})

defineEmits(['reset'])
</script>

<template>
  <div v-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    <template v-for="(product, index) in products" :key="product.id">
      <div data-reveal="fade-up" :data-reveal-delay="index * 100">
        <ProductCard :product="product" />
      </div>
    </template>
  </div>
  
  <BaseEmptyState 
    v-else
    :icon="Search"
    title="Không tìm thấy sản phẩm nào"
    description="Thử thay đổi bộ lọc hoặc tìm kiếm bằng từ khóa khác."
    :actionTo="''"
  >
    <template #actions>
      <BaseButton variant="primary" size="lg" class="shadow-lg hover:-translate-y-0.5 transition-all mt-6" @click="$emit('reset')">Xóa bộ lọc</BaseButton>
    </template>
  </BaseEmptyState>
</template>
