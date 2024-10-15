export default defineNuxtConfig({
    devtools: { enabled: false },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode'
    ],
    css: [
        '~/assets/css/videobg.css',
        '~/assets/css/timeline.css',
        '~/assets/css/like.css'
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
            }
        },
    app: {
        head: {
            title: "Livecrowd",
            meta: [
                {
                    name: 'description',
                    content: 'Discover Livecrowd: Stay Updated with Real-Time Event News & Support | Get the latest updates on live events, concerts, sports, and more, all at your fingertips! Contact our support team for assistance. Boost your experience with Livecrowd today'
                }
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
                { src: 'https://wchat.freshchat.com/js/widget.js', async: false },
                { src: 'https://unpkg.com/@rive-app/canvas@2.1.0', body: true },
                { src: 'https://js.stripe.com/v3/' },
            ],
            link: [
                { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css' },
                { rel: 'icon', type: 'image/x-icon', href: '/livecrowd.webp' }
            ]
        }
    },
    routeRules: {
        '/help': { redirect: { to: '/support', statusCode: 301 } },
        '/cirquedusoleil2023': { redirect: { to: '/cirquedusoleil', statusCode: 301 } },
        '/anne-marie': { redirect: { to: '/annemarie', statusCode: 301 } },
        '/cinemacon': { redirect: { to: '/cinemacon24', statusCode: 301 } },
		'/': { redirect: { to: '/amsterdam', statusCode: 301 } },
    },
    vue: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'model-viewer'
        }
      }
})

