<template>
    <Button :logo="arrowSvg" heading="" styling="bg-gradient-to-b from-red-700 via-orange-600 to-yellow-500 text-white"
        svg-styling="w-7/12" :header-title="headerTitle" :link="url_link" />
</template>

<script setup>
import Button from '~/components/Button.vue';
import arrowSvg from '~/assets/img/arrow.svg'

let props = defineProps({
    display_name: String,
    url_link: String,
    headerTitle: {
        Type: String,
        default: "Aanmelden voor updates"
    }
})

</script>