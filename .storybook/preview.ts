import type { Preview } from '@storybook/vue3';

const preview: Preview = {
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'dark', value: '#0b0d12' },
                { name: 'light', value: '#fafafa' },
            ],
        },
        controls: {
            expanded: true,
            matchers: { color: /(background|color)$/i, date: /Date$/ },
        },
    },
};

export default preview;
