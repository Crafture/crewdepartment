<template>
    <ToppersButton 
        :logo="arrowSvg"
        heading="" 
        :styling="styling"
        svg-styling="w-7/12" 
        :header-title="headerTitle" 
        :link="url_link"
        :footer-text="footerText"
    />
</template>

<script setup>
import arrowSvg from '~/assets/img/arrow.svg'
import ToppersButton from '../ToppersButton.vue';

let props = defineProps({
    display_name: String,
    url_link: String,
    headerTitle: {
        Type: String,
        default: "Aanmelden voor updates"
    },
    styling: {
        type: String,
        default: "background: linear-gradient(0deg, rgba(0,13,120,1) 0%, rgba(35,190,255,1) 100%);"
    },
    footerText: {
        type: String,
        default: ""
    }
})

</script>