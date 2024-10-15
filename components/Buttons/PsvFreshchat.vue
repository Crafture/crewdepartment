<template>
    <div>
        <PsvButton :logo="freshchat" heading="test"
            styling="bg-gradient-to-b from-livecrowdblue via-sky-600 to-livecrowdturquoise text-white"
            svg-styling="text-white" header-text="Contact via" header-title="Live Chat" footer-text="livecrowdnl"
            :on-click-action="openWidget" :class="{ 'pointer-events-none grayscale opacity-60': disabled }" />
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
import { _disabled } from '#tailwind-config/theme/aria';
import freshchat from '~/assets/img/freshchat.svg'
const isOpen = ref(false);

const props = defineProps({
    faqTagsList: {
        type: Array,
        default: () => []
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const disabled = ref(props.disabled);

const initializeWidget = () => {
    window.fcWidget.init({
        token: "75e8276a-8492-4cfc-859d-3ff100d5fa40",
        host: 'https://wchat.freshchat.com',
        tags: props.topicTagsList,
        faqTags: {
            tags: props.faqTagsList,
            filterType: 'category'
        },
        config: {
            content: {
                headers: {
                    chat: 'Livecrowd is here to help!',
                    chat_help: 'How can we help?',
                },
            },
            headerProperty: {
                hideChatButton: true,
            }
        },
    });
};

const loadScript = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://wchat.freshchat.com/js/widget.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

onMounted(async () => {
    try {
        await loadScript();
        if (window.fcWidget) {
            initializeWidget();
        } else {
            isOpen.value = true;
            disabled.value = true;
        }
    } catch (error) {
        console.error('Failed to load Freshchat script:', error);
        isOpen.value = true;
        disabled.value = true;
    }
});

const openWidget = () => {
    if (window.fcWidget && !props.disabled) {
        window.fcWidget.open();
        window.fcWidget.show();
    }
};
</script>
