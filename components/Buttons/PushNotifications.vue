<template>
    <Button :logo="notifications_button" heading="" header-text="Pushnotificaties" :styling="bgColor"
    :class="{ 'pointer-events-none grayscale opacity-60': _disabled }" svg-styling=""
    :header-title="headerTitle" @click="handleButtonClick" />
	<div v-if="isOverlayVisible" id="overlay">
    <div id="overlay-content">
      <div class="container">
        <h2>To receive push notifications:</h2>
        <ol>
          <li style="flex-direction: row;">1. Tap the share icon.</li>
          <li>2. Scroll down until you see "Add to homescreen".</li>
          <li>3. Tap the icon on your home screen, then click the bell again.</li>
        </ol>
        <button @click="closeOverlay" class="close-button">OK</button>
	</div>
</div>
<div class="fix">
	<i class="arrow bounce"></i>
</div>
</div>
</template>

<script setup>
import Button from '~/components/Button.vue';
import notifications_button from '~/assets/img/notification_bell.svg'
const { gtag } = useGtag();

const config = useRuntimeConfig()
const BASE_URL = config.public.BACKEND_BASE_URL;
const publicKey = config.public.vapidPublicKey;

let props = defineProps({
    display_name: String,
    event_name: String,
    url_link: String,
    headerTitle: {
        type: String,
        default: "Zet Aan"
    },
    styling: {
        type: String,
        default: "bg-gradient-to-b from-red-700 via-orange-600 to-yellow-500 text-white"
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const isOverlayVisible = ref(false)

const openOverlay = () => {
  isOverlayVisible.value = true
}

const closeOverlay = () => {
  isOverlayVisible.value = false
}

const headerTitle = ref("Zet Aan");
const subscriptionDetails = ref('');
const reg = ref('');
const bgColor = ref("bg-gradient-to-b from-green-500 via-green-400 to-green-300 text-white");
const updating = ref(false);
const _disabled = ref(props.disabled);

onMounted(async () => {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register("/js/landing/sw.js");
        if (registration) {
            reg.value = registration;
        }
        const pushSubscription = await registration.pushManager.getSubscription();
        if (pushSubscription) {
            try {
                const response = await fetch(`${BASE_URL}/subscribed-status/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event_name: props.event_name,
                        subscription: pushSubscription
                    })
                });
                if (response.status === 200) {
                    headerTitle.value = "Zet Uit";
                    bgColor.value = "bg-gradient-to-b from-red-600 via-orange-500 to-yellow-400 text-white";
                    console.log("Subscribed");
                    subscriptionDetails.value = pushSubscription;
                } else if (response.status === 221) {
                    headerTitle.value = "Zet Aan";
                    bgColor.value = "bg-gradient-to-b from-green-700 via-green-600 to-blue-100 text-white";
                    console.log("Unsubscribed");
                    subscriptionDetails.value = pushSubscription;
                } else if (response.status === 400) {
                    throw new Error("fetching failed");
                }
            } catch (error) {
                console.error(error);
                headerTitle.value = "Zet Aan";
                _disabled.value = true; //
            }
        }
    } else {
        headerTitle.value = "Zet Aan";
        bgColor.value = "bg-gradient-to-b from-green-700 via-green-600 to-blue-100 text-white";
        console.log("Unsubscribed");
    }
});

function initClickEvent() {
  gtag(
    "event",
    "pushnotifications_button_click", 
    {
        event_class: "Button",
        event_name: "pushnotifications_button_click",
        value: 1,
    }
)};

const handleButtonClick = async () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInStandaloneMode = window.navigator.standalone;

	initClickEvent();
    if (updating.value === true) {
        console.log("still updating");
        return;
    }
    if (_disabled.value === true) { //
        return;
    }
    if (isIOS && !isInStandaloneMode) {
        openOverlay();
    }
	else {
        if (headerTitle.value === "Zet Aan") {
            updating.value = true;
            const subscribedStatus = await addServiceWorker();
            if (subscribedStatus === 0) {
                console.log("Subscribing failed");
                updating.value = false;
                return;
            }
			else {
				console.log("Subscribed");
				headerTitle.value = "Zet Uit";
				bgColor.value = "bg-gradient-to-b from-red-600 via-orange-500 to-yellow-400 text-white";
			}
        } else {
            updating.value = true;
            const subscribedStatus = await unSubscribe();
            if (subscribedStatus === 0) {
                console.log("Unsubscribing failed");
                updating.value = false;
                return;
            }
			else {
				console.log("Unsubscribed");
				headerTitle.value = "Zet Aan";
				bgColor.value = "bg-gradient-to-b from-green-600 via-green-500 to-green-400 text-white";
			}
        }
    }
};

const addServiceWorker = async () => {
    if (checkPermission()) {
        try {
            await requestNotificationPermission();
            if (await registerSW() === 0) {
				return 0;
			}
            return 1;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }
    return 0;
};

const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        console.log("Notification permission not granted");
        throw new Error("Notification permission not granted");
    }
};

const registerSW = async () => {
    try {
        const registration = await navigator.serviceWorker.register("/js/landing/sw.js");
        reg.value = registration;
        registration.update();
        const options = {
            userVisibleOnly: true,
            applicationServerKey: publicKey,
        };

        const pushSubscription = await registration.pushManager.subscribe(options);
        subscriptionDetails.value = pushSubscription;
        const saveResponse = await saveSubscription(pushSubscription);
        if (!saveResponse.ok) {
            throw new Error(`Failed to save subscription: ${saveResponse.status} - ${saveResponse.statusText}`);
        }
        updating.value = false;
        return 1;
    } catch (error) {
        console.error(`Service worker registration failed: ${error}`);
        return 0;
    }
};

const unSubscribe = async () => {
    if (subscriptionDetails.value) {
        try {
            const response = await fetch(`${BASE_URL}/subscribed-status/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event_name: props.event_name,
                    subscription: subscriptionDetails.value
                })
            });
            if (response.status === 200) {
                if (await deleteSubscription(subscriptionDetails.value) === 400) {
                    throw new Error("Unable to delete Subscription");
                } else {
                    await subscriptionDetails.value.unsubscribe();
					reg.value = '';
					subscriptionDetails.value = '';
					updating.value = false;
					return 1;
                }
            } else {
                console.log("Unsubscribing failed");
                return 0;
            }
        } catch (error) {
            console.error("Fetching subscription failed", error);
            return 0;
        }
    }
    return 0;
};

const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        console.log("No support for service worker!");
        return false;
    }

    if (!('Notification' in window)) {
        console.log("No support for notification API");
        return false;
    }

    if (!('PushManager' in window)) {
        console.log("No support for Push API");
        return false;
    }

    return true;
};

