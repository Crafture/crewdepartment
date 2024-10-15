<template>
    <Button
	:logo="mail"
	heading="test"
	styling="bg-zinc-800 text-white"
	svg-styling=""
	header-text="Contact via"
    header-title="E-mail"
	:footer-text="footerText"
	@click="initClickEvent()"
	:link="emailLink" />
</template>

<script setup>
import mail from '~/assets/img/Mail.svg'
const { gtag } = useGtag();

const props = defineProps({
    emailLink: {
        type: String,
        default: "mailto:support@livecrowd.com"
    },
	footerText: {
        type: String,
        default: "support@livecrowd.com"
    }
})

function initClickEvent() {
  gtag(
    "event",
    "email_button_click", 
    {
        event_class: "Button",
        event_name: "email_button_click",
        value: 1,
    }
)};
</script>