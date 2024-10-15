export const useCheckAvailability = async (targetDateString: string) => {
  const nuxtApp = useNuxtApp()
  try {
    await nuxtApp.$checkAvailability(targetDateString)
  } catch (error: any) {
    if (error.statusCode === 404) {
      throw createError({ statusCode: 404, statusMessage: 'Page not found' , fatal: true})
    } else {
      throw error
    }
  }
}