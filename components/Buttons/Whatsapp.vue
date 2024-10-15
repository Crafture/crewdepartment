<template>
  <Button
    :logo="whatsapp"
    heading="test"
    styling="bg-[#22D366] text-white"
    svg-styling="text-white"
    :class="{ 'pointer-events-none grayscale opacity-60': disabled }"
    header-text="Contact via"
    header-title="WhatsApp"
    :footer-text="`+${phone}`"
    @click="initClickEvent()"
    :link="disabled ? undefined : link"
  />
</template>

<script setup>
import Button from "~/components/Button.vue";
import whatsapp from "~/assets/img/whatsapp.svg";
const { gtag } = useGtag();

const props = defineProps({
  display_name: String,
  phone: {
    type: String,
    default: "31681184000",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  preFilledMessage: {
        type: String,
        default: "Hey Crew Department,"
    }
});

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
	return encodeURIComponent(`${props.preFilledMessage}${props.display_name}:`);
});

const link = `https://api.whatsapp.com/send?phone=${props.phone}&text=` + preFilledMessageEncoded.value;
</script>

<style scoped></style>
