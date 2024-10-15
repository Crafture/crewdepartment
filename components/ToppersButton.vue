<template>
    <div class="relative flex flex-col items-center justify-between aspect shadow rounded-lg px-3 py-2 cursor-pointer overflow-hidden text-white"
        @click="toggleDetails" :style="styling">
        <div v-if="showInfoOnClick" class="absolute pt-3 px-4 w-full top-0 left-0 flex justify-between">
            <p class="z-50 transition-colors" :class="showDetails ? 'delay-500' : 'delay-250'">01</p>
            <div class="z-50 p-1 flex justify-center items-center rounded-full bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4 transition-transform duration-300 ease-in-out"
                    :style="{ transform: `rotate(${showDetails ? 45 : 0}deg)` }">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
        </div>
        <div v-else class="flex w-full flex-col" style="height: 3em;">
            <p class="text-xs lg:text-sm">{{ props.headerText }}</p>
            <h1 class="text-sm md:text-md lg:text-lg font-bold">{{ props.headerTitle }}</h1>
        </div>

        <div class="w-full inset-0 flex justify-center items-center">
            <img v-if="props.logo" :src="props.logo" class="w-5/12 " :class="svgStyling">
        </div>

        <div v-if="showDetails"
            class="details-wrapper px-5 lg:py-2 h-full bg-[#2A2A2A] w-full absolute bottom-0 left-0 right-0 transition-all duration-700"
            :class="showDetails ? 'active' : ''">
            <div class="mt-14 flex flex-col items-start">
                <h2 class="text-md lg:text-xl mb-4">{{ props.heading }}</h2>
            </div>
            <div class="details text-sm lg:text-md flex flex-col items-start overflow-hidden">
                <p>{{ props.text }}</p>
            </div>
            <button class="z-50 mt-2 px-4 py-2 bg-gray-400 rounded-lg" @click="handleButtonClick">Activate</button>
        </div>

        <div class="w-full text-m lg:text-base flex items-start justify-center uppercase font-bold text-clamp"
            style="height: 3em; font-family: MassiveHeadache">
            <p>
                {{ props.footerText }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    showInfoOnClick: {
        type: Boolean,
        default: false,
    },
    onClickAction: Function,
    link: {
        type: String,
        default: ''
    },
    styling: {
        type: String,
        default: ''
    },
    svgStyling: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    },
    heading: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    },
    headerText: {
        type: String,
        default: ''
    },
    headerTitle: {
        type: String,
        default: ''
    },
    footerText: {
        type: String,
        default: ''
    },
})

const showDetails = ref(false);

const toggleDetails = () => {
    if (props.showInfoOnClick)
        showDetails.value = !showDetails.value;
    else
        handleButtonClick();
};

const handleButtonClick = () => {
    if (props.link) {
        window.open(props.link, '_blank');
    } else if (props.onClickAction) {
        props.onClickAction();
    }
}
</script>

<style scoped>
@font-face {
    font-family: 'MassiveHeadache';
    src: url('/fonts/MassiveHeadache.woff2') format('woff2'),
        url('/fonts/MassiveHeadache.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: optional;
}

.text-clamp {
    font-size: clamp(10px, 5px + 1vw, 18px);
}

.details-wrapper {
    transform: translateY(100%);
}

.details-wrapper.active {
    transform: translateY(0);
}

.details {
    height: 0;
    opacity: 0;
    transition: height 0.5s, opacity 0.5s;
}

.details-wrapper.active .details {
    height: auto;
    opacity: 1;
}

.aspect {
    aspect-ratio: 1/1;

}
</style>
