<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import type { CarouselItem, CarouselConfig } from '~/utils/carousel';
import { DEFAULT_CAROUSEL_CONFIG } from '~/utils/carousel';

const isMobile = useMediaQuery('(max-width: 1024px)');

const props = withDefaults(
    defineProps<
        {
            /** 輪播項目資料（必填，由外部傳入） */
            items: CarouselItem[];
            /** 整包設定物件；個別 props 若有傳入會覆寫 config 對應欄位 */
            config?: Partial<CarouselConfig>;
        } & Partial<CarouselConfig>
    >(),
    // 全部設成 undefined 是為了：Vue 3 對 Boolean prop 預設會強制變 false，
    // 明確給 default: undefined 才會保留 undefined、讓 opts 合併邏輯能判斷「沒傳」
    {
        loop: undefined,
        autoplay: undefined,
        speed: undefined,
        slideWidth: undefined,
        slideHeight: undefined,
        slideWidthMobile: undefined,
        slideHeightMobile: undefined,
        perspective: undefined,
        perspectiveMobile: undefined,
        sideOffsetX: undefined,
        sideOffsetXMobile: undefined,
        sideOffsetZ: undefined,
        sideOffsetZMobile: undefined,
        sideOpacity: undefined,
        imageFit: undefined,
        prevImage: undefined,
        prevImageHover: undefined,
        nextImage: undefined,
        nextImageHover: undefined,
        navSize: undefined,
        navSizeMobile: undefined,
    },
);

/**
 * 合併順序：DEFAULT_CAROUSEL_CONFIG ← props.config ← 個別 props（只有非 undefined 才覆寫）。
 * 範本與 script 都讀 opts，不直接讀 props，方便外層任選傳法。
 */
const opts = computed<Required<CarouselConfig>>(() => {
    const keys: (keyof CarouselConfig)[] = [
        'loop',
        'autoplay',
        'speed',
        'slideWidth',
        'slideHeight',
        'slideWidthMobile',
        'slideHeightMobile',
        'perspective',
        'perspectiveMobile',
        'sideOffsetX',
        'sideOffsetXMobile',
        'sideOffsetZ',
        'sideOffsetZMobile',
        'sideOpacity',
        'imageFit',
        'prevImage',
        'prevImageHover',
        'nextImage',
        'nextImageHover',
        'navSize',
        'navSizeMobile',
    ];
    const merged: Record<string, unknown> = {
        ...DEFAULT_CAROUSEL_CONFIG,
        ...(props.config ?? {}),
    };
    for (const k of keys) {
        const v = (props as Record<string, unknown>)[k];
        if (v !== undefined) merged[k] = v;
    }
    // 在 mobile viewport 下用 mobile 變體覆蓋對應桌機值（沒設則維持桌機）
    if (isMobile.value) {
        const mobileOverrides: Array<
            [keyof CarouselConfig, keyof CarouselConfig]
        > = [
            ['perspective', 'perspectiveMobile'],
            ['sideOffsetX', 'sideOffsetXMobile'],
            ['sideOffsetZ', 'sideOffsetZMobile'],
            ['navSize', 'navSizeMobile'],
        ];
        for (const [target, src] of mobileOverrides) {
            if (merged[src] !== undefined) merged[target] = merged[src];
        }
    }
    return merged as Required<CarouselConfig>;
});

const currentIndex = ref(0);

/**
 * 算出某個 item 相對於 currentIndex 的「最短循環距離」。
 *   d = 0  → 中央作用中
 *   d = -1 → 左中
 *   d = +1 → 右中
 *   |d| > 1 → 隱藏（推到很遠的 Z）
 */
function offsetFor(i: number): number {
    const n = props.items.length;
    let d = i - currentIndex.value;
    if (!opts.value.loop) return d;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
}

