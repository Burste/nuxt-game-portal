// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    srcDir: '.',
    css: ['@/assets/style/main.css'],
    devtools: { enabled: true },
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@vueuse/motion/nuxt',
        'nuxt-swiper',
    ],
    build: {
        transpile: ['gsap'],
    },
    postcss: {
        plugins: {
            '@tailwindcss/postcss': {},
        },
    },
    plugins: [{ src: '@/plugins/aos', mode: 'client' }],
    runtimeConfig: {
        public: {
            motion: {
                directives: {
                    'pop-bottom': {
                        initial: {
                            scale: 0,
                            opacity: 0,
                            y: 100,
                        },
                        visible: {
                            scale: 1,
                            opacity: 1,
                            y: 0,
                        },
                    },
                },
            },
        },
    },
});
