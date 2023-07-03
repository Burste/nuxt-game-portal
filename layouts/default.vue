<script setup>
import TopDownloadBar from '@/components/TopDownloadBar.vue';

const nuxtApp = useNuxtApp();
const loading = ref(true);

const hideLoading = ref(false);

const { start } = useTimeoutFn(() => {
    hideLoading.value = true;
}, 500);

nuxtApp.hook('page:start', () => {
    loading.value = true;
});
nuxtApp.hook('page:finish', () => {
    loading.value = false;
    start();
});
</script>

<template>
    <div class="h-screen">
        <div
            :class="[
                `fixed left-0 top-0 w-full z-50 bg-portal-color-brown h-full ${
                    loading ? 'opacity-1' : 'opacity-0'
                } transition-opacity duration-500 ease-in-out`,
                {
                    hidden: hideLoading,
                },
            ]"
        >
            <LoadingFrame />
        </div>
        <div class="">
            <top-download-bar />
            <TopHeader />
            <!-- <NuxtLoadingIndicator /> -->
            <slot />
            <!-- <BottomNav /> -->
        </div>
    </div>
</template>

<style>
@keyframes rotateLeftWing {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(-10deg);
    }
    100% {
        transform: rotate(0deg);
    }
}
@keyframes rotateRightWing {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(5deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

#leftwing {
    animation: rotateLeftWing 0.12s linear infinite;
    transform-origin: right;
}
#rightwing {
    animation: rotateRightWing 0.12s linear infinite;
    transform-origin: left;
}
</style>
