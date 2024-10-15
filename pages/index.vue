
<template>
    <EventLandingPage :measurement_id="measurement_id" :display_name="display_name"  :event_name="event_name" >
        <template v-slot:logo>
            <NuxtLink>
                <img :src="logo" alt="Logo" class="w-[160px]" width="160px" height="160px">
            </NuxtLink>
        </template>
        <VideoPlayer :background_url="background_url" />
        <!-- Specific content goes here -->
        <Grid>
            <Imessage :display_name="display_name" />
            <Whatsapp :display_name="display_name" />
            <Freshchat :display_name="display_name" />
            <Messenger />
            <X :display_name="display_name" />
            <Instagram />
        </Grid>
    </EventLandingPage>
</template>
  
<script setup>
import EventLandingPage from '~/components/pages/EventLandingPage.vue'
import VideoPlayer from '~/components/VideoPlayer/CdnLinkPLayer.vue'
import Grid from '~/components/Grid.vue'
import logo from '~/public/livecrowd.webp'

//buttons
import Imessage from '~/components/Buttons/Imessage.vue'
import Whatsapp from '~/components/Buttons/Whatsapp.vue'
import Freshchat from '~/components/Buttons/Freshchat.vue'
import Messenger from '~/components/Buttons/Messenger.vue'
import X from '~/components/Buttons/X.vue'
import Instagram from '~/components/Buttons/Instagram.vue'


//dynamic variables
const measurement_id = 'G-71J174YFQE';
const event_name = "crewdepartment";
const display_name = "Crew Department";
const background_url = "https://s3.eu-central-1.amazonaws.com/cdn.crafture.com/livecrowd/bgvideos/Anouk_16x9_V.1.01.mp4";
const faqTagsList = ["anouk24"];
const { initialize } = useGtag()

onMounted(() => {
    initialize(measurement_id);
})

</script>
