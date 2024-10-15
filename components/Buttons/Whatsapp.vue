<template>
    <Button :logo="whatsapp" heading="test" styling="bg-[#22D366] text-white" svg-styling="text-white"
        header-text="Contact via" header-title="WhatsApp" footer-text="+31638882552" :link="link" />
</template>

<script setup>
import Button from '~/components/Button.vue';
import whatsapp from '~/assets/img/whatsapp.svg'

let props = defineProps({
    display_name: String,
})

const link = "https://api.whatsapp.com/send?phone=31638882552&text=Hey%20Livecrowd%2C%20ik%20heb%20een%20vraag%20over%20" + props.display_name + "%3A"
</script>