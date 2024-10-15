<template>
    <div class="vimeo-wrapper bg-black bg-cover" :style="{ backgroundImage: `url(${fallback})` }">
        <iframe :src="background_url" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>
</template>

<script setup>

const props = defineProps({
    background_url: String,
    fallback: {
        type: String,
        default: '/images/fallback.webp'
    }
});

</script>