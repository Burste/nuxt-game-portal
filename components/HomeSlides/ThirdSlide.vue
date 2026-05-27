<script setup>
const FEATURE_SLIDES = [
    {
        imgM: '/img/img-feature-1_m.jpg',
        imgPC: '/img/img-feature-1_pc.png',
        alt: '',
    },
    {
        imgM: '/img/img-feature-2_m.jpg',
        imgPC: '/img/img-feature-2_pc.png',
        alt: '',
    },
    {
        imgM: '/img/img-feature-3_m.jpg',
        imgPC: '/img/img-feature-3_pc.png',
        alt: '',
    },
    {
        imgM: '/img/img-feature-4_m.jpg',
        imgPC: '/img/img-feature-4_pc.png',
        alt: '',
    },
    {
        imgM: '/img/img-feature-5_m.jpg',
        imgPC: '/img/img-feature-5_pc.png',
        alt: '',
    },
];

const featureRef = ref(null);
useSwiper(featureRef, {
    effect: 'coverflow',
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 45,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: true,
});
</script>

<template>
    <div
        class="flex items-center justify-center bg-portal-background-feature bg-cover bg-center bg-no-repeat w-full h-full"
    >
        <div class="flex">
            <swiper-container ref="featureRef" :init="false">
                <swiper-slide
                    v-for="(slide, index) in FEATURE_SLIDES"
                    :key="index"
                    class="bg-transparent relative w-61.25 max-w-61.25 min-h-107.5"
                >
                    <img
                        :src="slide.imgM"
                        :alt="slide.alt"
                        class="w-61.25 h-107.5"
                    />
                </swiper-slide>
            </swiper-container>
        </div>
    </div>
</template>
