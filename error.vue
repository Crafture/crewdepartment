<template>
    <div class="flex h-screen w-screen justify-center items-center relative cursor-none flex-grow">
        <canvas ref="riveCanvas" class="rive-canvas"></canvas>
        <div id="custom-cursor" :style="{ left: `${cursorX}px`, top: `${cursorY}px` }">
            <img src="/images/cursor.gif" alt="Custom Cursor" class="h-60 hidden sm:inline" />
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import * as rive from "@rive-app/canvas";

const riveCanvas = ref(null);
const cursorX = ref(0);
const cursorY = ref(0);
const error = ref("")

onMounted(() => {
    error.value = useError().value
    console.log("error: ", error.value)
    if (rive && riveCanvas.value) {
        const dpr = window.devicePixelRatio || 1;
        riveCanvas.value.width = riveCanvas.value.offsetWidth * dpr;
        riveCanvas.value.height = riveCanvas.value.offsetHeight * dpr;

        new rive.Rive({
            src: '/rive/404_.riv',
            canvas: riveCanvas.value,
            autoplay: true,
            fit: rive.Fit.contain,
        });
    }

    // Add the mousemove listener
    document.addEventListener('mousemove', (e) => {
        const cursorWidth = 240;  // Half the actual width of the custom cursor image. Adjust this value according to your image size.
        const cursorHeight = 120; // Half the actual height of the custom cursor image. Adjust this value according to your image size.

        cursorX.value = Math.min(window.innerWidth - cursorWidth, Math.max(cursorWidth, e.clientX));
        cursorY.value = Math.min(window.innerHeight - cursorHeight, Math.max(cursorHeight, e.clientY));
    });


    document.addEventListener('mouseleave', () => {
        cursorX.value = -100; // Move it out of view
        cursorY.value = -100; // Move it out of view
    });
});

</script>

<style scoped>
.rive-canvas {
    width: 1200px;
    height: 800px;
    z-index: 1;
}

#custom-cursor {
    position: absolute;
    z-index: 0;
    pointer-events: none;
    transform: translate(-50%, -50%);
}


body {
    cursor: none;
}

@media (max-width: 640px) {
    .rive-canvas {
        width: 100%;
    }
}
</style>

