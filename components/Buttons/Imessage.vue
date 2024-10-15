<template>
    <Button :logo="imessage" heading="test" styling="bg-white text-black" svg-styling="text-white" header-text="Contact via"
        header-title="iMessage" footer-text="Livecrowd" :link="link" />
</template>

<script setup>
import imessage from '~/assets/img/Imessage.svg'

const props = defineProps({
    display_name: String,
})

const link = "https://bcrw.apple.com/business/api/messageprofiles/redirecthelper?service=iMessage&recipient=urn:biz:8f378a70-d1b3-46a1-bcaf-168a392d87c5&biz-intent-id=account_question&biz-group-id=support_department&body=Hey%20Livecrowd%2C%20ik%20heb%20een%20vraag%20over%20" + props.display_name + "%3A"
</script>