import { defineStore } from 'pinia';

export const usePlatformStore = defineStore('platform', {
    state: () => ({
        homeSwiperIndex: 0,
        bgMusicStatus: false,
        appDownloadWidgetStatus: true,
    }),
    actions: {
        onHomeSwiperChange(index) {
            this.homeSwiperIndex = index;
        },
        toggleBackgroundMusic() {
            this.bgMusicStatus = !this.bgMusicStatus;
        },
        toggleAppWidget() {
            this.appDownloadWidgetStatus = !this.appDownloadWidgetStatus;
        },
    },
});
