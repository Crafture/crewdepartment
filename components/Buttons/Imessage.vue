<template>
    <Button
	:logo="imessage"
	heading="test"
	styling="bg-white text-black"
    :class="{ 'pointer-events-none grayscale opacity-60': disabled }"
	svg-styling="text-white"
    header-text="Contact via"
	header-title="iMessage"
	:footer-text="footer_text"
	@click="initClickEvent()"
	:link="disabled ? undefined : link" />
</template>

<script setup>
import imessage from '~/assets/img/Imessage.svg'
const { gtag } = useGtag();

const props = defineProps({
    display_name: String,
    footer_text: {
        type: String,
        default: "Livecrowd",
    },
    disabled: {
        type: Boolean,
        default: false
    },
	preFilledMessage: {
        type: String,
        default: "Hey Livecrowd, ik heb een vraag over "
    }
})

function initClickEvent() {
  gtag(
    "event",
    "imessage_button_click", 
    {
        event_class: "Button",
        event_name: "imessage_button_click",
        value: 1,
    }
)};

const preFilledMessageEncoded = computed(() => {
    return encodeURIComponent(props.preFilledMessage + props.display_name + ":");
});

const link = "https://bcrw.apple.com/business/api/messageprofiles/redirecthelper?service=iMessage&recipient=urn:biz:8f378a70-d1b3-46a1-bcaf-168a392d87c5&biz-intent-id=account_question&biz-group-id=support_department&body=" + preFilledMessageEncoded.value
</script>