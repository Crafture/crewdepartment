<template>
    <Button :logo="mail" heading="test" styling="bg-zinc-800 text-white" svg-styling="" header-text="Contact via"
        header-title="E-mail" footer-text="support@livecrowd.com" :link="emailLink" />
</template>

<script setup>
import mail from '~/assets/img/Mail.svg'

const props = defineProps({
    emailLink: {
        type: String,
        default: "mailto:support@livecrowd.com"
    }
})
</script>