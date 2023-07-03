// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['@/assets/style/main.scss'],
    devtools: { enabled: true },
    modules: ['@pinia/nuxt', '@vueuse/nuxt', '@vueuse/motion/nuxt'],
    typescript: {
        typeCheck: true,
    },
    build: {
        transpile: ['gsap'],
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
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
