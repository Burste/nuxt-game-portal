import { useWindowSize } from '@vueuse/core';
export const usePage = () => {
    const { width: bodyWidth, height: bodyHeight } = useWindowSize();
    return {
        bodyWidth,
        bodyHeight,
    };
};
