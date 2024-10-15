<template>
    <Button :logo="whatsapp" heading="test" styling="bg-[#22D366] text-white w-40 h-40 lg:w-60 lg:h-60" svg-styling="text-white"
        :class="{ 'pointer-events-none grayscale opacity-60' : disabled }" header-text="Contact via"
        header-title="WhatsApp" footer-text="+31638882552" :link="disabled ? undefined : link" />
</template>

<script setup>
import Button from '~/components/Button.vue';
import whatsapp from '~/assets/img/whatsapp.svg'

let props = defineProps({
    display_name: String,
    disabled: {
        type: Boolean,
        default: false
    }
})
const link = "https://api.whatsapp.com/send?phone=31638882552&text=Hi%20Livecrowd%2C%20ik%20heb%20hulp%20nodig%20bij%20" + props.display_name + "%3A"
</script>
<style scoped>
</style>