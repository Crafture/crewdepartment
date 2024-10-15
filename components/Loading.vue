<template>
    <Transition>
        <div v-show="isLoading"
            class="fixed top-0 z-50 bg-blue-700 h-screen w-screen flex flex-col justify-center items-center transition-opacity duration-[500ms]"
            :class="{ 'opacity-0': !isLoading }">
            <img src="/images/livecrowd-loading.gif" loading="lazy" class="h-40" height="160px" width="160px" />
        </div>
    </Transition>
</template>

<script setup>
import { useLoading } from '~/composables/useLoading'

const { isLoading } = useLoading()
</script>