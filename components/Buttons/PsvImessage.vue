<template>
    <PsvButton 
        :logo="psv_imessage"
        heading="This is a heading"
        :class="{ 'pointer-events-none grayscale opacity-60': disabled }" 
        svg-styling="text-white"
        header-text="Contact via"
        header-title="iMessage"
        footer-text="Livecrowd"
        :link="disabled ? undefined : link" />
</template>

<script setup>
import psv_imessage from '~/assets/img/psv_imessage.svg'

const props = defineProps({
    display_name: String,
    disabled: {
        type: Boolean,
        default: false
    }
})

const link = "https://bcrw.apple.com/business/api/messageprofiles/redirecthelper?service=iMessage&recipient=urn:biz:8f378a70-d1b3-46a1-bcaf-168a392d87c5&biz-intent-id=account_question&biz-group-id=support_department&body=Hey%20Livecrowd%2C%20ik%20heb%20een%20vraag%20over%20de%20huldiging%3A"
</script>