import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: 'Andev - Chợ Mua Bán Source Code & Tài Nguyên Số Cao Cấp' }
    },
    {
      path: '/source-code',
      name: 'source-code',
      component: () => import('../views/SourceCode.vue'),
      meta: { title: 'Kho Source Code | Andev' }
    },
    {
      path: '/product/:slug',
      name: 'product-detail',
      component: () => import('../views/ProductDetail.vue'),
      meta: { title: 'Chi Tiết Sản Phẩm | Andev' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: { title: 'Đăng Ký Tài Khoản | Andev' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { title: 'Đăng Nhập | Andev' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue'),
      meta: { title: 'Liên Hệ Hỗ Trợ | Andev' }
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: () => import('../views/Wallet.vue'),
      meta: { title: 'Nạp Tiền & Ví | Andev' }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      meta: { title: 'Hồ sơ cá nhân | Andev' }
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/Orders.vue'),
      meta: { title: 'Đơn hàng đã mua | Andev' }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart.vue'),
      meta: { title: 'Giỏ hàng | Andev' }
    },
    {
      path: '/order/:id',
      name: 'order-detail',
      component: () => import('../views/OrderDetail.vue'),
      meta: { title: 'Chi tiết đơn hàng | Andev' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
      meta: { title: '404 - Không tìm thấy trang | Andev' }
    }
  ],
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0, behavior: "smooth" }; // Luôn cuộn lên đầu
  }
})

// Navigation guard to update document.title
router.afterEach((to) => {
  const defaultTitle = 'Andev - Chợ Mua Bán Source Code & Tài Nguyên Số Cao Cấp';
  document.title = to.meta.title || defaultTitle;
});

export default router
