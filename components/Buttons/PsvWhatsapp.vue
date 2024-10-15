<template>
    <PsvButton :logo="whatsapp" heading="test" styling="bg-[#22D366] text-white" svg-styling="text-white"
        :class="{ 'pointer-events-none grayscale opacity-60' : disabled }" header-text="Contact via"
        header-title="WhatsApp" footer-text="+31638882552" :link="disabled ? undefined : link" />
</template>

<script setup>
import whatsapp from '~/assets/img/whatsapp.svg'

let props = defineProps({
    display_name: String,
    disabled: {
        type: Boolean,
        default: false
    }
})

const link = "https://api.whatsapp.com/send?phone=31638882552&text=Hey%20Livecrowd%2C%20ik%20heb%20een%20vraag%20over%20de%20huldiging%3A"
</script>