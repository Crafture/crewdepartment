export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
      '@nuxt/ui',
      '@nuxtjs/tailwindcss',
      '@nuxtjs/color-mode',
      "dayjs-nuxt",
      "@nuxt/image",
      "nuxt-gtag"
  ],

  css: [
      '~/assets/css/videobg.css',
      '~/assets/css/timeline.css',
      '~/assets/css/like.css',
	  '~/assets/css/output.css'
  ],

  runtimeConfig: {
          sendmessageApiToken: process.env.NUXT_SENDMESSAGE_API_TOKEN || '',
          googleSheetsApiKey: process.env.NUXT_GOOGLE_SHEETS_API_KEY || '',
          googleServiceAccountEmail: process.env.NUXT_GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
          googlePrivateKey: process.env.NUXT_GOOGLE_PRIVATE_KEY || '',
          sheetId: process.env.NUXT_SHEET_ID || '',
          sharedDriveId: process.env.NUXT_SHARED_DRIVE_ID || '',
          public: {
              BACKEND_BASE_URL: process.env.NUXT_BACKEND_BASE_URL || 'https://backend.livecrowd.com',
              sendmessageBaseUrl: process.env.NUXT_SENDMESSAGE_BASE_URL || '',
              vapidPublicKey: process.env.NUXT_VAPID_PUBLIC_KEY || '',
          }
      },

  app: {
      head: {
          title: "Livecrowd",
          meta: [
                  { name: 'description' },
				  { name: 'apple-mobile-web-app-capable', content: 'yes' },
				  { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
                  { content: 'Discover Livecrowd: Stay Updated with Real-Time Event News & Support | Get the latest updates on live events, concerts, sports, and more, all at your fingertips! Contact our support team for assistance. Boost your experience with Livecrowd today' }

          ],
          script: [
              { src: 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js' },
              { src: 'https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-auto-scroll@0.5.3/dist/js/splide-extension-auto-scroll.min.js' },
              {
                  src: 'https://cdnjs.cloudflare.com/ajax/libs/scroll-lock/2.1.2/scroll-lock.min.js',
                  integrity: 'sha512-MBbICakhGbnckq5iFnAvaoTQwTyZqIEdhXGbzpNvGhkr+ZhjRdaVmJuNCVyZkObp5O/Mlows81qbzLAalgnoIg==',
                  crossorigin: 'anonymous',
                  referrerpolicy: 'no-referrer'
              },
          ],
          link: [
              { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css' },
              { rel: 'icon', href: 'https://s3.eu-central-1.amazonaws.com/cdn.crafture.com/livecrowd/crewdepartment/CREWDEPARTMENT_FAVICON.jpg' },
              { rel: 'apple-touch-icon', href: 'https://s3.eu-central-1.amazonaws.com/cdn.crafture.com/livecrowd/crewdepartment/CREWDEPARTMENT_FAVICON.jpg' }
          ]
      }
  },

  vue: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'model-viewer'
      }
  },

  dayjs: {
      locales: ['nl', 'en'],
      plugins: ['relativeTime', 'utc', 'timezone'],
      defaultLocale: 'nl',
      defaultTimezone: 'Europe/Amsterdam',
  },
  gtag: {
    id: ''
  },
  compatibilityDate: '2024-08-13'

})