function itemStyle(i: number) {
    const d = offsetFor(i);
    if (d === 0) {
        return {
            transform: 'translate3d(0, 0, 0)',
            opacity: 1,
            zIndex: 5,
        } as Record<string, string | number>;
    }
    if (d === -1) {
        return {
            transform: `translate3d(${-opts.value.sideOffsetX}px, 0, ${opts.value.sideOffsetZ}px)`,
            opacity: 1,
            zIndex: 3,
        };
    }
    if (d === 1) {
        return {
            transform: `translate3d(${opts.value.sideOffsetX}px, 0, ${opts.value.sideOffsetZ}px)`,
            opacity: 1,
            zIndex: 3,
        };
    }
    // 其他全部推到很遠處隱藏
    return {
        transform: 'translate3d(0, 0, -3200px)',
        opacity: 0,
        zIndex: -1,
    };
}

function itemClass(i: number) {
    const d = offsetFor(i);
    return {
        'cs-item--active': d === 0,
        'cs-item--side': d === -1 || d === 1,
        'cs-item--hidden': Math.abs(d) > 1,
    };
}

const isAnimating = ref(false);
let animLockTimer: ReturnType<typeof setTimeout> | null = null;
function lockAnimation() {
    isAnimating.value = true;
    if (animLockTimer) clearTimeout(animLockTimer);
    animLockTimer = setTimeout(() => {
        isAnimating.value = false;
    }, opts.value.speed);
}

function afterNav(prev: number) {
    if (currentIndex.value === prev) return; // 沒動就不鎖（例如 noLoop 撞牆）
    lockAnimation();
    if (opts.value.autoplay && opts.value.autoplay > 0) startAutoplay();
}

function goNext() {
    if (isAnimating.value) return;
    const n = props.items.length;
    if (!n) return;
    const prev = currentIndex.value;
    if (opts.value.loop) {
        currentIndex.value = (currentIndex.value + 1) % n;
    } else if (currentIndex.value < n - 1) {
        currentIndex.value++;
    }
    afterNav(prev);
}
function goPrev() {
    if (isAnimating.value) return;
    const n = props.items.length;
    if (!n) return;
    const prev = currentIndex.value;
    if (opts.value.loop) {
        currentIndex.value = (currentIndex.value - 1 + n) % n;
    } else if (currentIndex.value > 0) {
        currentIndex.value--;
    }
    afterNav(prev);
}
function goTo(i: number) {
    if (isAnimating.value) return;
    if (i < 0 || i >= props.items.length) return;
    const prev = currentIndex.value;
    currentIndex.value = i;
    afterNav(prev);
}

const isAtStart = computed(() => !opts.value.loop && currentIndex.value === 0);
const isAtEnd = computed(
    () => !opts.value.loop && currentIndex.value === props.items.length - 1,
);

function onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') goNext();
    else if (e.key === 'ArrowLeft') goPrev();
}

/* ── autoplay ── */
let autoplayTimer: ReturnType<typeof setInterval> | null = null;
function startAutoplay() {
    stopAutoplay();
    const ms = opts.value.autoplay;
    if (!ms || ms <= 0) return;
    autoplayTimer = setInterval(goNext, ms);
}
function stopAutoplay() {
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    }
}

onMounted(() => {
    window.addEventListener('keydown', onKeydown);
    startAutoplay();
    watch(
        () => opts.value.autoplay,
        () => startAutoplay(),
    );
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown);
    stopAutoplay();
    if (animLockTimer) clearTimeout(animLockTimer);
});
</script>

