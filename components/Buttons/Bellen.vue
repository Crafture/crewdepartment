<template>
    <Button
	:logo="call"
	heading="test"
	styling="bg-[#00A532] text-white"
	svg-styling="max-h-[50px] xl:max-h-[70px]"
	header-text="Contact via"
    header-title="Bellen"
	:footer-text="footerText"
	@click="initClickEvent()"
	:link="callLink" />
</template>

<script setup>
import call from '~/assets/img/TELEFOON_ICON.svg'
const { gtag } = useGtag();

const props = defineProps({
    callLink: {
        type: String,
        default: "tel:info@crewdepartment.nl"
    },
	footerText: {
        type: String,
        default: "030 – 20 420 06"
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