<template>
    <div v-show="!isLoading && messages.length > 0" class="rounded-lg w-full h-full bg-black bg-opacity-60 text-white px-8 pt-8">
        <div class="mb-4 border-gray-200 flex items-center justify-between">
            <div class="live_pulsating_text">LIVE</div>
            <div class="last_update">
                Last update: {{ messageDate }} - {{ messageTime }}
            </div>
        </div>
        <ol class="relative border-l border-t pt-8 border-gray-400">
            <li v-for="(message, idx) in messages.slice(0, displayedMessagesCount)" :key="message.id" class="mb-10 ml-6">
                <Post :message="message" :isLatest="idx === 0" />
            </li>

        </ol>
        <div class="mb-8 flex justify-center">
            <button v-if="messages.length > 3" @click="toggleMessagesDisplay">
                <p v-if="displayedMessagesCount <= 3">Show all messages</p>
                <p v-else>Hide messages</p>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Post from './Post.vue';
import { useLoading } from '~/composables/useLoading';

let interval: number | undefined;
const config = useRuntimeConfig();
const baseUrl = config.public.BACKEND_BASE_URL;
const messageDate = ref<string>("");
const messageTime = ref<string>("");
const messages = ref<Message[]>([]);
const displayedMessagesCount = ref(3);

const { startLoading, stopLoading } = useLoading()
const { isLoading } = useLoading()

const props = defineProps({
    event_name: String,
})

function toggleMessagesDisplay() {
    if (displayedMessagesCount.value > 3) {
        displayedMessagesCount.value = 3;
    } else {
        displayedMessagesCount.value = messages.value.length;
    }
}

function formatDate(dateString) {
    const dateTime = new Date(dateString);

    const minutesInteger = dateTime.getMinutes();
    let minutesString;
    if (minutesInteger < 10) {
        minutesString = `0${minutesInteger}`;
    } else {
        minutesString = `${minutesInteger}`;
    }

    return [
        `${dateTime.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
        })}`,
        `${dateTime.getHours()}:${minutesString}`,
    ];
}

async function fetchMessages() {
    try {
        const response = await fetch(`${baseUrl}/messages/${props.event_name}`, {
            method: 'GET',
        });

        messages.value = await response.json();

        // Extract the date and time from the first message after checking if there's at least one message
        if (messages.value.length > 0) {
            const firstMessage = messages.value[0];
            const messageDatetime = formatDate(firstMessage['updated_at']);
            messageDate.value = messageDatetime[0];
            messageTime.value = messageDatetime[1];
        }

        return messages.value;
    } catch (error) {
        console.error(error);
    }
}

onMounted(async () => {
    startLoading()
    await fetchMessages();
    interval = setInterval(fetchMessages, 5000);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    // await delay(10000)
    stopLoading()
});

onBeforeUnmount(() => {
    clearInterval(interval);
});
</script>