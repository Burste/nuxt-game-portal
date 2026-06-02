export interface CarouselItem {
    image: string;
    /** 手機版圖片（未提供時沿用 image） */
    imageMobile?: string;
    title: string;
    description?: string;
}

/**
 * CarouselSlider 的完整可調設定。
 * 可以整包傳入元件的 `config` prop，也可以單獨用個別 props 覆寫。
 */
export interface CarouselConfig {
    /** 是否循環 */
    loop?: boolean;
    /** 自動播放間隔（毫秒），0 = 關閉 */
    autoplay?: number;
    /** 切換動畫速度（毫秒） */
    speed?: number;
    /** 卡片寬度（px，桌機） */
    slideWidth?: number;
    /** 卡片高度（px，桌機） */
    slideHeight?: number;
    /** 卡片寬度（px，手機，未提供時沿用 slideWidth） */
    slideWidthMobile?: number;
    /** 卡片高度（px，手機，未提供時沿用 slideHeight） */
    slideHeightMobile?: number;
    /** 父容器 perspective（px） */
    perspective?: number;
    /** 父容器 perspective（px，手機） */
    perspectiveMobile?: number;
    /** 側邊卡片 X 軸偏移（px） */
    sideOffsetX?: number;
    /** 側邊卡片 X 軸偏移（px，手機） */
    sideOffsetXMobile?: number;
    /** 側邊卡片 Z 軸偏移（px，負值往後推） */
    sideOffsetZ?: number;
    /** 側邊卡片 Z 軸偏移（px，手機） */
    sideOffsetZMobile?: number;
    /** 非作用中卡片暗化強度（0~1） */
    sideOpacity?: number;
    /** 圖片填滿方式 */
    imageFit?: 'cover' | 'contain';
    /** 左箭頭圖片 URL */
    prevImage?: string;
    /** 左箭頭 hover 圖片 URL */
    prevImageHover?: string;
    /** 右箭頭圖片 URL */
    nextImage?: string;
    /** 右箭頭 hover 圖片 URL */
    nextImageHover?: string;
    /** 箭頭尺寸（px） */
    navSize?: number;
    /** 箭頭尺寸（px，手機） */
    navSizeMobile?: number;
}

/** CarouselSlider 的預設設定（對齊哈利波特官網的 gallery 參數）。 */
export const DEFAULT_CAROUSEL_CONFIG: CarouselConfig = {
    loop: true,
    autoplay: 0,
    speed: 500,
    slideWidth: 1008,
    slideHeight: 570,
    perspective: 1300,
    sideOffsetX: 608,
    sideOffsetZ: -400,
    sideOpacity: 0.5,
    imageFit: 'cover',
    navSize: 88,
};

export const CAROUSEL_DEMO_SLIDES: CarouselItem[] = [
    {
        image: 'https://carousel-slider.uiinitiative.com/images/guardians-of-the-galaxy.jpg',
        title: 'Guardians Of The Galaxy',
        description:
            'A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.',
    },
    {
        image: 'https://carousel-slider.uiinitiative.com/images/justice-league.jpg',
        title: 'Justice League',
        description:
            'Bruce Wayne aligns forces with Diana Prince to recruit a team of metahumans and protect the world from an approaching threat.',
    },
    {
        image: 'https://carousel-slider.uiinitiative.com/images/spider-man.jpg',
        title: 'Spider-Man: Far from Home',
        description:
            'Following the events of Avengers: Endgame, Spider-Man must step up to take on new threats in a world that has changed forever.',
    },
    {
        image: 'https://carousel-slider.uiinitiative.com/images/suicide-squad.jpg',
        title: 'The Suicide Squad',
        description:
            'Supervillains join the super-shady Task Force X and are dropped off at the remote, enemy-infused island of Corto Maltese.',
    },
    {
        image: 'https://carousel-slider.uiinitiative.com/images/thor-ragnarok.jpg',
        title: 'Thor: Ragnarok',
        description:
            'Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök at the hands of the ruthless Hela.',
    },
    {
        image: 'https://carousel-slider.uiinitiative.com/images/dr-strange.jpg',
        title: 'Doctor Strange',
        description:
            'America Chavez and a version of Stephen Strange are chased by a demon in the space between universes while searching for the Book of Vishanti.',
    },
    {
        image: 'https://carousel-slider.uiinitiative.com/images/eternals.jpg',
        title: 'Eternals',
        description:
            'Ten superpowered Eternals are sent by the Celestial Arishem to Earth on their starship, the Domo, to exterminate the invasive Deviants.',
    },
];
