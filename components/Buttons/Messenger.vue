<template>
    <Button :logo="messenger" heading="test"
        styling="bg-gradient-to-b from-pink-600 via-indigo-600 to-indigo-700 text-white" svg-styling="text-white"
        header-text="Contact via" header-title="Messenger" footer-text="@livecrowdnl"
        link="https://www.messenger.com/t/376934875843120/" />
</template>

<script setup>
import messenger from '~/assets/img/messenger.svg'
</script>