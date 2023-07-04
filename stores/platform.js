import { defineStore } from 'pinia';

export const usePlatformStore = defineStore('platform', {
    state: () => ({
        homeSwiperIndex: 0,
        bgMusicStatus: false,
    }),
    actions: {
        onHomeSwiperChange(index) {
            this.homeSwiperIndex = index;
        },
        toggleBackgroundMusic() {
            console.log('toggleBackgroundMusic', this.bgMusicStatus);
            this.bgMusicStatus = !this.bgMusicStatus;
        },
    },
});
