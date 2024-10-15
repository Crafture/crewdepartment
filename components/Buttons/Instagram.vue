<template>
    <Button
	:logo="instagram"
	heading="test"
	:class="{ 'pointer-events-none grayscale opacity-60' : disabled }"
    styling="bg-gradient-to-b from-indigo-900 via-pink-600 to-[#fdfd66] text-white"
	svg-styling="text-white"
    header-text="Contact via"
	header-title="Instagram"
	:footer-text="`@${username}`"
	@click="initClickEvent()"
    :link="disabled ? undefined : link" />
</template>

<script setup>
import instagram from '~/assets/img/instagram.svg'
const { gtag } = useGtag();

let props = defineProps({
    display_name: String,
    username: {
        type: String,
        default: "crewdepartment",
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

function initClickEvent() {
  gtag(
    "event",
    "instagram_button_click", 
    {
        event_class: "Button",
        event_name: "instagram_button_click",
        value: 1,
    }
)};

const link = `https://ig.me/m/${props.username}`
</script>