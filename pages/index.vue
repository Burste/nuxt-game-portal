<script setup>
import { usePlatformStore } from '@/stores/platform';
import { storeToRefs } from 'pinia';
import AOS from 'aos';

const platformStore = usePlatformStore();
const { homeSwiperIndex } = storeToRefs(platformStore);
const { onHomeSwiperChange } = platformStore;

const containerRef = ref(null);
const swiper = useSwiper(containerRef, {
    initialSlide: platformStore.homeSwiperIndex,
    speed: 900,
    mousewheel: true,
    direction: 'vertical',
    slidesPerView: 1,
    on: {
        slideChange: (s) => {
            onHomeSwiperChange(s.realIndex);
        },
    },
});

watch(homeSwiperIndex, (newVal, oldVal) => {
    if (newVal !== oldVal) swiper.to(newVal);
});

onMounted(() => nextTick(() => AOS.refreshHard()));

useHead({
    title: 'Nuxt 3 遊戲官網',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
        {
            name: 'description',
            content: '哈利波特魔法覺醒 遊戲網站 build by Nuxt3',
        },
    ],
});
</script>

<template>
    <div class="w-full h-screen absolute top-0 left-0">
        <ClientOnly>
            <swiper-container ref="containerRef" :init="false" class="mySwiper">
                <swiper-slide>
                    <HomeSlidesFirstSlide />
                </swiper-slide>
                <swiper-slide>
                    <HomeSlidesSecondSlide />
                </swiper-slide>
                <swiper-slide>
                    <HomeSlidesThirdSlide />
                </swiper-slide>
            </swiper-container>
        </ClientOnly>
    </div>
</template>

<style lang="scss">
.mySwiper {
    width: 100%;
    height: 100%;
}

swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
