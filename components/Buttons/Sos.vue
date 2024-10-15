<template>
    <div v-if="isFetchingLocation">
        <Button :logo="spinner" heading="test" styling="bg-gradient-to-b from-red-800 to-red-500 text-white"
            svg-styling="text-white" :header-text="props.headerText" :header-title="props.headerTitle"
            footer-text="Uw locatie word op gehaald" />
    </div>
    <div v-else>
        <Button :logo="whatsapp" heading="test" styling="bg-gradient-to-b from-red-800 to-red-500 text-white"
            svg-styling="text-white" :header-text="props.headerText" :header-title="props.headerTitle" footer-text=""
            :on-click-action="createSosHref" />
    </div>
</template>

<script setup>
import whatsapp from '~/assets/img/whatsapp.svg'
import spinner from '~/assets/img/spinner.svg'

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
    }

})

const createSosHref = () => {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }
    isFetchingLocation.value = true;
    navigator.geolocation.getCurrentPosition(success, error);
};

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const mapsSosUrl = `https://www.google.com/maps/?q=${latitude},${longitude}`;
    sosHref.value = `https://api.whatsapp.com/send?phone=31638882555&text=Hey%20Livecrowd.%20Hier%20kun%20je%20mij%20vinden:%20${mapsSosUrl}`;
    window.open(sosHref.value, '_self');
    isFetchingLocation.value = false;
};

const error = () => {
    alert('Unable to retrieve your location, make sure you give the right permissions');
    isFetchingLocation.value = false;
};

</script>

<style scoped></style>
