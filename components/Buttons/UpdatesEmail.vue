<template>
    <Button
	:logo="emailSvg"
	heading="test"
	styling="bg-gradient-to-b from-red-700 via-orange-600 to-yellow-500 text-white"
    svg-styling="w-5/12"
	header-title="Aanmelden voor updates via e-mail"
	@click="initClickEvent()"
	:link="url_link" />
</template>

<script setup>
import Button from '~/components/Button.vue';
import emailSvg from '~/assets/img/email-1.svg'
const { gtag } = useGtag();

let props = defineProps({
    display_name: String,
    url_link: String,
})

function initClickEvent() {
  gtag(
    "event",
    "updatesemail_button_click", 
    {
        event_class: "Button",
        event_name: "updatesemail_button_click",
        value: 1,
    }
)};

</script>