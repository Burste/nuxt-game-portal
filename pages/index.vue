<script setup>
// Import Swiper Vue.js components
import { usePlatformStore } from '@/stores/platform';
import FirstSlide from '@/components/HomeSlides/FirstSlide';
import SecondSlide from '@/components/HomeSlides/SecondSlide';
import ThirdSlide from '@/components/HomeSlides/ThirdSlide';
import { Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { storeToRefs } from 'pinia';

const modules = [Mousewheel, Pagination];

const refSwiper = ref(null);
const platformStore = usePlatformStore();
const { homeSwiperIndex } = storeToRefs(platformStore);
const { onHomeSwiperChange } = platformStore;

const onSwiper = (swiper) => {
    refSwiper.value = swiper;
};
const goToSlide = (position) => {
    refSwiper.value?.slideTo(position);
};

// 滑動事件
const onSlideChange = (param) => {
    const { activeIndex } = param;
    onHomeSwiperChange(activeIndex);
};

// 更新
watch(homeSwiperIndex, (newVal, oldVal) => {
    if (newVal !== oldVal) goToSlide(newVal);
});

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
    <div class="w-full h-[100vh] relative">
        <swiper
            class="mySwiper"
            :initialSlide="platformStore.homeSwiperIndex"
            :speed="900"
            :mousewheel="true"
            :direction="'vertical'"
            :modules="modules"
            :slidesPerView="1"
            @activeIndexChange="onSlideChange"
            @swiper="onSwiper"
        >
            <swiper-slide>
                <first-slide />
            </swiper-slide>
            <swiper-slide>
                <second-slide />
            </swiper-slide>
            <swiper-slide>
                <third-slide />
            </swiper-slide>
        </swiper>
    </div>
</template>

<style lang="scss" scoped>
.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
}
/* .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
} */
</style>
