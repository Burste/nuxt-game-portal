<script setup>
const CLASSROOM = [
    {
        name: 'headMaster',
        title: '校長辦公室',
        className: 'room-headMaster',
    },
    {
        name: 'ravenclaw',
        title: '雷文克勞交誼廳',
        className: 'room-ravenclaw',
    },
    {
        name: 'gryffindor',
        title: '葛來分多交誼廳',
        className: 'room-gryffindor',
    },
    {
        name: 'astronomy',
        title: '占卜學教室',
        className: 'room-astronomy',
    },
    {
        name: 'potions',
        title: '魔藥學教室',
        className: 'room-potions',
    },
    {
        name: 'hall',
        title: '大禮堂',
        className: 'room-hall',
    },
    {
        name: 'slytherin',
        title: '史萊哲林交誼廳',
        className: 'room-slytherin',
    },
    {
        name: 'hufflepuff',
        title: '赫夫帕夫交誼廳',
        className: 'room-hufflepuff',
    },
];
const classRoomBaseStyle =
    'room absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-no-repeat bg-center h-[126px] cursor-pointer';
</script>

<template>
    <div class="relative w-full h-full overflow-hidden">
        <div
            class="flex w-full h-full bg-portal-background-map-m md:bg-portal-background-map-pc bg-cover bg-center relative"
        >
            <div
                class="bg-portal-background-cloud-1 bg-no-repeat w-full h-full animate-fastMovingCloud absolute top-0 left-0 bg-contain -ml-[500px]"
            />

            <div
                class="bg-portal-background-cloud-2 bg-no-repeat w-full h-full animate-slowMovingCloud absolute top-1/2 md:top-0 left-0 bg-contain -ml-[1000px]"
            />
        </div>
        <div
            class="z-[2] flex w-full h-full absolute top-0 left-0 scale-[0.5] translate-x-[50px] s480:scale-[0.75] s480:translate-x-[80px] md:scale-[0.8] lg:transform-none"
        >
            <div
                v-for="item in CLASSROOM"
                :key="item.name"
                :class="`${classRoomBaseStyle} ${item.className}`"
                :title="item.title"
            />
        </div>

        <img
            src="/img/img-other-tips.png"
            alt=""
            class="h-32 flex absolute right-1/2 translate-x-1/2 bottom-0 md:right-0 md:transform-none"
        />
    </div>
</template>
<style lang="scss" scoped>
.room {
    width: 187px;
    transition: all 0.6s ease-in-out;
    animation: roomFlow 10s linear infinite;
    &:nth-child(2n-1) {
        animation: roomFlowDown 10s linear infinite;
    }
    &-headMaster {
        margin: -340px 0 0 -220px;
        background-image: url('/img/room-headMaster_normal.png');
        &:hover {
            margin: -360px 0 0 -220px;
            background-image: url('/img/room-headMaster_hover.png');
        }
    }

    &-ravenclaw {
        margin: -220px 0 0 18px;
        background-image: url('/img/room-ravenclaw_normal.png');
        &:hover {
            margin: -240px 0 0 18px;
            background-image: url('/img/room-ravenclaw_hover.png');
        }
    }

    &-gryffindor {
        margin: -106px 0 0 -130px;
        background-image: url('/img/room-gryffindor_normal.png');
        &:hover {
            margin: -126px 0 0 -130px;
            background-image: url('/img/room-gryffindor_hover.png');
        }
    }
    &-potions {
        margin: 55px 0 0 -170px;
        background-image: url('/img/room-potions_normal.png');
        &:hover {
            margin: 35px 0 0 -170px;
            background-image: url('/img/room-potions_hover.png');
        }
    }
    &-astronomy {
        margin: 9px 0 0 76px;
        background-image: url('/img/room-astronomy_normal.png');
        &:hover {
            margin: -11px 0 0 76px;
            background-image: url('/img/room-astronomy_hover.png');
        }
    }

    &-hall {
        margin: 52px 0 0 -400px;
        background-image: url('/img/room-hall_normal.png');
        &:hover {
            margin: 32px 0 0 -400px;
            background-image: url('/img/room-hall_hover.png');
        }
    }
    &-slytherin {
        margin: 210px 0 0 -207px;
        background-image: url('/img/room-slytherin_normal.png');
        &:hover {
            margin: 190px 0 0 -207px;
            background-image: url('/img/room-slytherin_hover.png');
        }
    }
    &-hufflepuff {
        margin: 220px 0 0 -471px;
        background-image: url('/img/room-hufflepuff_normal.png');
        &:hover {
            margin: 200px 0 0 -471px;
            background-image: url('/img/room-hufflepuff_hover.png');
        }
    }
}
</style>
