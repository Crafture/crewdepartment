<template>
    <div class="py-10 w-screen flex justify-center items-center">
        <div class="px-2 w-full flex flex-col justify-center items-center">
            <!-- Change the width and height here for the container -->
            <div :style="logoStyle">
                <template v-if="props.logoLinkEnabled">
                    <NuxtLink :to="props.logoLink" target="_blank">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <!-- Define shadow filter -->
                            <defs>
                                <filter v-if="shadowEnabled" id="f1" x="0" y="0" width="150%" height="150%">
                                    <feOffset result="offOut" in="SourceAlpha" dx="6" dy="6" />
                                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
                                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                                </filter>
                            </defs>
                            <!-- Use the logo with the filter -->
                            <image :xlink:href="logo" width="100%" height="100%"
                                :filter="shadowEnabled ? 'url(#f1)' : ''" />
                        </svg>
                    </NuxtLink>
                </template>
                <template v-else>
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink">
                        <!-- Define shadow filter -->
                        <defs>
                            <filter v-if="shadowEnabled" id="f1" x="0" y="0" width="150%" height="150%">
                                <feOffset result="offOut" in="SourceAlpha" dx="6" dy="6" />
                                <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
                                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                            </filter>
                        </defs>
                        <!-- Use the logo with the filter -->
                        <image :xlink:href="logo" width="100%" height="100%"
                            :filter="shadowEnabled ? 'url(#f1)' : ''" />
                    </svg>
                </template>
            </div>
            <slot name="videoPlayer"></slot>
            <div class="md:w-2/3 lg:w-3/5 xl:w-1/2 2xl:w-2/5 w-full h-full">
                <TimeLine :event_name="event_name" />
            </div>
            <div class="mt-8 w-full flex flex-col justify-center items-center">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    measurement_id: String,
    fallback: String,
    event_name: String,
    background_url: String,
    logo: {
        type: String,
        default: '/livecrowd.webp'
    },
    logoWidth: {
        type: String,
        default: '206px'
    },
    logoHeight: {
        type: String,
        default: '206px'
    },
    logoWidthMobile: {
        type: String,
        default: '128px'
    },
    logoHeightMobile: {
        type: String,
        default: '128px'
    },
    logoLink: {
        type: String,
    },
    logoLinkEnabled: {
        type: Boolean,
        default: false
    },
    shadowEnabled: {
        type: Boolean,
        default: true
    }

});

const logoSrc = ref(props.logo);



onMounted(() => {
    // Adding Google Analytics script
    if (typeof window !== 'undefined') {
        // Asynchronously load the Google Analytics tag
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${props.measurement_id}`;
        document.head.appendChild(gaScript);

        gaScript.onload = () => {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', props.measurement_id);
        };
    }

    window.addEventListener('resize', adjustLogoForWindowSize);
    adjustLogoForWindowSize();
});



const logoStyle = ref({});

// Adjust logo styling based on window size
const adjustLogoForWindowSize = () => {
    if (window.innerWidth <= 640) { // Small screen (e.g., mobile)
        logoStyle.value = {
            width: props.logoWidthMobile,
            height: props.logoHeightMobile,
        };
    } else {
        logoStyle.value = {
            width: props.logoWidth,
            height: props.logoHeight,
        };
    }
};

onUnmounted(() => {
    window.removeEventListener('resize', adjustLogoForWindowSize);
});

</script>