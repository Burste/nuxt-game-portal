<script setup>
// Import Swiper Vue.js components
import { usePlatformStore } from '@/stores/platform';
import FirstSlide from '@/components/HomeSlides/FirstSlide';
import SecondSlide from '@/components/HomeSlides/SecondSlide';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, {
    Keyboard,
    Mousewheel,
    Navigation,
    Pagination,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { storeToRefs } from 'pinia';

const modules = [Mousewheel, Pagination, Keyboard];
SwiperCore.use(modules);

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
</script>
<template>
    <div class="w-full h-[100vh] relative">
        <swiper
            :initialSlide="platformStore.homeSwiperIndex"
            class="mySwiper"
            :speed="700"
            :mousewheel="true"
            :direction="'vertical'"
            :modules="modules"
            :pagination="{
                clickable: true,
            }"
            :slidesPerView="1"
            @activeIndexChange="onSlideChange"
            @swiper="onSwiper"
        >
            <swiper-slide>
                <first-slide />
            </swiper-slide>
            <swiper-slide> <second-slide /></swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 4</swiper-slide>
        </swiper>
    </div>
</template>

<style lang="scss">
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
.swiper-pagination {
    display: none;
}
/* .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
} */

@keyframes roomFlow {
    0% {
        -o-transform: translateY(-10px);
        -webkit-transform: translateY(-10px);
        -moz-transform: translateY(-10px);
        -ms-transform: translateY(-10px);
        transform: translateY(-10px);
    }

    50% {
        -o-transform: translateY(10px);
        -webkit-transform: translateY(10px);
        -moz-transform: translateY(10px);
        -ms-transform: translateY(10px);
        transform: translateY(10px);
    }

    100% {
        -o-transform: translateY(-10px);
        -webkit-transform: translateY(-10px);
        -moz-transform: translateY(-10px);
        -ms-transform: translateY(-10px);
        transform: translateY(-10px);
    }
}

@keyframes roomFlowDown {
    0% {
        -o-transform: translateY(10px);
        -webkit-transform: translateY(10px);
        -moz-transform: translateY(10px);
        -ms-transform: translateY(10px);
        transform: translateY(10px);
    }

    50% {
        -o-transform: translateY(-10px);
        -webkit-transform: translateY(-10px);
        -moz-transform: translateY(-10px);
        -ms-transform: translateY(-10px);
        transform: translateY(-10px);
    }

    100% {
        -o-transform: translateY(10px);
        -webkit-transform: translateY(10px);
        -moz-transform: translateY(10px);
        -ms-transform: translateY(10px);
        transform: translateY(10px);
    }
}
.room {
    width: 187px;
    transition: all 0.6s ease-in-out;
    animation: roomFlow 10s linear infinite;
    &:nth-child(2n-1) {
        animation: roomFlowDown 10s linear infinite;
    }
    &-headMaster {
        margin: -340px 0 0 -220px;
        background-image: url('/img/room-headMaster_normal.png');
        &:hover {
            margin: -360px 0 0 -220px;
            background-image: url('/img/room-headMaster_hover.png');
        }
    }

    &-ravenclaw {
        margin: -220px 0 0 18px;
        background-image: url('/img/room-ravenclaw_normal.png');
        &:hover {
            margin: -240px 0 0 18px;
            background-image: url('/img/room-ravenclaw_hover.png');
        }
    }

    &-gryffindor {
        margin: -106px 0 0 -130px;
        background-image: url('/img/room-gryffindor_normal.png');
        &:hover {
            margin: -126px 0 0 -130px;
            background-image: url('/img/room-gryffindor_hover.png');
        }
    }
    &-potions {
        margin: 55px 0 0 -170px;
        background-image: url('/img/room-potions_normal.png');
        &:hover {
            margin: 35px 0 0 -170px;
            background-image: url('/img/room-potions_hover.png');
        }
    }
    &-astronomy {
        margin: 9px 0 0 76px;
        background-image: url('/img/room-astronomy_normal.png');
        &:hover {
            margin: -11px 0 0 76px;
            background-image: url('/img/room-astronomy_hover.png');
        }
    }

    &-hall {
        margin: 52px 0 0 -400px;
        background-image: url('/img/room-hall_normal.png');
        &:hover {
            margin: 32px 0 0 -400px;
            background-image: url('/img/room-hall_hover.png');
        }
    }
    &-slytherin {
        margin: 210px 0 0 -207px;
        background-image: url('/img/room-slytherin_normal.png');
        &:hover {
            margin: 190px 0 0 -207px;
            background-image: url('/img/room-slytherin_hover.png');
        }
    }
    &-hufflepuff {
        margin: 220px 0 0 -471px;
        background-image: url('/img/room-hufflepuff_normal.png');
        &:hover {
            margin: 200px 0 0 -471px;
            background-image: url('/img/room-hufflepuff_hover.png');
        }
    }
}
</style>
