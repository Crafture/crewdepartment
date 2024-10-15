<template>
    <div class="vimeo-wrapper bg-black bg-cover" :style="{ backgroundImage: `url(${fallback})` }">
        <video class="video-background" :src="background_url" autoplay loop muted playsinline>
            Your browser does not support the video tag.
        </video>
    </div>
</template>


<script setup>

const props = defineProps({
    background_url: String,
    fallback: {
        type: String,
        default: '/images/fallback.jpg'
    }
});

</script>

<style scoped>

.video-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
}

</style>