import { useHead } from '#app'

export const useCraftureFavicon = () => {
  useHead({
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/Crafture_favicon_black.png' },
    ]
  })
}
