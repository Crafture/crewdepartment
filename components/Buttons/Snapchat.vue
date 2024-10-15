<template>
    <div class="button-wrapper">
        <Button
		:logo="snapchat"
		heading="test"
        styling="bg-[#FFFC00] text-white"
		svg-styling="text-white"
        header-text="Contact via"
		header-title="Snapchat"
		footer-text="@livecrowdnl"
		@click="initClickEvent()"
        :link="urlLink" />
    </div>
</template>

<script setup>
import snapchat from '~/assets/img/snapchat.svg'
const { gtag } = useGtag();

const props = defineProps({
    urlLink: {
        type: String,
        default: "/"
    }
})

function initClickEvent() {
  gtag(
    "event",
    "snapchat_button_click", 
    {
        event_class: "Button",
        event_name: "snapchat_button_click",
        value: 1,
    }
)};

</script>

<style scoped>
.button-wrapper * {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Adjust values as needed */
}
</style>