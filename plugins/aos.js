import { defineNuxtPlugin } from '#app';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { nextTick } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:finish', () => {
        if (typeof window !== 'undefined') {
            nextTick(() => {
                nuxtApp.AOS = AOS.init({ once: false, duration: 400 });
            });
        }
    });
});
