<template>
    <div class="flex mt-2">
        <div class="mr-2 flex justify-center items-center">
            <button @click="handleLike" :class="['like__block-thumbsup', isLiked ? 'like__block-thumbsup-green' : '']">
            </button>
            <p class="ml-1">
                {{ likesCount }}
            </p>
        </div>

        <div class="flex justify-center items-center">
            <button @click="handleDislike"
                :class="['like__block-thumbsdown', isDisliked ? 'like__block-thumbsdown-red' : '']">
            </button>
            <p class="ml-1">
                {{ dislikesCount }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import messageService from '~/server/utils/utils.js';

const props = defineProps({
    message: Object,
});


const likesCount = ref(props.message.likes);
const dislikesCount = ref(props.message.dislikes);
const isLiked = ref(false);
const isDisliked = ref(false);
const config = useRuntimeConfig();
const baseUrl = config.public.BACKEND_BASE_URL;

watch(() => props.message, (newMessage) => {
    likesCount.value = newMessage.likes;
    dislikesCount.value = newMessage.dislikes;
}, { immediate: true });

const handleLike = async () => {
    try {
        // If it was previously disliked, handle the dislike toggle first
        if (isDisliked.value) {
            await handleDislike();
        }

        const response = await messageService.like(baseUrl, props.message.id, isLiked.value);

        if (response.status === "succes") {
            isLiked.value = !isLiked.value;
            likesCount.value = response.likes;
        }
    } catch (error) {
        console.error("Error liking the message:", error);
    }
};

const handleDislike = async () => {
    try {
        // If it was previously liked, handle the like toggle first
        if (isLiked.value) {
            watch(() => props.message, (newMessage) => {
                likesCount.value = newMessage.likes;
                dislikesCount.value = newMessage.dislikes;
            }, { immediate: true });
            await handleLike();
        }

        const response = await messageService.dislike(baseUrl, props.message.id, isDisliked.value);

        if (response.status === "succes") {
            isDisliked.value = !isDisliked.value;
            dislikesCount.value = response.dislikes;
        }
    } catch (error) {
        console.error("Error disliking the message:", error);
    }
};
</script>


<style>
.like-btn,
.dislike-btn {
    padding: 5px 10px;
    margin-right: 5px;
    cursor: pointer;
    border: none;
    border-radius: 3px;
    background-color: #f5f5f5;
    transition: background-color 0.3s;
}

.liked {
    background-color: #c8e6c9;
    /* A shade of green to indicate like */
}

.disliked {
    background-color: #ffcdd2;
    /* A shade of red to indicate dislike */
}
</style>
