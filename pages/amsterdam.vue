<template>
    <EventLandingPage :measurement_id="measurement_id" :event_name="event_name" :logo="logo">
        <VideoPlayer :background_url="background_url" />
        <!-- Specific content goes here -->
        <Grid>
			<Updates :display_name="display_name"
                url_link="https://api.whatsapp.com/send/?phone=31638882552&text=KINGSDAY%20AAN" />
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
import logo from '~/assets/img/livecrowd.png'

//buttons
import Imessage from '~/components/Buttons/Imessage.vue'
import Whatsapp from '~/components/Buttons/Whatsapp.vue'
import Freshchat from '~/components/Buttons/Freshchat.vue'
import Messenger from '~/components/Buttons/Messenger.vue'
import X from '~/components/Buttons/X.vue'
import Instagram from '~/components/Buttons/Instagram.vue'
import Updates from '~/components/Buttons/Updates.vue'


//dynamic variables
const measurement_id = 'G-BP0MY7G1MM';
const event_name = "kingsdayamsterdam";
const display_name = "Kingsday Amsterdam";
const background_url = "https://s3.eu-central-1.amazonaws.com/cdn.crafture.com/kings.day/KONINGSDAG_16x9_V.1.01.mp4-vimeo-816482762-hls-fastly_skyfire_sep-4633.mp4";
const faqTagsList = ["kingsdayamsterdam24"];

</script>
