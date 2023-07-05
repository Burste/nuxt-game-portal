import { useWindowSize } from '@vueuse/core';
export const usePage = () => {
    const { width, height } = useWindowSize();
    const bodyWidth = width.value;
    const bodyHeight = height.value;
    return {
        bodyWidth,
        bodyHeight,
    };
};
