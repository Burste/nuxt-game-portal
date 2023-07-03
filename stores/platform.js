import { defineStore } from 'pinia';

export const usePlatformStore = defineStore('platform', {
    state: () => ({
        homeSwiperIndex: 0,
    }),
    actions: {
        onHomeSwiperChange(index) {
            this.homeSwiperIndex = index;
        },
    },
});
