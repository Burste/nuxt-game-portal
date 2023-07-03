<script setup>
import { usePlatformStore } from '@/stores/platform';
import { storeToRefs } from 'pinia';

const { bodyWidth, bodyHeight } = usePage();
const platformStore = usePlatformStore();
const { homeSwiperIndex } = storeToRefs(platformStore);
const { onHomeSwiperChange } = platformStore;
const navList = [
    { name: '官網首頁', key: 'home' },
    { name: '地圖', key: 'about' },
    { name: '特色魔咒', key: 'product' },
    { name: '夥伴介紹', key: 'contact' },
];

const MUSIC_STATUS = {
    MUTE: 0,
    PLAY: 1,
};

const MUSIC_STATUS_IMG = {
    [MUSIC_STATUS.MUTE]: '/img/music_play.png',
    [MUSIC_STATUS.PLAY]: '/img/music_mute.png',
};
const BASE_WIDTH = bodyWidth < 768 ? 80 : 100;
const BASE_PADDING = bodyWidth < 768 ? 20 : 36;
const transformPosition = (index) => {
    return `translateX(calc(${BASE_WIDTH * index}% + ${
        index * BASE_PADDING
    }px))`;
};
</script>

<template>
    <div
        class="hidden md:flex fixed top-0 z-10 items-center justify-center mx-auto w-full p-5 backdrop-blur-sm"
        data-aos="fade-down"
        data-aos-delay="300"
    >
        <!-- TopHeader官網首頁地圖遊戲特色魔咒＆夥伴介紹官方精選福利兌換儲值中心 -->
        <div class="flex gap-5 md:gap-9 relative">
            <div
                v-for="(item, idx) in navList"
                :key="item.key"
                :class="[
                    'flex items-center justify-center w-20 relative cursor-pointer text-sm md:text-base',
                    {
                        '!text-portal-color-brown': homeSwiperIndex === 1,
                        'text-portal-color-gold font-bold':
                            Number(idx) === Number(homeSwiperIndex),
                    },
                ]"
                @click="() => onHomeSwiperChange(idx)"
            >
                {{ item.name }}
            </div>
            <img
                src="/img/nav_active.png"
                alt=""
                class="h-4 w-20 absolute -bottom-5 duration-300"
                :style="{
                    transform: transformPosition(homeSwiperIndex),
                }"
            />

            <img
                src="/img/nav_active.png"
                alt=""
                class="h-4 w-20 absolute -bottom-5 duration-300"
                :style="{
                    transform: transformPosition(homeSwiperIndex),
                }"
            />
        </div>
    </div>
</template>

<style scoped></style>
