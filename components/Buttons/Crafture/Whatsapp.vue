<template>
    <Button :logo="whatsapp" heading="test" styling="bg-black border-2 border-white text-white" svg-styling="text-white"
        :class="{ 'pointer-events-none grayscale opacity-60' : disabled }" header-text="Contact via"
        header-title="WhatsApp" :footer-text="`+${phone}`" :link="disabled ? undefined : link" @click="initClickEvent()" />
</template>

<script setup>
import Button from '~/components/Button.vue';
import whatsapp from '~/assets/img/whatsapp.svg'
const { gtag } = useGtag();

let props = defineProps({
    display_name: String,
    phone: {
        type: String,
        default: "31638882552",
    },
    disabled: {
        type: Boolean,
        default: false
    },
    preFilledMessage: {
        type: String,
        default: "Hey Crafture, ik heb een vraag"
    }
})

function initClickEvent() {
  gtag(
    "event",
    "whatsapp_button_click", 
    {
        event_class: "Button",
        event_name: "whatsapp_button_click",
        value: 1,
    }
)};


const preFilledMessageEncoded = computed(() => {
	return encodeURIComponent(`${props.preFilledMessage}:`);
});

const link = `https://api.whatsapp.com/send?phone=${props.phone}&text=` + preFilledMessageEncoded.value;
</script>

<style scoped>

</style>