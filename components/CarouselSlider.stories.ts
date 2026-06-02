import type { Meta, StoryObj } from '@storybook/vue3';
import CarouselSlider from './CarouselSlider.vue';
import { CAROUSEL_DEMO_SLIDES, type CarouselConfig } from '../utils/carousel';

const baseArgs = {
    items: CAROUSEL_DEMO_SLIDES,
    loop: true,
    autoplay: 0,
    speed: 500,
    slideWidth: 1008,
    slideHeight: 570,
    perspective: 1300,
    sideOffsetX: 608,
    sideOffsetZ: -400,
    sideOpacity: 0.5,
    imageFit: 'cover' as const,
    navSize: 88,
};

const meta: Meta<typeof CarouselSlider> = {
    title: 'Components/CarouselSlider',
    component: CarouselSlider,
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'dark', value: '#0b0d12' },
                { name: 'light', value: '#fafafa' },
            ],
        },
    },
    argTypes: {
        // ── 資料 ──
        items: {
            control: 'object',
            description: '輪播項目陣列（必填）',
            table: { category: '資料' },
        },

        // ── 行為 ──
        loop: {
            control: 'boolean',
            description: '是否循環（true 時頭尾互通）',
            table: { category: '行為' },
        },
        autoplay: {
            control: { type: 'number', min: 0, max: 10000, step: 500 },
            description: '自動播放間隔（毫秒），0 = 關閉；滑鼠移上會暫停',
            table: { category: '行為' },
        },
        speed: {
            control: { type: 'range', min: 100, max: 1200, step: 50 },
            description: '切換動畫速度（毫秒）',
            table: { category: '行為' },
        },

        // ── 卡片尺寸 ──
        slideWidth: {
            control: { type: 'number', min: 200, max: 2000, step: 10 },
            description: '卡片寬度（px，桌機）',
            table: { category: '卡片尺寸' },
        },
        slideHeight: {
            control: { type: 'number', min: 100, max: 1200, step: 10 },
            description: '卡片高度（px，桌機）',
            table: { category: '卡片尺寸' },
        },
        slideWidthMobile: {
            control: { type: 'number', min: 100, max: 1000, step: 10 },
            description: '卡片寬度（px，手機，未提供時沿用桌機）',
            table: { category: '卡片尺寸' },
        },
        slideHeightMobile: {
            control: { type: 'number', min: 100, max: 1000, step: 10 },
            description: '卡片高度（px，手機，未提供時沿用桌機）',
            table: { category: '卡片尺寸' },
        },

        // ── 3D 效果 ──
        perspective: {
            control: { type: 'range', min: 400, max: 3000, step: 50 },
            description: '父容器 perspective（px），越小透視越誇張',
            table: { category: '3D 效果' },
        },
        sideOffsetX: {
            control: { type: 'range', min: 0, max: 1200, step: 10 },
            description: '側邊卡片在 X 軸的偏移（px）',
            table: { category: '3D 效果' },
        },
        sideOffsetZ: {
            control: { type: 'range', min: -2000, max: 0, step: 50 },
            description: '側邊卡片在 Z 軸的偏移（負值往後推 → 視覺縮小）',
            table: { category: '3D 效果' },
        },
        sideOpacity: {
            control: { type: 'range', min: 0, max: 1, step: 0.05 },
            description:
                '非作用中卡片的暗色 alpha（透過 filter brightness 實作）',
            table: { category: '3D 效果' },
        },

        // ── 圖片 ──
        imageFit: {
            control: { type: 'inline-radio' },
            options: ['cover', 'contain'],
            description: 'cover：裁切以填滿卡片；contain：完整顯示、卡片留白',
            table: { category: '圖片' },
        },

        // ── 導覽按鈕 ──
        navSize: {
            control: { type: 'range', min: 32, max: 160, step: 4 },
            description: '左右箭頭按鈕尺寸（px）',
            table: { category: '導覽按鈕' },
        },
        prevImage: {
            control: 'text',
            description: '左箭頭圖片 URL；未提供時顯示預設 SVG chevron',
            table: { category: '導覽按鈕' },
        },
        prevImageHover: {
            control: 'text',
            description: '左箭頭 hover 圖片 URL',
            table: { category: '導覽按鈕' },
        },
        nextImage: {
            control: 'text',
            description: '右箭頭圖片 URL',
            table: { category: '導覽按鈕' },
        },
        nextImageHover: {
            control: 'text',
            description: '右箭頭 hover 圖片 URL',
            table: { category: '導覽按鈕' },
        },
    },
};

export default meta;

type Story = StoryObj<typeof CarouselSlider>;

/**
 * 標準預設：與哈利波特官網一致的 perspective 參數（1008×570／sideX 608／sideZ -400／perspective 1300）。
 * 用 Controls 面板可即時調整所有設定值。
 */
export const Default: Story = {
    args: { ...baseArgs },
};

export const Autoplay: Story = {
    args: {
        ...baseArgs,
        autoplay: 3000,
    },
};

export const NoLoop: Story = {
    args: {
        ...baseArgs,
        loop: false,
    },
};

/**
 * 使用自訂導覽按鈕圖片：傳入 prev/nextImage（及 hover 版）後，按鈕會以該圖呈現、
 * 滑鼠移上會切換到 hover 圖；未傳則自動 fallback 到預設 SVG chevron。
 * 這個 story 引用專案 public/img 內的按鈕圖。
 */
export const WithCustomNavButtons: Story = {
    args: {
        ...baseArgs,
        navSize: 84,
        prevImage: '/img/btn-prev.png',
        prevImageHover: '/img/btn-prev-hover.png',
        nextImage: '/img/btn-next.png',
        nextImageHover: '/img/btn-next-hover.png',
    },
};

/**
 * 用 config object 一包傳入：只要在外層維護一份 CarouselConfig，就能把所有設定值整包丟給元件。
 * 同名的個別 prop 若有傳入會「覆寫」config 裡對應欄位（適合做 base + override 的場景）。
 */
const harryPotterConfig: CarouselConfig = {
    slideWidth: 1008,
    slideHeight: 570,
    perspective: 1300,
    sideOffsetX: 608,
    sideOffsetZ: -400,
    sideOpacity: 0.5,
    speed: 500,
    imageFit: 'contain',
    navSize: 84,
    prevImage: '/img/btn-prev.png',
    prevImageHover: '/img/btn-prev-hover.png',
    nextImage: '/img/btn-next.png',
    nextImageHover: '/img/btn-next-hover.png',
};

export const WithConfigObject: Story = {
    args: {
        items: CAROUSEL_DEMO_SLIDES,
        config: harryPotterConfig,
    },
};
