import type { StorybookConfig } from '@storybook/vue3-vite';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

const config: StorybookConfig = {
    stories: ['../components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    addons: ['@storybook/addon-docs'],
    framework: { name: '@storybook/vue3-vite', options: {} },

    async viteFinal(config) {
        const { mergeConfig } = await import('vite');
        return mergeConfig(config, {
            resolve: {
                alias: {
                    '~': projectRoot,
                    '@': projectRoot,
                },
            },
            plugins: [
                // @storybook/vue3-vite 10.x 不會自動載入 @vitejs/plugin-vue，要自己掛
                vue(),
            ],
        });
    },
};

export default config;
