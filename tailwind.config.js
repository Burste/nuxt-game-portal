/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue',
    ],
    theme: {
        extend: {
            colors: {
                'portal-color-gold': '#c2a673',
                'portal-color-white': '#dadada',
                'portal-color-brown': '#593522',
            },
            backgroundImage: {
                'portal-slogan-m': "url('/img/slogan_m.png')",
                'portal-slogan-pc': "url('/img/slogan_pc.png')",
                'portal-background-map-pc': "url('/img/bg-map_pc.jpg')",
                'portal-background-map-m': "url('/img/bg-map_m.png')",
                'portal-background-cloud-1': "url('/img/bg-cloud-1.png')",
                'portal-background-cloud-2': "url('/img/bg-cloud-2.png')",
                'portal-background-app-bar': "url('/img/bg-download-bar.jpeg')",
                'portal-background-footer': "url('/img/bg-footer.jpg')",
                'portal-background-feature': "url('/img/bg-feature-spark.jpg')",
            },
            animation: {
                fastMovingCloud: 'closeCloudMoving 30s linear infinite',
                slowMovingCloud: 'farCloudMoving 30s 10s linear infinite',
                flowUpAndDown: 'flowUpAndDown 3s infinite linear alternate',
            },
            keyframes: {
                farCloudMoving: {
                    '0%': { marginLeft: '-1000px' },
                    '100%': { marginLeft: '100%' },
                },
                closeCloudMoving: {
                    '0%': { marginLeft: '-500px' },
                    '100%': { marginLeft: '100%' },
                },
                flowUpAndDown: {
                    '0%': { transform: 'translateY(16px)' },
                    '100%': { marginLeft: 'translateY(0px)' },
                },
            },
            screens: {
                s480: '480px',
            },
        },
    },
    plugins: [],
};
