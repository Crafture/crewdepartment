export default defineEventHandler((event) => {
  const currentTime = new Date().toISOString()
  return {
    currentTime
  }
})