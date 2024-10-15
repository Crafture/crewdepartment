<template>
    <PsvButton :logo="instagram" heading="test"
        :class="{ 'pointer-events-none grayscale opacity-60' : disabled }"
        styling="bg-gradient-to-b from-indigo-900 via-pink-600 to-[#fdfd66] text-white" svg-styling="text-white"
        header-text="Contact via" header-title="Instagram" footer-text="@livecrowdnl" 
        :link="disabled ? undefined : link" />
</template>

<script setup>
import instagram from '~/assets/img/instagram.svg'

let props = defineProps({
    display_name: String,
    disabled: {
        type: Boolean,
        default: false
    }
})

const link = "https://ig.me/m/livecrowdnl"
</script>