<template>
    <div
        class="cs-root"
        :style="{
            '--cs-slide-w': `${opts.slideWidth}px`,
            '--cs-slide-h': `${opts.slideHeight}px`,
            '--cs-slide-w-sm': opts.slideWidthMobile
                ? `${opts.slideWidthMobile}px`
                : `${opts.slideWidth}px`,
            '--cs-slide-h-sm': opts.slideHeightMobile
                ? `${opts.slideHeightMobile}px`
                : `${opts.slideHeight}px`,
            '--cs-perspective': `${opts.perspective}px`,
            '--cs-speed': `${opts.speed}ms`,
            '--cs-side-opacity': opts.sideOpacity,
            '--cs-img-fit': opts.imageFit,
            '--cs-nav-size': `${opts.navSize}px`,
        }"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
    >
        <div class="cs-stage">
            <div
                v-for="(item, i) in items"
                :key="i"
                class="cs-item"
                :class="itemClass(i)"
                :style="itemStyle(i)"
                @click="goTo(i)"
            >
                <picture>
                    <source
                        v-if="item.imageMobile"
                        :srcset="item.imageMobile"
                        media="(max-width: 1024px)"
                    />
                    <img
                        class="cs-img"
                        :src="item.image"
                        :alt="item.title"
                        draggable="false"
                    />
                </picture>
                <div v-if="item.title || item.description" class="cs-content">
                    <h2 v-if="item.title" class="cs-content__title">
                        {{ item.title }}
                    </h2>
                    <p v-if="item.description" class="cs-content__desc">
                        {{ item.description }}
                    </p>
                </div>
            </div>
        </div>

        <!-- 自訂導覽 -->
        <button
            class="cs-nav cs-nav--prev"
            :class="{ 'cs-nav--image': opts.prevImage }"
            :style="
                opts.prevImage
                    ? {
                          '--cs-nav-bg': `url(${opts.prevImage})`,
                          '--cs-nav-bg-hover': `url(${opts.prevImageHover || opts.prevImage})`,
                      }
                    : undefined
            "
            aria-label="Previous"
            :disabled="isAtStart"
            @click="goPrev"
        >
            <svg
                v-if="!opts.prevImage"
                viewBox="0 0 24 24"
                width="22"
                height="22"
            >
                <path
                    fill="currentColor"
                    d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4-4.6-4.6z"
                />
            </svg>
        </button>
        <button
            class="cs-nav cs-nav--next"
            :class="{ 'cs-nav--image': opts.nextImage }"
            :style="
                opts.nextImage
                    ? {
                          '--cs-nav-bg': `url(${opts.nextImage})`,
                          '--cs-nav-bg-hover': `url(${opts.nextImageHover || opts.nextImage})`,
                      }
                    : undefined
            "
            aria-label="Next"
            :disabled="isAtEnd"
            @click="goNext"
        >
            <svg
                v-if="!opts.nextImage"
                viewBox="0 0 24 24"
                width="22"
                height="22"
            >
                <path
                    fill="currentColor"
                    d="M8.6 7.4 10 6l6 6-6 6-1.4-1.4 4.6-4.6z"
                />
            </svg>
        </button>

        <!-- 自訂分頁 -->
        <div class="cs-dots">
            <button
                v-for="(item, i) in items"
                :key="i"
                class="cs-dot"
                :class="{ 'cs-dot--active': i === currentIndex }"
                :aria-label="`Go to slide ${i + 1}`"
                @click="goTo(i)"
            />
        </div>
    </div>
</template>

<style scoped>
.cs-root {
    position: relative;
    width: 100%;
    /* 高度等於卡片高，留一點下方空間給分頁 */
    padding-bottom: 32px;
}

/* perspective 與絕對定位 stage：所有 item 疊放在這層中央 */
.cs-stage {
    position: relative;
    width: 100%;
    height: var(--cs-slide-h, 570px);
    margin: 0 auto;
    perspective: var(--cs-perspective, 1300px);
    transform-style: preserve-3d;
}

@media (max-width: 1024px) {
    .cs-stage {
        height: var(--cs-slide-h-sm, var(--cs-slide-h, 570px));
    }
}

