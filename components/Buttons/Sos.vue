<template>
    <div v-if="isFetchingLocation">
        <Button :logo="spinner" styling="bg-gradient-to-b from-red-800 to-red-500 text-white"
            svg-styling="text-white" :header-text="headerText" :header-title="headerTitle"
            footer-text="Retrieving your location" />
    </div>
    <div v-else>
        <Button :logo="whatsapp" styling="bg-gradient-to-b from-red-800 to-red-500 text-white"
            svg-styling="text-white" :header-text="headerText" :header-title="headerTitle"
            :on-click-action="createSosHref" />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import whatsapp from '~/assets/img/whatsapp.svg'
import spinner from '~/assets/img/spinner.svg'
const { gtag } = useGtag();

const sosHref = ref("")
const isFetchingLocation = ref(false);

const props = defineProps({
    displayName: {
        type: String,
        default: "Livecrowd Service"
    },
    headerText: {
        type: String,
        default: "Ik heb met spoed hulp nodig"
    },
    headerTitle: {
        type: String,
        default: "S.O.S"
    },
    preFilledMessage: {
        type: String,
        default: "Hey Livecrowd. Ik heb met spoed hulp nodig: "
    }
})

const preFilledMessageEncoded = computed(() => {
    return encodeURIComponent(props.preFilledMessage);
});

function initClickEvent() {
  gtag(
    "event",
    "sos_button_click", 
    {
        event_class: "Button",
        event_name: "sos_button_click",
        value: 1,
    }
)};

const createSosHref = () => {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }
    isFetchingLocation.value = true;
    navigator.geolocation.getCurrentPosition(success, error);
	initClickEvent();
};

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const mapsSosUrl = `https://www.google.com/maps/?q=${latitude},${longitude}`;
    sosHref.value = `https://api.whatsapp.com/send?phone=31638882555&text=${preFilledMessageEncoded.value}${mapsSosUrl}`;
    window.open(sosHref.value, '_self');
    isFetchingLocation.value = false;
};

const error = () => {
    alert('Unable to retrieve your location, make sure you give the right permissions');
    isFetchingLocation.value = false;
};

</script>

<style scoped></style>
