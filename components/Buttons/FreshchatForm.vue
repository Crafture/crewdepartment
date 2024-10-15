<template>
    <div>
        <Button 
            :logo="freshchat" 
            styling="bg-gradient-to-b from-livecrowdblue via-sky-600 to-livecrowdturquoise text-white"
            svg-styling="text-white" 
            header-text="Contact via" 
            header-title="Live Chat" 
            footer-text="livecrowdnl"
            :on-click-action="openWidget" 
            :class="{ 'pointer-events-none grayscale opacity-60': disabled }" 
        />
        <UModal v-model="isOpen" prevent-close :ui="{ container: 'justify-center items-center' }">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-600' }">
                <template #header>
                    <div class="pb-2 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            We've Noticed You're Using an Ad Blocker
                        </h3>
                    </div>
                    <div class="py-2 mt-4">
                        <span>
                            Hi there! It looks like you're using an ad blocker. The ad blocker is unintentionally
                            blocking some of our site’s <span class="font-bold">essential JavaScript</span>, which is
                            necessary for
                            accessing all features. To ensure you can enjoy full functionality, we ask that you consider
                            disabling your ad blocker.
                        </span>
                        <UButton color="red" class="py-2 px-4 mt-4 " @click="isOpen = false">
                            <span class="text-white">
                                Continue Anyways
                            </span>
                        </UButton>
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<script setup>
import freshchat from '~/assets/img/freshchat.svg';
const { gtag } = useGtag();

const props = defineProps({
  disabled: {
    default: false
  }
})

const disabled = ref(props.disabled);
const isOpen = ref(false);

onBeforeMount(() => {
    // Load the pre-chat form script
    const preChatScript = document.createElement('script')
    preChatScript.src = '/js/landing/preform/fc-pre-chat-form-v2.min.js'
    document.body.appendChild(preChatScript)

    // Inject the pre-chat template configuration script
    const scriptElement = document.createElement('script')
    scriptElement.innerHTML = `
        var preChatTemplate = {
            mainbgColor: '#11024e',
            maintxColor: '#fff',
            heading: 'Livecrowd',
            textBanner: 'Om je zo snel mogelijk te kunnen helpen, hebben we enkele gegevens van jou nodig',
            SubmitLabel: 'Start Chat',
            fields: {
                field1: {
                    type: 'name',
                    label: 'Naam',
                    fieldId: 'name',
                    required: 'yes',
                    error: 'Gelieve een naam in te geven'
                },
                field2: {
                    type: 'email',
                    label: 'Email',
                    fieldId: 'email',
                    required: 'yes',
                    error: 'Gelieve een geldig e-mailadres in te geven'
                },
                field3: {
                    type: 'phone',
                    label: 'Telefoonnummer',
                    fieldId: 'phone',
                    required: 'yes',
                    error: 'Gelieve een geldig telefoonnummer in te geven'
                }
            }
        };

        window.fcSettings = {
            token: '75e8276a-8492-4cfc-859d-3ff100d5fa40',
            host: 'https://wchat.freshchat.com',
            config: {
                cssNames: {
                    widget: 'custom_fc_frame',
                    expanded: 'custom_fc_expanded'
                },
                headerProperty: {
                    hideChatButton: true,
                }
            },
            onInit: function () {
                console.log('widget init');
                fcPreChatform.fcWidgetInit(preChatTemplate);
            }
        };
    `
    document.body.appendChild(scriptElement)

    // Load the Freshchat widget script
    const widgetScript = document.createElement('script')
    widgetScript.src = '/js/landing/preform/widget.js'
    widgetScript.async = true
    document.body.appendChild(widgetScript)
})

function initClickEvent() {
  gtag(
    "event",
    "freshchatform_button_click", 
    {
        event_class: "Button",
        event_name: "freshchatform_button_click",
        value: 1,
    }
)};

const openWidget = () => {
	initClickEvent()
    if (window.fcWidget && !props.disabled) {
        window.fcWidget.open();
        window.fcWidget.show();
    }
};
</script>

<style>
/* TODO: dark mode disabled */
body {
  color-scheme: light; 
}
.fc-header {
    margin-bottom: 20px !important;
	height: 60px;
	font-size: 24px !important;
	font-weight: 550 !important;
	background-image: linear-gradient(to bottom right,#11024e, #2fbbc2);
	border-top-left-radius: 20px !important;
	letter-spacing: 0.6px;
	border-top-right-radius: 20px !important;
	box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.8) !important;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Segoe UI Emoji', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Cantarell', 'Helvetica Neue', sans-serif !important;
}
.chat-fc-form-outer {
	/* height: 500px; */
	border-radius: 20px !important;
	border-style: solid;
    border-width: 0.8px;
	box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.8) !important;

}
.chat-fc-form-outer div.fc-form ul li input {
	border-radius: 7px !important;

}
.chat-fc-form-outer div.fc-form p {
	margin-bottom: 50px !important;
	margin-top: 15px;
}
.fc-minimize {
	font-size: 20px;
	margin-top: 2px;
	margin-right: 10px !important;
}
.fc-button {
	margin-top: 50px !important;
	border-radius: 50px !important;
	border-style: solid;
	border-width: 0.8px;
	box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.8) !important;
	background-image: linear-gradient(to bottom right,#2fbbc2, #11024e);
}
.pre-fc-field {
	border-radius: 10px !important;
}
.pre-fc-field input {
	padding-left: 10px !important;
	padding-top: 10px !important;
	font-weight: 300;
	color: rgb(112, 112, 112);
}
.fc-form {
	border-radius: 20px;
	margin-bottom: 20px !important;
}
</style>