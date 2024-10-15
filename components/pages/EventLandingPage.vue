<template>
    <div class="py-10 w-screen flex justify-center items-center">
        <div>
            <UModal v-model="isOpen" prevent-close :ui="{
                background: 'bg-transparent dark:bg-transparent', shadow: 'shadow-none', container: 'items-center', width: 'sm:max-w-xl',
                overlay: {
                    base: 'fixed inset-0 transition-opacity',
                    background: 'bg-gray-200/75 dark:bg-gray-800/75 backdrop-blur-lg'
                }
            }">
                <img src="/images/livecrowd-popup.svg" class="w-full" loading="lazy">
                <div class="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-center px-16 mt-4">
                    <ParsedMessage :message="event.popup_title"
                        class="text-white text-2xl md:text-4xl font-bold max-w-[175px] md:max-w-sm" />
                    <ParsedMessage :message="event.popup_body" class="text-white text-xs md:text-lg" />
                    <div @click="isOpen = false"
                        class="mt-4 text-xs md:text-md cursor-pointer py-2 px-6 rounded-lg bg-[#36BFC4]">Sluiten</div>
                </div>
            </UModal>
        </div>
        <div class="px-2 w-full flex flex-col justify-center items-center">
            <!-- Change the width and height here for the container -->
            <slot name="logo"></slot>
            <slot name="videoPlayer"></slot>
            <div class="md:w-2/3 lg:w-3/5 xl:w-1/2 2xl:w-2/5 w-full h-full mt-4">
                <TimeLine :event_name="event_name" />
            </div>
            <div class="mt-8 w-full flex flex-col justify-center items-center  min-w-full">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ParsedMessage from '../ParsedMessage.vue';

const props = defineProps({
    measurement_id: String,
    fallback: String,
    event_name: String,
    display_name: String,
    background_url: String,
    logo: {
        type: String,
        default: '/livecrowd.webp'
    },
    logoLink: {
        type: String,
    },
    logoLinkEnabled: {
        type: Boolean,
        default: false
    },
    event: {
        type: Object,
        default: null
    }
});


const isOpen = ref(false);
if (props.event && props.event.popup_title && props.event.popup_body && props.event.popup_enabled) {
    isOpen.value = true;
}

onMounted(async () => {
    // Adding Google Analytics script
    // if (typeof window !== 'undefined') {
    //     // Asynchronously load the Google Analytics tag
    //     const gaScript = document.createElement('script');
    //     gaScript.async = true;
    //     gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${props.measurement_id}`;
    //     document.head.appendChild(gaScript);

    //     gaScript.onload = () => {
    //         window.dataLayer = window.dataLayer || [];
    //         function gtag() { dataLayer.push(arguments); }
    //         gtag('js', new Date());
    //         gtag('config', props.measurement_id, {
    //             cookie_flags: 'max-age=7200;secure;samesite=none'
    //         });
    //     };
    // }
});

useHead({
    title: `Livecrowd | ${props.display_name}`
});
</script>
