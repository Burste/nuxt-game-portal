export const usePreloader = (urls) => {
    const loaded = ref(0);
    const total = urls.length;

    const progress = computed(() =>
        total === 0 ? 100 : Math.round((loaded.value / total) * 100)
    );
    const isComplete = computed(() => loaded.value >= total);

    const load = () => {
        if (total === 0) return;
        urls.forEach((url) => {
            const img = new Image();
            img.onload = img.onerror = () => { loaded.value++; };
            img.src = url;
        });
    };

    return { progress, isComplete, load };
};