/* 卡片本身：所有 item 同尺寸、絕對定位、置中後再用 translate3d 移動 */
.cs-item {
    position: absolute;
    left: 50%;
    top: 50%;
    width: var(--cs-slide-w, 1008px);
    height: var(--cs-slide-h, 570px);
    margin-left: calc(var(--cs-slide-w, 1008px) / -2);
    margin-top: calc(var(--cs-slide-h, 570px) / -2);
    border-radius: 8px;
    overflow: hidden;
    /* 非作用中用 filter 變暗（3D context 內比 ::before 還可靠） */
    filter: brightness(calc(1 - var(--cs-side-opacity, 0.5)));
    transition:
        transform var(--cs-speed, 500ms) ease,
        opacity var(--cs-speed, 500ms) ease,
        filter var(--cs-speed, 500ms) ease;
    will-change: transform, opacity, filter;
    cursor: pointer;
    backface-visibility: hidden;
}

@media (max-width: 1024px) {
    .cs-item {
        width: var(--cs-slide-w-sm, var(--cs-slide-w, 1008px));
        height: var(--cs-slide-h-sm, var(--cs-slide-h, 570px));
        margin-left: calc(var(--cs-slide-w-sm, var(--cs-slide-w, 1008px)) / -2);
        margin-top: calc(var(--cs-slide-h-sm, var(--cs-slide-h, 570px)) / -2);
    }
}

.cs-item--active {
    filter: brightness(1);
    cursor: default;
}
.cs-item--hidden {
    pointer-events: none;
}

.cs-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: var(--cs-img-fit, cover);
    user-select: none;
    border-radius: inherit;
}

.cs-content {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 88px 24px 28px;
    color: #fff;
    text-align: left;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.75));
    border-radius: 0 0 8px 8px;
    z-index: 3;
}

.cs-content__title {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.1;
}

.cs-content__desc {
    margin: 8px 0 0;
    font-size: 14px;
    font-weight: 500;
    opacity: 0.85;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

/* 導覽箭頭（預設 SVG chevron 版） */
.cs-nav {
    position: absolute;
    top: 50%;
    z-index: 10;
    display: grid;
    place-items: center;
    width: var(--cs-nav-size, 44px);
    height: var(--cs-nav-size, 44px);
    margin-top: calc(var(--cs-nav-size, 44px) / -2);
    padding: 0;
    border: 0;
    background: transparent;
    color: #fff;
    cursor: pointer;
    transition:
        opacity 0.2s ease,
        transform 0.2s ease,
        background-image 0.15s ease;
}
.cs-nav:hover {
    transform: scale(1.08);
}
.cs-nav:disabled {
    opacity: 0.3;
    cursor: default;
    transform: none;
}
.cs-nav--prev {
    left: max(
        8px,
        calc(
            50% - var(--cs-slide-w, 1008px) / 2 - var(--cs-nav-size, 44px) - 8px
        )
    );
}
.cs-nav--next {
    right: max(
        8px,
        calc(
            50% - var(--cs-slide-w, 1008px) / 2 - var(--cs-nav-size, 44px) - 8px
        )
    );
}

/* mobile：用手機版的 slide 寬度算位置，否則用桌機 1008 會把按鈕推到視窗邊或重疊 */
@media (max-width: 1024px) {
    .cs-nav--prev {
        left: max(
            4px,
            calc(
                50% - var(--cs-slide-w-sm, var(--cs-slide-w, 1008px)) / 2 -
                    var(--cs-nav-size, 44px) - 4px
            )
        );
    }
    .cs-nav--next {
        right: max(
            4px,
            calc(
                50% - var(--cs-slide-w-sm, var(--cs-slide-w, 1008px)) / 2 -
                    var(--cs-nav-size, 44px) - 4px
            )
        );
    }
}

/* 有自訂圖片時：用 background-image，hover 切換到 hover 版 */
.cs-nav--image {
    background: var(--cs-nav-bg) center / contain no-repeat;
}
.cs-nav--image:hover {
    background-image: var(--cs-nav-bg-hover);
    transform: none; /* hover 已換圖、不需要再放大 */
}

/* 分頁圓點 */
.cs-dots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    gap: 8px;
}
.cs-dot {
    width: 8px;
    height: 8px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: #fff;
    opacity: 0.2;
    cursor: pointer;
    transition: opacity 0.3s ease;
}
.cs-dot--active {
    opacity: 1;
}
</style>
