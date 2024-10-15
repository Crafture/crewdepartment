<template>
    <Button
	:logo="messenger"
	heading="test"
    :class="{ 'pointer-events-none grayscale opacity-60' : disabled }"
    styling="bg-gradient-to-b from-pink-600 via-indigo-600 to-indigo-700 text-white"
	svg-styling="text-white"
    header-text="Contact via"
	header-title="Messenger"
	:footer-text=footer_text
	@click="initClickEvent()"
    :link="disabled ? undefined : link" />
</template>

<script setup>
import messenger from '~/assets/img/messenger.svg'
const { gtag } = useGtag();

let props = defineProps({
    display_name: String,
    id: {
        type: String,
        default: "376934875843120"
    },
    footer_text: {
        type: String,
        default: "@livecrowdnl",
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

function initClickEvent() {
  gtag(
    "event",
    "messenger_button_click", 
    {
        event_class: "Button",
        event_name: "messenger_button_click",
        value: 1,
    }
)};

const link = `https://www.messenger.com/t/${props.id}/`
</script>