const deleteSubscription = async (subscription) => {
    const response = await fetch(`${BASE_URL}/delete-subscription/`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            event_name: props.event_name,
            subscription: subscription
        })
    });
    return response;
};

const saveSubscription = async (subscription) => {
    const response = await fetch(`${BASE_URL}/save-subscription/`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            event_name: props.event_name,
            display_name: props.display_name,
            subscription: subscription
        })
    });
    return response;
};

</script>
<style scoped>
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.43);
  z-index: 100;
}

/* Content inside the overlay */
#overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Styling for the container */
.container {
  max-width: 700px;
  padding: 5%;
  text-align: left;
}

/* Heading styling */
h2 {
  color: #fff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Open Sans', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
}

/* Ordered list styling */
ol {
  color: #ddd;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Open Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 30px;
  list-style-position: inside;
  line-height: 1.5;
}

@media screen and (max-width: 500px) {
	ol {
		font-size: 3.5vw;
	}

	h2 {
		font-size: 4.5vw;
	}

	.container {
		max-width: 100%;
	}

	.arrow {
		display: block;
	}
}

@media screen and (min-width: 501px) {
	.arrow {
		display: none;
	}
}

.arrow {
  position: fixed;
  bottom: 5%;
  left: 50%;
  margin-left:-20px;
  width: 40px;
  height: 40px;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yOTMuNzUxLDQ1NS44NjhjLTIwLjE4MSwyMC4xNzktNTMuMTY1LDE5LjkxMy03My42NzMtMC41OTVsMCwwYy0yMC41MDgtMjAuNTA4LTIwLjc3My01My40OTMtMC41OTQtNzMuNjcyICBsMTg5Ljk5OS0xOTBjMjAuMTc4LTIwLjE3OCw1My4xNjQtMTkuOTEzLDczLjY3MiwwLjU5NWwwLDBjMjAuNTA4LDIwLjUwOSwyMC43NzIsNTMuNDkyLDAuNTk1LDczLjY3MUwyOTMuNzUxLDQ1NS44Njh6Ii8+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjIwLjI0OSw0NTUuODY4YzIwLjE4LDIwLjE3OSw1My4xNjQsMTkuOTEzLDczLjY3Mi0wLjU5NWwwLDBjMjAuNTA5LTIwLjUwOCwyMC43NzQtNTMuNDkzLDAuNTk2LTczLjY3MiAgbC0xOTAtMTkwYy0yMC4xNzgtMjAuMTc4LTUzLjE2NC0xOS45MTMtNzMuNjcxLDAuNTk1bDAsMGMtMjAuNTA4LDIwLjUwOS0yMC43NzIsNTMuNDkyLTAuNTk1LDczLjY3MUwyMjAuMjQ5LDQ1NS44Njh6Ii8+DQo8L3N2Zz4=);
  background-size: contain;
  
}

.bounce {
    -webkit-animation: bounce 2s infinite;
    animation: bounce 2s infinite;
}

/* Scroll down indicator (bouncing) */
@-webkit-keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    -webkit-transform: translateY(0); }
  40% {
    -webkit-transform: translateY(-30px); }
  60% {
    -webkit-transform: translateY(-15px); } }
@-moz-keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    -moz-transform: translateY(0); }
  40% {
    -moz-transform: translateY(-30px); }
  60% {
    -moz-transform: translateY(-15px); } }
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0); }
  40% {
    -webkit-transform: translateY(-30px);
    -moz-transform: translateY(-30px);
    -ms-transform: translateY(-30px);
    -o-transform: translateY(-30px);
    transform: translateY(-30px); }
  60% {
    -webkit-transform: translateY(-15px);
    -moz-transform: translateY(-15px);
    -ms-transform: translateY(-15px);
    -o-transform: translateY(-15px);
    transform: translateY(-15px); } }


/* Button styling */
.close-button {
  background-color: #b2b2b2;
  color: #fff;
  border: solid rgb(151, 151, 151) 4px;
  box-shadow: 5px 5px 5px #505050b3;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  cursor: pointer;
}
</style>
