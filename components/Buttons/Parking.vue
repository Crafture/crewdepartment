<template>
    <Button
	:logo="parkingSVG"
	heading="test"
	styling="bg-[#275fa4] text-white"
	svg-styling="text-white h-28 w-28 sm:h-24 sm:w-24 md:w-32 md:h-32 2xl:w-44 2xl:h-44"
    header-title="Parkeren"
	@click="initClickEvent()"
	:link="url_link" />
</template>

<script setup>
import Button from '~/components/Button.vue';
import parkingSVG from '~/assets/img/parking.svg'
const { gtag } = useGtag();

let props = defineProps({
    display_name: String,
    url_link: String,
})

function initClickEvent() {
  gtag(
    "event",
    "parking_button_click", 
    {
        event_class: "Button",
        event_name: "parking_button_click",
        value: 1,
    }
)};

</script>