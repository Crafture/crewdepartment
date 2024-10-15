<template>
    <Button :logo="x" styling="bg-black text-white" svg-styling="text-white" header-text="Contact via" header-title="X"
        footer-text="@livecrowdnl" :link="link" />
</template>

<script setup>
import x from '~/assets/img/x.svg'

let props = defineProps({
    display_name: String,
})

const link = "https://twitter.com/i/flow/login?redirect_after_login=%2Fintent%2Ftweet%3Ftext%3DHey%2520%40LivecrowdNL%2C%2520ik%2520heb%2520een%2520vraag%2520over%2520" + props.display_name;
</script>