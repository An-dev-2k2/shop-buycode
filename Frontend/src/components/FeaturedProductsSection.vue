<script setup>
import ProductCard from './ProductCard.vue'
import SectionHeader from './SectionHeader.vue'
import BaseButton from './BaseButton.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

const featuredProducts = [
  {
    id: 1,
    slug: 'skydash-premium-admin-template',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw_GJBK0Nze4GoBYkecpF1nnIEs0jTfFGZVcaG9o3eOVBSozjZKwEmPtvX3zfeqtU7ViG00l8sI_k2cS_nwdvsXoZ3wA9e7vSO6VVrEfxaSCbCE2wxSgOEvYDIab3uwKHhdNY4qLJtqYjct5F-pmZzaQ4CiZU3DZiy3xxwi7SWW9AOewDQgXAQGM5_YuOu9sRkMFbaVOr7XCmym9i5yjXdscG1sHEI1FM98B5VDT9o6AiTfqSVunEzOuksrFypLPZqtlm0xw8XhG0',
    tag: 'Bestseller',
    title: 'SkyDash Premium Admin Template',
    author: {
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbG1LT6zKKmQgbof_iLj9MFdovX720w1TYn7QfXK553pMXgPlMz-EfNiKgQXQOEXHObgKhJOAT2R2furMZuoZHcdpaikI_HKVwI745Juv698-dUkYQOISqO9YW9rC5lKSiuiMiyxAdM7LaemWtoA2t9KrkLs6rzPtUjrTOGmfr-f3-Vj5c9OCI5v0BD6USd3LGbZvepBfqYr1myVuozcAlyVU0QhmEGfeArQCIluEUHT9deSzpN_Q075i0qu4ytt1pODIvStfIu9s',
      name: 'DevStudio'
    },
    rating: 4.9,
    price: '499.000đ',
    techTags: [
      { name: 'React', class: 'bg-blue-500/10 text-blue-500' },
      { name: 'Tailwind', class: 'bg-cyan-500/10 text-cyan-500' }
    ]
  },
  {
    id: 2,
    slug: 'v-store-marketplace-full-solution',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpn4q0Uc_0sJLj8zJAwSZtz1bwCp9n1mrFfNJUnSNrfaAKNWuxJAF_kItFuCPpRUmZRZffMBaKRFj0FTp-Dda27erFI4JZ6RX1ALabb62isBBiCw6MiEsZFzVavNQMR5zmIBE1nM-_jtMYwOFjw-ikMK051H9h_bNtgsHkGnVug3yZ3SP1dcU4ilshZfPbKpshQ1O8Bxo9AETrX62YzR6tLP5YaTfZb5d4wOGLR651l408v_jWVa71epsvZIj555ABBngdnj9uFiU',
    tag: 'Bestseller',
    title: 'V-Store Marketplace Full Solution',
    author: {
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCew8e-YQ4xlsgt0NKOv-xHyYosE6Hvb4YbMQI8Hee9yaW7WGSgrisdOHPFe5atHS8rBj_N5_kFqWAOLVcENxTRTMDQUmzQiNRqnQKuE9lkXCblE5bN5o2iZbRyEV2PKZ409WkMo5BuUOr9TPC1Ub9HBPfsrVLdRW1KEhdhK3PUBTKr9vwr7fORwryHftuXruF7nqlCcpwqGNidCmhK56yfHUVU3Ol7t3SXSH2JNUlmP9QgXj-RU_CEVb9MTsR9crUeeMLshnJP_nM',
      name: 'SarahDev'
    },
    rating: 5.0,
    price: '899.000đ',
    techTags: [
      { name: 'Vue 3', class: 'bg-emerald-500/10 text-emerald-500' },
      { name: 'NodeJS', class: 'bg-indigo-500/10 text-indigo-500' }
    ]
  },
  {
    id: 3,
    slug: 'instamobile-social-network-ui',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdK4PpVR8AZMusWFBk7MI334QujmEHarl3KPlV41iTVpnTjC0fgJJv5s1oTUddus6WQ_8EWjSt0mUNiDG9ZOdi2UH1cbccEycsCx61seIZbR-SrLWYVPwmVzshAFEMSNIeR17bM1Hb_KSpXhDF0X-6KzRLgouddgSJVVyy5a1bly94DhfxF31lHKmNKlEbdrh2LU-Oj9xYncUi9bjj1nfkgihmhUKy3Zpcs2TyU-v4o82q192_FZSpPWyLdgqEzMOTA7kgzKk5ay4',
    title: 'InstaMobile - Social Network UI',
    author: {
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp0XfaJatANL5DxoitDcbeY-jl1jHUhI0pxaxoqxYEzK0bvvMDhduTuHAlUM3-2p4-5nEnJ04-x7xe4ritEyAlO0BoR7oCVgGdM1E_ca-QpXfZFl9KhB3m-si8nVtVnvyBdQjejRhZXLm5FzRkz0NyTPcLmHxVLFgJNZdms_Cd_TOd60lQXQcGQ1BeOsX-h1SLxIVtDWulovp2HHaOUejF7glhPMGUmoEoNJqphNbue5YbasJuVUcBDA0YFo1_rg4ocdkkskAf3I0',
      name: 'AlexCode'
    },
    rating: 4.8,
    price: '299.000đ',
    techTags: [
      { name: 'Flutter', class: 'bg-blue-400/10 text-blue-400' },
      { name: 'Firebase', class: 'bg-orange-500/10 text-orange-500' }
    ]
  },
  {
    id: 4,
    slug: 'astra-saas-landing-page',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuvztDCOTjedSnsA4s5GbIsTZ-z17igveB1SLUjfFtXBDV_wfRIwlmq5TGcCjar77jm08qXNbwsSvISjF-SqYAHUh1Qkue76aUVQG9-xc0MmwSUTN7lnnyt4BGhGj9dckSjT8xGUf1OmRhTLIRq0FWW0aaFSGjUEzvy3YJJZROftgdMC1bJPD1pvOTN3Sev1rHCD_Hrnhr7u89FU9Zokq3N6qk6cMijnjZgtxB-H7KtGPqInQKJKbJgCZqO1Ptb2WsaIx0OMPCKvM',
    title: 'Astra - SaaS Landing Page',
    author: {
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYhHLv6PBYwiyTQ2B09CXXcyNuWCNlWeWarWlftxIuNdRKWhYOhJjKfWWHsGOvGohK3bniUo479KIgQ_huXtW9gtz-wFL10qhiGa8SLLWpwVIYrIPjeSpiMDNO0_UsjnYGsO0aCcf9GRk53DQx4BsDfaiCnRSifa0aVoff4Dv0zDd2_eDP9EPuNcaOxV-lX6NKsuYC-YL2ZMoEFqO_M1Wv4LZeWWvKkK_6kfADbp1lkeNo3KVeEbkEGbLjk2pN6nCcBjyrQ5V50ug',
      name: 'PixelPerfect'
    },
    rating: 4.7,
    price: '150.000đ',
    techTags: [
      { name: 'Next.js', class: 'bg-slate-400/10 text-slate-400' },
      { name: 'SaaS', class: 'bg-purple-500/10 text-purple-500' }
    ]
  }
]
</script>

<template>
  <section class="py-24 bg-slate-50 dark:bg-[#080B16]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-12">
        <SectionHeader 
          title="Sản phẩm nổi bật" 
          subtitle="Top các sản phẩm bán chạy nhất trong tuần qua"
          reveal="fade-left"
          class="mb-0"
        >
      </SectionHeader>
      <BaseButton
        variant="ghost"
        to="/source-code"
        data-reveal="fade-left"
      >
        Xem tất cả
        <template #icon-right>
          <ArrowRight class="w-4 h-4" />
        </template>
      </BaseButton>
        
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(product, index) in featuredProducts" 
          :key="product.id"
          data-reveal="fade-up"
          :data-reveal-delay="index * 100"
        >
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </section>
</template>
