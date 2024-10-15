<template>
    <PsvButton 
        :logo="psv_logo"
        heading="This is a heading"
        :class="{ 'pointer-events-none grayscale opacity-60': disabled }" 
        svg-styling="text-white"
        header-text="Livestream via"
        header-title="PSV"
        footer-text="psv.nl/kampioen"
        :link="disabled ? undefined : link" />
</template>

<script setup>
import psv_logo from '~/assets/img/psv_logo.svg'

const props = defineProps({
    display_name: String,
    disabled: {
        type: Boolean,
        default: false
    }
})

const link = ""
</script>