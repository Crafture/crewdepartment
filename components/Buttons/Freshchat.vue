<template>
    <Button :logo="freshchat" heading="test"
        styling="bg-gradient-to-b from-livecrowdblue via-sky-600 to-livecrowdturquoise text-white" svg-styling="text-white"
        header-text="Contact via" header-title="Live Chat" footer-text="livecrowdnl" :on-click-action="openWidget" />
</template>

<script setup>
import freshchat from '~/assets/img/freshchat.svg'

const props = defineProps({
    faqTagsList: {
        type: Array,
        default: () => []
    }
});

onMounted(() => {
    window.fcWidget.init({
        token: "75e8276a-8492-4cfc-859d-3ff100d5fa40",
        host: 'https://wchat.freshchat.com',
        faqTags:
        {
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
})

const openWidget = () => {
    if (window.fcWidget) {
        window.fcWidget.open();
        window.fcWidget.show();
    }
};
</script>
