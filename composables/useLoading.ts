import { ref } from 'vue'

const isLoading = ref(true)

function startLoading() {
    isLoading.value = true
}

function stopLoading() {
    isLoading.value = false
}

export function useLoading() {
    return { isLoading, startLoading, stopLoading }
}
