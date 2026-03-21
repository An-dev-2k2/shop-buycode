<script setup>
import ProductCard from './ProductCard.vue'
import SectionHeader from './SectionHeader.vue'
import BaseButton from './BaseButton.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

const newArrivals = [
  {
    id: 1,
    slug: 'cryptotrade-exchange-dashboard',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaZmSU6M4alVlf6S7lGgS8QTUTEh8M01w3_JsBwVSXRLVETKxGoMzGAJ7T0wInPB60S4mCVT7_vHPs29s3CD82_XVNYYBcHkfweqShLnk5IfStGPwj8HZ8O2RNXN9LUriLgbA__VqhpB3h_lyU6BWcXuwJgfir9ATcHElO_s5P6atGLny-BihYEtTfgClF_DQEgXd_xDpPtdB2PNaafPN_OxGsOhYYsrye0WEOmWaVKmPv0brhxhg0iH9zktFje-ZxAL5h27Q2Bz8',
    tag: 'New',
    title: 'CryptoTrade - Exchange Dashboard',
    author: {
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgNrp05dKANx92-ZWUkt0zzZhhh40jI5uigV2xH06o_28HW93PjlJOXljR65U3xr4O4gpHATACsyLQ28mGz_w1gvGJM6CMk9KpIdb_ruY-iVpti71nVq1Bi7HxPSQGUavgcnhjCmscGPBg0nLMMGe4WHy4O4SIkETjMF654_ciImo5C5zF92X_fOs8x2v8FCflzu5fA35ndLirtlGk0Jc-vZAqcxtewVgxmt96g86qr9BWzK7Li0IdMg3P-5HBDWlgSXoytq1sDDg',
      name: 'BlockStudio'
    },
    price: '750.000đ',
    isNew: true,
    techTags: []
  },
  {
    id: 2,
    slug: 'ai-chat-messenger-node-sdk',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ1OywIq07SLOG8eCg061E9tXjOVTzQee0Ye376dwGe07KUusoxJDEJTGN8EK9JKbEKcf998Squ0gHv_fTunogLMV6R_6bx7bFoHvAi-5WkT0HaeKtgG9DsUx0f5MoPwi9qbZ1Vj9Bw2Fo0tpydEIobY3hWWF8f3pK42AFigmiYOtqPA_jyLCMLweZxMj02sbMZD_ozEcUqbhUfhjJQBff82-TB-yc2QwEQQI00Llli6OCxL7_l78KmISFtJ5cj9pKLts9K27TdEc',
    tag: 'New',
    title: 'AI Chat Messenger - Node SDK',
    author: {
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo7AvYbYznzrzSuGFrhrffIeoI6OBN6oIkdwpnKlKYjpVPgmb4phln757WsO63p-smidmHTpN_sC84j7niBJ6059YPJAgMOEOD_OehjikxddBV7jmeMhJgok_SYdeGaZzwECGLlSMMJ6q6iYPkKsUCxWOgtmoGxR9VUT0kpCyi4S19DSE8inucRZ7OEerz45kHHaZX_ulmODJyFnHr-VdkMNQHMvKCit7rKYyuKH5xUMIqdiJeDO3nq9XbVxyIOkovTF-x8sqgudM',
      name: 'AI_Labs'
    },
    price: '320.000đ',
    isNew: true,
    techTags: []
  },
  {
    id: 3,
    slug: 'neobank-banking-ui-kit',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV1p0L82EaLpZEFoPvu-y_rUwWCXMnMP5e5CEMtsQvdU6r7fcI14G3fKthr_ffq49OBN4PHtLIGkFO2ShLPHsqO6g1FiXnVGqXEom92-dbIRbEZRVUbliGAtIeKzZ-yFm6BF6N7zArIixmCz6Ec9p93E51V9Gl8F_ZnCW-vehPr5G8wPb7Oylsv5wYXTX1S09zc0NJg4Kjk5gktMjAg4g68AWJGPNxGAor1z6RDJrOzvcgZjAtW6YTEGuQQMwWKx21i7yPo0ihFE8',
    tag: 'New',
    title: 'NeoBank - Banking UI Kit',
    author: {
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqviHBrUYj3sYA3Wzx2f2RsSwKduU45C70564yJklZX-aZNoZLsFeIXkGzpMRGEYXY7kzDR7LgBGFh5oIPzanIG60Q36azbtxhQF9Td-qHfZwoIx3rqLaWvM_MtcJgahnxrDyEVbTFS7m6RLyKW_nYCDDRmTOKtopPdwwxikij5utA53JGGbznSz6wIMviWx1VouLA_t1vCdeIijRw1rgFmOizLK1mHQFMCYuvuNGNFkpkyQpP3R1WQZ7Mcg1r3yi3gD4l_1rcvRo',
      name: 'FinDesign'
    },
    price: '450.000đ',
    isNew: true,
    techTags: []
  },
  {
    id: 4,
    slug: 'eduportal-lms-php-script',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBen6qhF39XygFLCB8PzS1LU47RGxt2gcJbZygyc9EervYlxnDV9RhdNXRV32gtd_B4Ix_jVHDQBdBhbQTjzYzeeXFA1aIels-ask_ggg5-SEWud3QaX0_mlPaiiviAatLRAieI5H1-oBFCX6vMpVJbkWo4ZfPaxfobktlcb5cfVjPom3Zp1vBK1CsLRAXGpJcywHvtUnTzffP1m7qi-55-KGkk2Yb3Z39VaRl8xuhD1pYsjcskT386XDMQNiDe6noNFS7oPoAOgA',
    tag: 'New',
    title: 'EduPortal - LMS PHP Script',
    author: {
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCegptxdGriieYWeroUJAQAvzlIzPO14LUwAeqJItdt8_UoGjciL8D54H_kBXr7aLiZ7wnk8gyOdJWNqsi6S_sAxnw4FO_TzCwFHJLVH8jsQtvkpNeV5ff0TGKiXXpxeF_isUmm2GoQ0inHbGXZR3N4fOsEVyjgiZ0meb5azf_HxR-iE4JXf947QtSiEnM7ByHJXxL5r9RcPG_rmuOKQth5tXb4kNpQvDjJCV7Hg6ilOyemOagilqcP2zLD6-Dr7jq3OnoPS_7e_BA',
      name: 'CodeMaster'
    },
    price: '580.000đ',
    isNew: true,
    techTags: []
  }
]
</script>

<template>
  <section class="py-24 bg-background-light dark:bg-background-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-12">
        <SectionHeader 
          title="Hàng mới về" 
          subtitle="Những dự án mới nhất vừa được đăng tải"
          reveal="fade-right"
          class="mb-0"
        />
        
        <BaseButton
          variant="ghost"
          to="/source-code"
          data-reveal="fade-right"
        >
          Xem tất cả
          <template #icon-right>
            <ArrowRight class="w-4 h-4" />
          </template>
        </BaseButton>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(product, index) in newArrivals" 
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
