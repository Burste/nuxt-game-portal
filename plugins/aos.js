import { defineNuxtPlugin } from '#app';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:finish', () => {
        if (typeof window !== 'undefined') {
            nuxtApp.AOS = AOS.init({
                once: false,
                duration: 400, // values from 0 to 3000, with step 50ms
            });
        }
    });
});
