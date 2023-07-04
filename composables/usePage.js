export const usePage = () => {
    const bodyWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const bodyHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
    return {
        bodyWidth,
        bodyHeight,
    };
};
