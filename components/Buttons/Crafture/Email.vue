<template>
  <Button
    :logo="mail"
    heading="test"
    styling="bg-black border-2 border-white rounded-md text-white"
    svg-styling=""
    header-text="Contact via"
    header-title="E-mail"
    :footer-text="footerText"
    :link="emailLink"
    @click="initClickEvent()"
  />
</template>

<script setup>
import mail from "~/assets/img/crafture/MAIL_ICON0.svg";
const { gtag } = useGtag();

const props = defineProps({
  emailLink: {
    type: String,
    default: "mailto:hey@crafture.com",
  },
  footerText: {
    type: String,
    default: "hey@crafture.com",
  },
});

function initClickEvent() {
  gtag("event", "email_button_click", {
    event_class: "Button",
    event_name: "email_button_click",
    value: 1,
  });
}
</script>
