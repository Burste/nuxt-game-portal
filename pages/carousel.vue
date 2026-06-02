<script setup lang="ts">
import { CAROUSEL_DEMO_SLIDES } from '~/utils/carousel';

useHead({ title: 'Carousel Slider Demo' });

const speed = ref(500);
const perspective = ref(1300);
const sideOffsetX = ref(608);
const sideOffsetZ = ref(-400);
const sideOpacity = ref(0.5);
const autoplay = ref(0);

function reset() {
    speed.value = 500;
    perspective.value = 1300;
    sideOffsetX.value = 608;
    sideOffsetZ.value = -400;
    sideOpacity.value = 0.5;
    autoplay.value = 0;
}
</script>

<template>
    <main class="demo">
        <header class="demo__head">
            <h1 class="demo__title">Carousel Slider</h1>
            <p class="demo__subtitle">CSS 3D perspective ‧ 仿哈利波特官網設計</p>
        </header>

        <CarouselSlider
            :items="CAROUSEL_DEMO_SLIDES"
            :speed="speed"
            :perspective="perspective"
            :side-offset-x="sideOffsetX"
            :side-offset-z="sideOffsetZ"
            :side-opacity="sideOpacity"
            :autoplay="autoplay"
        />

        <section class="demo__controls">
            <div class="ctrl">
                <label>
                    <span>perspective</span>
                    <strong>{{ perspective }}px</strong>
                </label>
                <input
                    v-model.number="perspective"
                    type="range"
                    min="400"
                    max="3000"
                    step="50"
                />
                <small>越小透視越誇張</small>
            </div>

            <div class="ctrl">
                <label>
                    <span>sideOffsetX</span>
                    <strong>{{ sideOffsetX }}px</strong>
                </label>
                <input
                    v-model.number="sideOffsetX"
                    type="range"
                    min="0"
                    max="1200"
                    step="10"
                />
                <small>側邊卡片 X 偏移</small>
            </div>

            <div class="ctrl">
                <label>
                    <span>sideOffsetZ</span>
                    <strong>{{ sideOffsetZ }}px</strong>
                </label>
                <input
                    v-model.number="sideOffsetZ"
                    type="range"
                    min="-2000"
                    max="0"
                    step="50"
                />
                <small>側邊卡片 Z 偏移（負值往後推）</small>
            </div>

            <div class="ctrl">
                <label>
                    <span>sideOpacity</span>
                    <strong>{{ sideOpacity.toFixed(2) }}</strong>
                </label>
                <input
                    v-model.number="sideOpacity"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                />
                <small>側邊暗色遮罩 alpha</small>
            </div>

            <div class="ctrl">
                <label>
                    <span>speed</span>
                    <strong>{{ speed }}ms</strong>
                </label>
                <input
                    v-model.number="speed"
                    type="range"
                    min="100"
                    max="1200"
                    step="50"
                />
                <small>切換動畫速度</small>
            </div>

            <div class="ctrl">
                <label>
                    <span>autoplay</span>
                    <strong>{{ autoplay }}ms</strong>
                </label>
                <input
                    v-model.number="autoplay"
                    type="range"
                    min="0"
                    max="8000"
                    step="500"
                />
                <small>0 表示關閉</small>
            </div>

            <button class="demo__reset" type="button" @click="reset">
                重設為官方預設
            </button>
        </section>
    </main>
</template>

<style scoped>
.demo {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 24px 0 48px;
    background: radial-gradient(
        1200px 600px at 50% -10%,
        #232a3a 0%,
        #0b0d12 60%
    );
    color: #fff;
}

.demo__head {
    text-align: center;
    padding: 16px 16px 8px;
}

.demo__title {
    margin: 0;
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 800;
    letter-spacing: -0.02em;
}

.demo__subtitle {
    margin: 10px 0 0;
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    letter-spacing: 0.04em;
}

.demo__controls {
    width: min(920px, calc(100% - 32px));
    margin: 8px auto 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 18px 24px;
    align-items: start;
    padding: 22px 24px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.ctrl {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.ctrl label {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.85);
}

.ctrl label strong {
    font-variant-numeric: tabular-nums;
    color: #ffd24a;
    font-size: 14px;
}

.ctrl input[type='range'] {
    width: 100%;
    accent-color: #ffd24a;
    cursor: pointer;
}

.ctrl small {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.45);
}

.demo__reset {
    grid-column: 1 / -1;
    justify-self: center;
    margin-top: 4px;
    padding: 9px 18px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    background: transparent;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
}

.demo__reset:hover {
    background: rgba(255, 255, 255, 0.12);
}
</style>
