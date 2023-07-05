<script setup>
import { usePlatformStore } from '@/stores/platform';
import { storeToRefs } from 'pinia';

const platformStore = usePlatformStore();
const { appDownloadWidgetStatus } = storeToRefs(platformStore);
const { toggleAppWidget } = platformStore;
</script>
<template>
    <div
        :class="[
            'flex md:hidden fixed top-0 left-0 w-full z-10 justify-between items-center px-4 py-3 bg-portal-background-app-bar bg-cover bg-center',
            {
                hidden: !appDownloadWidgetStatus,
            },
        ]"
    >
        <!-- <img src="img/img-download.png" alt="Download" class="h-8" /> -->

        <div class="flex gap-3 items-center justify-start relative">
            <div
                class="flex h-full min-h-[48px] items-center justify-center cursor-pointer"
                @click="toggleAppWidget"
            >
                <img src="/img/ic-close.svg" alt="game" class="w-5 h-5" />
            </div>
            <img src="/img/icon-game.png" alt="game" class="w-12 h-12" />
            <div class="flex flex-col justify-center text-portal-color-brown">
                <h2 class="text-sm font-bold">哈利波特：魔法覺醒</h2>
                <p class="text-xs">魔法世界遊戲大作</p>
            </div>
        </div>
        <div class="flex">
            <img src="/img/img-download.png" alt="Download" class="h-8" />
        </div>
    </div>
</template>
