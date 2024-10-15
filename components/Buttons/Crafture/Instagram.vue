<template>
  <Button
    :logo="instagram"
    heading="test"
    :class="{ 'pointer-events-none grayscale opacity-60': disabled }"
    styling="bg-black border-2 border-white rounded-md text-white"
    svg-styling="text-white"
    header-text="Contact via"
    header-title="Instagram"
    :footer-text="`@${username}`"
    :link="disabled ? undefined : link"
    @click="initClickEvent()"
  />
</template>

<script setup>
import instagram from "~/assets/img/instagram.svg";

const { gtag } = useGtag();

let props = defineProps({
  display_name: String,
  username: {
    type: String,
    default: "crafturenl",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

function initClickEvent() {
  gtag("event", "instagram_button_click", {
    event_class: "Button",
    event_name: "instagram_button_click",
    value: 1,
  });
}

const link = `https://ig.me/m/${props.username}`

</script>
