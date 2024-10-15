declare module '#app' {
    interface NuxtApp {
      $checkAvailability: (targetDateString: string) => Promise<void>
    }
  }

  export {}