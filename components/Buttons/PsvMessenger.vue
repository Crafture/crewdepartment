<template>
    <PsvButton :logo="messenger" heading="test"
        :class="{ 'pointer-events-none grayscale opacity-60' : disabled }"
        styling="bg-gradient-to-b from-pink-600 via-indigo-600 to-indigo-700 text-white" svg-styling="text-white"
        header-text="Contact via" header-title="Messenger" footer-text="@livecrowdnl"
        :link="disabled ? undefined : link" />
</template>

<script setup>
import messenger from '~/assets/img/messenger.svg'

let props = defineProps({
    display_name: String,
    disabled: {
        type: Boolean,
        default: false
    }
})
const link = "https://www.messenger.com/t/376934875843120/"
</script>