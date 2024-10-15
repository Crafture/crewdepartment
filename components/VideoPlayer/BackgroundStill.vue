<template>
    <div class="fixed mt-0 lg:mt-96 !bg-black">
      <img class="p-8" :src="fallback"/>
  </div>
  </template>
  


<script setup>

const props = defineProps({
    background_url: String,
    fallback: {
        type: String,
        default: '/images/fallback.jpg'
    }
});

</script>
