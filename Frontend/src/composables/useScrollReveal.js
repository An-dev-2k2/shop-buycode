import { onMounted, onUnmounted } from 'vue'

/**
 * useScrollReveal - Dùng IntersectionObserver để thêm class 'is-visible'
 * vào các element có attribute `data-reveal` khi chúng vào viewport.
 * Hỗ trợ `data-reveal-delay` (ms) để stagger.
 */
export function useScrollReveal() {
  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            const delay = el.dataset.revealDelay || 0
            setTimeout(() => {
              el.classList.add('is-visible')
            }, Number(delay))
            observer.unobserve(el)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'  // chỉ trigger khi phần tử đã vào đủ sâu vào viewport
      }
    )

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      observer.observe(el)
    })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}
