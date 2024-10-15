<template>
    <Button 
	:logo="arrowSvg" 
	heading="" 
	:styling="styling"
    svg-styling="w-7/12" 
	:header-title="headerTitle"
	@click="initClickEvent()"
	:link="url_link"
	/>
</template>

<script setup>
import Button from '~/components/Button.vue';
import arrowSvg from '~/assets/img/arrow.svg'
const { gtag } = useGtag();

let props = defineProps({
    display_name: String,
    url_link: String,
    headerTitle: {
        Type: String,
        default: "Aanmelden voor updates"
    },
    styling: {
        type: String,
        default: "bg-gradient-to-b from-red-700 via-orange-600 to-yellow-500 text-white"
    }
})

function initClickEvent() {
  gtag(
    "event",
    "updates_button_click", 
    {
        event_class: "Button",
        event_name: "updates_button_click",
        value: 1,
    }
)};

</script>