<script setup>
const featureSlides = [
    {
        image: '/img/img-feature-1_pc.png',
        imageMobile: '/img/img-feature-1_m.jpg',
        title: '',
    },
    {
        image: '/img/img-feature-2_pc.png',
        imageMobile: '/img/img-feature-2_m.jpg',
        title: '',
    },
    {
        image: '/img/img-feature-3_pc.png',
        imageMobile: '/img/img-feature-3_m.jpg',
        title: '',
    },
    {
        image: '/img/img-feature-4_pc.png',
        imageMobile: '/img/img-feature-4_m.jpg',
        title: '',
    },
    {
        image: '/img/img-feature-5_pc.png',
        imageMobile: '/img/img-feature-5_m.jpg',
        title: '',
    },
];

const carouselConfig = {
    slideWidth: 1008,
    slideHeight: 570,
    slideWidthMobile: 234,
    slideHeightMobile: 410,
    perspective: 1300,
    perspectiveMobile: 600,
    sideOffsetX: 608,
    sideOffsetXMobile: 130,
    sideOffsetZ: -400,
    sideOffsetZMobile: -220,
    sideOpacity: 0.5,
    speed: 500,
    autoplay: 3000,
    imageFit: 'contain',
    navSize: 84,
    navSizeMobile: 40,
    prevImage: '/img/btn-prev.png',
    prevImageHover: '/img/btn-prev-hover.png',
    nextImage: '/img/btn-next.png',
    nextImageHover: '/img/btn-next-hover.png',
};
</script>

<template>
    <div
        class="bg-portal-background-feature bg-cover bg-center bg-no-repeat w-full h-full flex items-center"
    >
        <CarouselSlider :items="featureSlides" :config="carouselConfig" />
    </div>
</template>
