export default defineNuxtPlugin({
  name: 'check-availability',
  enforce: 'pre',
  async setup(nuxtApp) {
    nuxtApp.provide('checkAvailability', async (targetDateString: string) => {
      const targetDate = new Date(targetDateString)
      let currentDate = new Date()

      if (process.server) {
        try {
          const { data } = await useFetch<{ currentTime: string }>('/api/current-time')
          if (data && data.value) {
            const currentDate = new Date(data.value?.currentTime)
          } else {
            throw new Error('Failed to fetch current time')
          }
        } catch (error) {
          console.error('Error fetching current time:', error)
          throw new Error('Internal Server Error')
        }
      }

      if (currentDate < targetDate) {
        const error = new Error('Page not found')
        ;(error as any).statusCode = 404
        throw error
      }
    })
  },
})
