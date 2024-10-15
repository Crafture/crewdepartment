<template>
    <div>
        <span v-for="item in newMessage" :key="item" v-html="item"></span>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    message: String,
});

const regexSqr = new RegExp('\\[(.*?)\\]', 'gm');
const regexDollar = /\$[^$]*\$/g;
const regexParenthesis = /\(([^)]+)\)/gm;
const messageSplitted = props.message.split('^');
const newMessage = ref([]);

for (let i = 0; i < messageSplitted.length; i++) {
    let element = messageSplitted[i];

    if (element.match(regexDollar)) {
        if (element.match(regexSqr)) {
            const link = element.match(regexParenthesis)[0].slice(1, -1);
            element =
                '<a class="text-blue-500" href="' +
                link +
                '" target="_blank">' +
                element.match(regexSqr)[0].slice(1, -1) +
                '</a>';
        }
    } else {
        element = '<a>' + element + '</a>';
    }
    newMessage.value.push(element);
}
</script>
