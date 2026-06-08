<script setup>
import TopDownloadBar from '@/components/TopDownloadBar.vue';

const PRELOAD_ASSETS = [
    '/img/logo.png',
    '/img/slogan_m.png',
    '/img/slogan_pc.png',
    '/img/bg-map_pc.jpg',
    '/img/bg-map_m.png',
    '/img/bg-cloud-1.png',
    '/img/bg-cloud-2.png',
    '/img/bg-feature-spark.jpg',
    '/img/nav_active.png',
    '/img/img-other-tips.png',
    '/img/bg-download-bar.jpeg',
    '/img/bg-main-preview.jpg',
    '/img/room-astronomy_hover.png',
    '/img/room-astronomy_normal.png',
    '/img/room-gryffindor_hover.png',
    '/img/room-gryffindor_normal.png',
    '/img/room-hufflepuff_hover.png',
    '/img/room-hufflepuff_normal.png',
    '/img/room-ravenclaw_hover.png',
    '/img/room-ravenclaw_normal.png',
    '/img/room-slytherin_hover.png',
    '/img/room-slytherin_normal.png',
    '/img/room-hall_hover.png',
    '/img/room-hall_normal.png',
    '/img/room-potions_hover.png',
    '/img/room-potions_normal.png',
    '/img/room-headMaster_hover.png',
    '/img/room-headMaster_normal.png',
];

const nuxtApp = useNuxtApp();
const loading = ref(true);
const hideLoading = ref(false);
const pageFinished = ref(false);

const { progress, isComplete, load } = usePreloader(PRELOAD_ASSETS);

const { start: startHideTimer } = useTimeoutFn(() => {
    hideLoading.value = true;
}, 1000);

const tryFinish = () => {
    if (pageFinished.value && isComplete.value) {
        loading.value = false;
        startHideTimer();
    }
};

nuxtApp.hook('page:start', () => {
    loading.value = true;
    hideLoading.value = false;
    pageFinished.value = false;
});

nuxtApp.hook('page:finish', () => {
    pageFinished.value = true;
    tryFinish();
});

watch(isComplete, () => tryFinish());

onMounted(() => {
    load();
});
</script>

<template>
    <div class="h-screen">
        <div
            :class="[
                `fixed left-0 top-0 w-full z-50 bg-portal-color-brown h-full ${
                    loading ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-500 ease-in-out`,
                {
                    hidden: hideLoading,
                },
            ]"
        >
            <LoadingFrame :progress="progress" />
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
