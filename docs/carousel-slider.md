# Carousel Slider 實作說明

仿 [UI Initiative Carousel Slider](https://carousel-slider.uiinitiative.com/) 的可重用 Vue 元件，重現其自訂的 `effect: "carousel"` 互動效果。本文整理實作原理、CSS 機制，以及過程中踩到的三個關鍵坑。

相關檔案：

- `components/CarouselSlider.vue` — 元件本體
- `utils/carousel.ts` — `CarouselItem` 型別與示範資料 `CAROUSEL_DEMO_SLIDES`
- `pages/carousel.vue` — demo 頁面（含即時調整控制項）
- `components/HomeSlides/ThirdSlide.vue` — 首頁第三屏的引用範例

---

## 一、技術選型

專案使用 `nuxt-swiper`，它底層是 Swiper 的 **Web Component**（`<swiper-container>` / `<swiper-slide>`），而非 `swiper/vue` 的元件版。因此初始化要走它提供的 `useSwiper` composable：

```ts
const { instance, realIndex, next, prev } = useSwiper(containerRef, swiperParams);
```

搭配模板上的 `<swiper-container ref="containerRef" :init="false">`。`useSwiper` 內部會在 `onMounted(() => nextTick(() => ...))` 時，先 `Object.assign(el, params)` 再呼叫 `el.initialize()`。這個 `nextTick` 很關鍵（見第五節坑 1）。

官方的 `carousel` 是它自己註冊的自訂效果模組，Swiper 內建並沒有。我們不引入該模組，而是用「一般 Swiper ＋事件回呼手動套 transform」的方式完整重現。

---

## 二、carousel 效果的核心原理

關鍵心法：**Swiper 照常把作用中的那片置中（移動 wrapper），我們再對「每一片 slide」額外疊加一個 transform**，做出中央放大、兩側往內收的層疊感。

逆向官方 demo（量測整數／非整數 progress 與實際螢幕座標三重驗證）得到的精確公式，其中 `p = slide.progress`（0 為正中央、±1 為相鄰一格…），`a = |p|`：

```
每片 slide：
  transform     = translateX( sign(p) · (15·p² + 35·a) % )  scale( 1 − 0.2·a )
  內層 opacity  = 1 − 0.33·a
  整片 opacity  = (a > sideSlides + 1) ? 0 : 1     // sideSlides 預設 2，故 a>3 隱藏
```

對應的效果參數（皆開放為 props）：`scaleStep = 0.2`、`opacityStep = 0.33`、`sideSlides = 2`。

實際呈現的視覺位置（中心位移，相對基準寬度 520px）是 `0 → 260 → 364 → 312 px` 這種**非單調**曲線——也就是越外側反而稍微往中間收回去，這正是「卡片往內層疊」質感的來源，也是它和一般 coverflow 最大的不同。

程式裡只在三個 Swiper 事件套用上述公式：

```ts
on: {
  init:         (s) => transformSlides(s),       // 初始定位
  setTranslate: (s) => transformSlides(s),       // 拖曳過程連續觸發
  setTransition:(s, d) => transitionSlides(s, d) // 同步過場時間
}
```

`transformSlides` 逐片讀 `slideEl.progress` 算出 transform / opacity / zIndex；`transitionSlides` 則把 Swiper 給的 duration 寫到每片 slide 與其內層上，讓動畫時間與 wrapper 同步。

---

## 三、CSS 原理逐項拆解

### 1. 為什麼 translateX 用百分比

CSS `translateX(%)` 的百分比是**相對元素自身寬度**。所有 slide 同寬，所以這套 `%` 公式不論螢幕大小或 slide 實際像素都成立，天然 RWD，不需要為不同斷點重算。

### 2. scale 與 transform-origin

`scale` 預設以中心為原點（`transform-origin: center center`），所以縮小後仍對齊原本的版面位置，再由 `translateX` 平移。transform 不會觸發 reflow，Swiper 量到的 slide 尺寸不變，效能好且不干擾它的計算。書寫順序固定為「先 translate、後 scale」，與官方一致。

### 3. transition：屬性寫在 CSS、時間由 JS 給

```css
.cs-slide { transition-property: transform, opacity; transition-timing-function: ease-out; }
.cs-anim  { transition-property: opacity; transition-timing-function: ease-out; }
```

注意 **CSS 不寫死 `transition-duration`**（預設 0s）。時間交給 `transitionSlides` 在 Swiper 的 `setTransition` 事件動態設定：拖曳中 Swiper 會傳 0（即時跟手、不要過場），放開或按鈕切換時傳 `speed`（例如 600ms，產生平滑動畫）。這樣動畫節奏永遠跟 wrapper 一致。

**timing-function 必須與 wrapper 相同**（見第五節坑 4）。Swiper wrapper 預設是 `ease`，所以這裡也要用 `ease`。因為畫面上每片 slide 的實際位置 = 「wrapper 位移」＋「自己疊加的 transform」兩段動畫相加：

```
合成位置(t) = [W0 + (W1−W0)·E(t)] + [S0 + (S1−S0)·E(t)]
            = Net0 + (Net1−Net0)·E(t)
```

只要兩段共用同一條 `E(t)` 就能化簡成單一插值、保證單調；一旦兩邊曲線不同（例如一邊 `ease`、一邊 `ease-out`），過程中兩項會以不同速度拉扯，外側 slide 甚至會先往一邊再回來，看起來就是整片「左右搖晃」。

### 4. `.cs-anim` 淡出層

對應官方的 `.swiper-carousel-animate-opacity`。把 `img + 內容` 包在這層、淡出只作用在它身上，與「整片 slide 的縮放位移」分離，兩種動畫互不干擾。

### 5. 內容區的可讀性處理

底部 `.cs-content` 用一道由下往上的漸層 `linear-gradient(to bottom, transparent, rgba(0,0,0,.75))` 壓暗，確保白字在任何劇照上都看得清；描述用 `-webkit-line-clamp: 2` 限制兩行避免高度跳動。卡片 `border-radius: 8px`、`object-fit: cover`、容器 `max-width: 1200px` 置中，皆對齊官方數值。

### 6. z-index 疊放

`zIndex = 10 − round(a)`，讓中央（a=0）疊在最上層，越外側越往後，配合往內收的位移形成正確的前後遮擋。

---

## 四、自訂導覽與分頁（不用內建）

Swiper Web Component 內建的 navigation / pagination 會渲染在 **shadow DOM** 裡，外部 CSS 不易覆寫。為了完全掌握樣式，箭頭與圓點都是元件自己畫的，再透過 `useSwiper` 回傳的方法操作：

- 上一頁／下一頁：`prev()` / `next()`
- 圓點點擊：`instance.value.slideToLoop(i)`（loop 模式要用 `slideToLoop` 對應原始索引）
- 目前頁：用 `realIndex` 高亮對應圓點

---

## 五、實作時踩到的三個關鍵坑

### 坑 1：整頁一片白

最初在 `onMounted` 裡「直接」呼叫 `el.initialize()`。但此時 `<swiper-container>` 這個 custom element 還沒被註冊／升級，`initialize` 不存在就拋錯，導致 `<ClientOnly>` 內整段渲染失敗。

**解法**：改用 `useSwiper` composable，它把初始化包在 `nextTick` 內，等元素就緒才 `initialize()`。

### 坑 2：`Missing required prop: "items"` → 0 片 → 白屏

`items` 是必填 prop，資料 `CAROUSEL_DEMO_SLIDES` 放在新建的 `utils/`。Nuxt 雖會自動匯入 `utils/`，但**目錄是 dev server 啟動後才新增的，掃不到**，於是 `items` 為 `undefined`、`v-for` 跑出 0 片 slide，Swiper 也跳「slides 數量不足」並一片白。

**解法**：在使用端改成明確 `import { CAROUSEL_DEMO_SLIDES } from '~/utils/carousel'`，不依賴自動匯入。

### 坑 3：下一頁只能按一次、而且沒有動畫

模板原本寫 `@click="next"`。Vue 會把 **click 事件物件當第一個參數**傳進去，而 `useSwiper` 的 `next` 直接轉呼叫 `slideNext(speed)`——於是事件物件被當成「動畫速度」。Swiper 拿它去設 `transition-duration`，算出無效值（實測 wrapper duration 變成 `0s`），導致：

1. 沒有平滑動畫；
2. 0 時長的 transition **不會觸發 `transitionend`**，Swiper 的 `animating` 旗標永遠停在 `true`，擋住之後所有的 `slideNext` → 看起來就是「只能按一次」。

**解法**：包一層不帶參數的處理函式再綁定。

```ts
function goNext() { next(); }   // 忽略 click 事件，呼叫時不帶 speed 參數
function goPrev() { prev(); }
```

```html
<button @click="goPrev">…</button>
<button @click="goNext">…</button>
```

> 經驗法則：把 `useSwiper`（或任何把第一參數當數值的 API）綁到 `@click` 時，務必包一層，別讓事件物件流進去。

### 坑 4：每次切頁整片左右搖晃

slide 的 `transition-timing-function` 原本用 `ease-out`，但 Swiper wrapper 用的是 `ease`。由於畫面位置是「wrapper 位移＋slide 疊加 transform」兩段動畫相加，曲線不同就無法抵消——尤其外側 slide 的兩段動畫方向相反，過程中會先偏一邊再回來，視覺上就是整片左右晃。

**解法**：把 slide 與 `.cs-anim` 的 `transition-timing-function` 改成與 wrapper 相同的 `ease`（推導見第三節第 3 點）。

---

## 六、對外設定（props）

| Prop          | 預設   | 說明                              |
| ------------- | ------ | --------------------------------- |
| `items`       | （必填）| `{ image, title, description? }[]` |
| `loop`        | `true` | 是否循環                          |
| `autoplay`    | `0`    | 自動播放間隔（ms），0 為關閉      |
| `speed`       | `600`  | 切換動畫速度（ms）                |
| `scaleStep`   | `0.2`  | 每離開一格縮小比例                |
| `opacityStep` | `0.33` | 每離開一格淡出比例                |
| `sideSlides`  | `2`    | 中心兩側各顯示幾片                |

`scaleStep` / `opacityStep` / `sideSlides` / `speed` 有 watcher，調整後即時生效（demo 頁的滑桿即用此特性）。

```html
<CarouselSlider
  :items="myItems"
  :scale-step="0.2"
  :opacity-step="0.33"
  :side-slides="2"
  :speed="600"
  :autoplay="4000"
/>
```
