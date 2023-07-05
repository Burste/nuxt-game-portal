<script setup>
import { usePlatformStore } from '@/stores/platform';
import { storeToRefs } from 'pinia';
import { useWindowSize } from '@vueuse/core';

const { width, height } = useWindowSize();
const { bgMusicStatus, homeSwiperIndex } = storeToRefs(usePlatformStore());
const { onHomeSwiperChange, toggleBackgroundMusic } = usePlatformStore();

const navList = [
    { name: '官網首頁', key: 'home' },
    { name: '地圖', key: 'about' },
    { name: '遊戲特色', key: 'feature' },
    // { name: '夥伴介紹', key: 'contact' },
    {
        name: '福利兌換',
        key: 'gift',
        link: 'https://www.harrypottermagicawakened.tw/giftgrab/',
    },
    { name: '儲值中心', key: 'pay', link: 'https://www.hpmapay.com/' },
];

const MUSIC_STATUS_IMG = {
    PLAY: '/img/music_on.png',
    MUTE: '/img/music_mute.png',
};

const BASE_WIDTH = width < 768 ? 80 : 100;
const BASE_PADDING = width < 768 ? 20 : 36;
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
        <div class="flex gap-5 md:gap-9 relative justify-center items-center">
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
                @click="
                    () => {
                        if (item.link) return;
                        onHomeSwiperChange(idx);
                    }
                "
            >
                {{ item.name }}
            </div>

            <img
                src="/img/nav_active.png"
                alt=""
                class="h-4 w-20 absolute -bottom-5 duration-300 z-10 left-0"
                :style="{
                    transform: transformPosition(homeSwiperIndex),
                }"
            />
        </div>
        <!-- <img
            :src="bgMusicStatus ? MUSIC_STATUS_IMG.MUTE : MUSIC_STATUS_IMG.PLAY"
            alt=""
            class="w-8 h-8 absolute right-4 cursor-pointer"
            @click="() => toggleBackgroundMusic()"
        /> -->
    </div>
</template>

<style scoped></style>
