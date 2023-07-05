<script setup>
import { usePlatformStore } from '@/stores/platform';
import { storeToRefs } from 'pinia';

const refVideoMobile = ref(null);
const { bgMusicStatus } = storeToRefs(usePlatformStore());

const DOWNLOAD_TYPE = {
    PC: {
        name: 'Dowload PC',
        img: '/img/download_pc.png',
    },
    IOS: {
        name: 'Dowload IOS',
        img: '/img/download_ios.png',
    },
    ANDROID: {
        name: 'Dowload Android',
        img: '/img/download_android.png',
    },
    QRCODE: {
        name: 'Scan QRCODE',
        img: '/img/download_qrCode.png',
    },
};

const SOCIAL_LINK = [
    {
        title: 'youtube',
        img: '/img/ic-youtube.png',
    },
    {
        title: 'facebook',
        img: '/img/ic-facebook.png',
    },
    {
        title: 'discord',
        img: '/img/ic-discord.png',
    },
];

const COMMON_LINK = [
    {
        title: 'gift',
        img: '/img/img-exchange.png',
    },
    {
        title: 'pay',
        img: '/img/img-pay.png',
    },
];
</script>
<template>
    <div class="flex items-center justify-center relative w-full h-full">
        <video
            ref="refVideoMobile"
            src="/video/bg-video_m.mp4"
            autoplay
            loop
            preload
            playsinline
            muted
            class="absolute object-center w-full h-full object-cover"
        />
        <video
            src="https://nie.v.netease.com/nie/2021/0602/f0ea772b84cd7c2b84e1af116d410276.mp4"
            autoplay
            loop
            :muted="bgMusicStatus ? 'false' : 'true'"
            class="hidden md:flex absolute object-center w-full h-full object-cover"
        />

        <div
            class="absolute w-full h-[120px] z-[1] flex justify-center items-center top-24 md:top-20 lg:justify-start px-10 2xl:px-20"
            data-aos="fade-down"
            data-aos-delay="700"
        >
            <img
                src="/img/logo.png"
                alt=""
                class="flex max-h-[120px] md:h-[100px]"
            />
        </div>
        <div
            class="flex justify-center items-end z-[1] absolute bottom-[33%] md:bottom-[13%] lg:bottom-[25%]"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="1000"
            data-aos-once="false"
        >
            <div
                class="flex flex-col justify-end md:justify-center gap-6 w-full"
            >
                <div
                    class="flex h-[140px] min-w-[260px] w-full bg-contain bg-center bg-portal-slogan-m md:bg-portal-slogan-pc bg-no-repeat"
                />

                <div class="flex items-center gap-10 justify-between">
                    <img
                        v-for="item in COMMON_LINK"
                        :key="item.title"
                        :src="item.img"
                        :alt="item.title"
                        class="h-8 cursor-pointer"
                    />
                </div>
                <div
                    class="h-full max-h-[105px] hidden md:flex md:flex-row md:justify-between px-12 gap-6"
                >
                    <img
                        :src="DOWNLOAD_TYPE.PC.img"
                        :alt="DOWNLOAD_TYPE.PC.name"
                        class="flex z-[1] w-[105px]"
                    />
                    <div class="qrCode flex items-center justify-center">
                        <img
                            :src="DOWNLOAD_TYPE.QRCODE.img"
                            :alt="DOWNLOAD_TYPE.QRCODE.name"
                            class="flex z-[1] w-[105px]"
                        />
                    </div>
                    <div class="flex flex-col gap-4">
                        <img
                            :src="DOWNLOAD_TYPE.IOS.img"
                            :alt="DOWNLOAD_TYPE.IOS.name"
                            class="flex z-[1]"
                        />
                        <img
                            :src="DOWNLOAD_TYPE.ANDROID.img"
                            :alt="DOWNLOAD_TYPE.ANDROID.name"
                            class="flex z-[1]"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div
            class="flex absolute right-0"
            data-aos="fade-left"
            data-aos-delay="1200"
        >
            <div class="flex flex-col gap-2">
                <img
                    v-for="item in SOCIAL_LINK"
                    :key="item.title"
                    :src="item.img"
                    :alt="item.title"
                    class="w-8 cursor-pointer"
                />
            </div>
        </div>
    </div>
</template>
