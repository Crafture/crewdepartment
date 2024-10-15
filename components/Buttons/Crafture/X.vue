<template>
  <Button
    :logo="x"
    styling="bg-black border-2 border-white rounded-md text-white"
    svg-styling="text-white"
    header-text="Contact via"
    header-title="X"
    footer-text="@crafturenl"
    :link="link"
    @click="initClickEvent()"
  />
</template>

<script setup>
import x from "~/assets/img/x.svg";
const { gtag } = useGtag();

let props = defineProps({
  display_name: String,
  preFilledMessage: {
        type: String,
        default: "Hey Crafture, ik heb een vraag"
    }
});

function initClickEvent() {
  gtag("event", "x_button_click", {
    event_class: "Button",
    event_name: "x_button_click",
    value: 1,
  });
}

const preFilledMessageEncoded = computed(() => {
  return encodeURIComponent(props.preFilledMessage + ":");
});

const link =
  "https://twitter.com/i/flow/login?redirect_after_login=%2Fintent%2Ftweet%3Ftext%3D" +
  preFilledMessageEncoded.value;
</script>
