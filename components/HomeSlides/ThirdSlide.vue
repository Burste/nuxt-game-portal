<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import SwiperCore, {
    Keyboard,
    Mousewheel,
    Navigation,
    Pagination,
} from 'swiper';

const modules = [Mousewheel, Navigation, Pagination, Keyboard];
SwiperCore.use(modules);
const { bodyWidth } = usePage();
const refFeatureSwiper = ref(null);
const onSwiper = (swiper) => {
    refFeatureSwiper.value = swiper;
};
// const goToSlide = (position) => {
//     refFeatureSwiper.value?.slideTo(position);
// };

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
</script>
<template>
    <div
        class="flex items-center justify-center bg-portal-background-feature bg-cover bg-center bg-no-repeat w-full h-full"
    >
        <div class="flex">
            <swiper
                class="mySwiper"
                :effect="'coverflow'"
                :grabCursor="true"
                :centeredSlides="true"
                :slidesPerView="'auto'"
                :coverflowEffect="{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }"
                :pagination="true"
                :spaceBetween="30"
                @swiper="onSwiper"
            >
                <swiper-slide
                    v-for="(slide, index) in FEATURE_SLIDES"
                    :key="index"
                    class="bg-transparent relative gallery-slide w-[245px] max-w-[245px] min-h-[430px]"
                >
                    <div
                        src="/img/img-feature-frame_m.png"
                        alt=""
                        class="absolute top-0 left-0 z-1 lg:hidden w-[245px] min-h-[430px]"
                    />
                    <img
                        :src="slide.imgM"
                        :alt="slide.alt"
                        class="w-[245px] h-[430px]"
                    />
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<style lang="scss" scoped>
// .swiper-slide {
//     text-align: center;
//     font-size: 18px;
//     background: transparent;

//     /* Center slide text vertically */
//     display: -webkit-box;
//     display: -ms-flexbox;
//     display: -webkit-flex;
//     display: flex;
//     -webkit-box-pack: center;
//     -ms-flex-pack: center;
//     -webkit-justify-content: center;
//     justify-content: center;
//     -webkit-box-align: center;
//     -ms-flex-align: center;
//     -webkit-align-items: center;
//     align-items: center;
//     transition: 300ms;
//     transform: scale(0.8);
// }
// .swiper-slide-active,
// .swiper-slide-duplicate-active {
//     transform: scale(1);
//     z-index: 10;
// }
// .gallery-slide {
//     &:before {
//         position: absolute;
//         width: 100%;
//         height: 100%;
//         content: url('/img/img-feature-frame_m.png');
//         left: 0;
//         right: 0;
//         min-width: 200px;
//     }
// }
// .swiper-slide {
//     position: relative;
//     z-index: 0;
//     background: transparent;
//     &:not(.swiper-slide-active) {
//         transform: scale(0.8);
//     }
// }
// .swiper-slide-active {
//     z-index: 1;
//     // transform: scale(1.1);
//     img {
//         width: 1000px;
//         height: 570px;
//         left: -30%;
//         position: absolute;
//     }
// }
</style>
