<template>
    <div class="">
        <span
            class="absolute flex items-center justify-center w-2 h-2 bg-blue-200 rounded-full -left-1 ring-4 ring-white dark:ring-gray-900 dark:bg-blue-900"
            :class="{ 'bg-red-500': message.alert }">

        </span>

        <VerifiedAccount v-if="message.verified_message_account" :verified_message_account="message.verified_message_account">
            <span
                v-if="isLatest"
                class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                Latest
            </span>
        </VerifiedAccount>
        <h3 v-else class="flex items-center mb-1 text-lg font-semibold text-gray-200 dark:text-white">{{ message.title }}<span
                v-if="isLatest"
                class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">Latest</span>
        </h3>
        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-200">Posted on
            {{ messageDate }} - {{ messageTime }}</time>
        <p class="mb-4 text-base font-normal text-gray-200 dark:text-gray-400">
            <ParsedMessage :message="message.message" />
        </p>
        <Interactions :message="message" />
    </div>
</template>

<script setup lang="ts">
import ParsedMessage from './ParsedMessage.vue';
import Interactions from './Interactions.vue';
import VerifiedAccount from './VerifiedAccount.vue';

const props = defineProps<{
    message: Message,
    isLatest: Boolean
}>()

function formatDate(dateString: any) {
    const dateTime = new Date(dateString);

    const minutesInteger = dateTime.getMinutes();
    let minutesString;
    if (minutesInteger < 10) {
        minutesString = `0${minutesInteger}`;
    } else {
        minutesString = `${minutesInteger}`;
    }

    return [
        `${dateTime.toLocaleDateString('en-us', {
            day: 'numeric',
            month: 'short',
        })}`,
        `${dateTime.getHours()}:${minutesString}`,
    ];
}

const messageDatetime = formatDate(props.message['updated_at']);
const messageDate = messageDatetime[0];
const messageTime = messageDatetime[1];
</script>