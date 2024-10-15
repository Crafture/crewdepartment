
<template>
    <EventLandingPage :measurement_id="measurement_id" :display_name="display_name"  :event_name="event_name" >
        <template v-slot:logo>
            <NuxtLink>
                <img :src="logo" alt="Logo" class="py-[30px]" width="auto" height="160px">
            </NuxtLink>
        </template>
        <VideoPlayer :background_url="background_url" />
        <!-- Specific content goes here -->
        <Grid>
            <Whatsapp :display_name="display_name" />
            <Bellen :display_name="display_name" />
            <Email :display_name="display_name" />
            <Instagram />
        </Grid>
    </EventLandingPage>
</template>
  
<script setup>
import EventLandingPage from '~/components/pages/EventLandingPage.vue'
import VideoPlayer from '~/components/VideoPlayer/CdnLinkPLayer.vue'
import Grid from '~/components/Grid.vue'
import logo from '~/public/CREWDEPARTMENT_LOGO.png'

//buttons
import Whatsapp from '~/components/Buttons/Whatsapp.vue'
import Bellen from '~/components/Buttons/Bellen.vue'
import Email from '~/components/Buttons/Email.vue'
import Instagram from '~/components/Buttons/Instagram.vue'


//dynamic variables
const measurement_id = 'G-71J174YFQE';
const event_name = "crewdepartment";
const display_name = "Crew Department";
const background_url = "https://s3.eu-central-1.amazonaws.com/cdn.crafture.com/livecrowd/bgvideos/LIVECROWD_CREWDEPARTMENT_BACKGROUNDVIDEO_V2.01.mp4";
// const faqTagsList = ["crew"];
const { initialize } = useGtag()

onMounted(() => {
    initialize(measurement_id);
})

</script>
