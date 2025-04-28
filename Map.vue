<template>
    <div class="map-header" :style="{ paddingTop: store.safeAreaTop }">
        <div class="left">
            <i class="iconfont icon-arrow-left-line" @click="router.replace('/comicConvention/index')"></i>
            <div class="subject">
                第二十二回博麗神社例大祭
            </div>
        </div>
        <div class="right">
            <i class="iconfont icon-share-forward-2-fill" @click="share"></i>
        </div>
    </div>

    <div class="container" ref="container">
        <v-stage ref="stage" :config="stageConfig">
            <v-layer ref="layer" :config="layerConfig" @dragmove="onLayerDragMove">
                <v-image :config="{
        x: 0,
        y: 0,
        width: WIDTH,
        height: HEIGHT,
        image: bgImage,

    }" />
                <v-group :config="{
        x: 1030,
        y: 650,
        width: 1855,
        height: 802
    }">

                    <v-group v-for="(item, i) in centerList" :key="i" :config="{
        y: 0,
        x: centerGroupX(i),
    }">
                        <Booth v-for="(booth, j) in item" :key="j" :item="booth" :length="item.length" :index="i" />
                        <v-text :config="{
        text: item[0].pre,
        fontSize: 34,
        fill: 'black',
        x: 0,
        y: (i === 7 || i === 8 || i === 19 || i === 20) ? 370 : 396
    }" />
                    </v-group>

                    <v-group :config="{
        width: 134,
        height: 370,
        x: 0,
        y: 432
    }">

                        <booth2 v-for="(item, i) in listCollection['アナログ']" :key="i" :position="{
        x: 68,
        y: i < 5 ? 30 + i * 20 + 11 * i : 30 + i * 20 + 11 * i + 42
    }" :item="item" />

                        <booth2 v-for="(item, i) in listCollection['デジタル']" :key="i" :item="item" :position="{
        x: 99,
        y: i < 5 ? 330 - i * 20 : 130 - (i - 5) * 20
    }" />
                    </v-group>
                </v-group>
                <v-group :config="{
        width: 229,
        height: 565,
        x: 3069,
        y: 895
    }">
                    <booth2 v-for="(item, i) in letterList[7].slice(8, 16).reverse()" :key="item.index" :position="{
        x: i < 7 ? i * 20 : i * 20 + 12,
        y: 0
    }" :item="item" />
                    <booth2 v-for="(item, i) in letterList[7].slice(0, 8)" :key="item.index" :position="{
        x: i < 7 ? i * 20 : i * 20 + 12,
        y: 20
    }" :item="item" />
                    <v-text :config="{
        text: 'H',
        fontSize: 34,
        x: 190,
        y: 6
    }" />

                    <booth2 v-for="(item, i) in letterList[6].slice(8, 16).reverse()" :key="item.index" :position="{
        x: i < 7 ? i * 20 : i * 20 + 12,
        y: 80
    }" :item="item" />
                    <booth2 v-for="(item, i) in letterList[6].slice(0, 8)" :key="item.index" :position="{
        x: i < 7 ? i * 20 : i * 20 + 12,
        y: 100
    }" :item="item" />
                    <v-text :config="{
        text: 'G',
        fontSize: 34,
        x: 190,
        y: 86
    }" />

                    <template v-for="(key, index) in 'FEDCB'" :key="key">
                        <booth2 v-for="(item, i) in letterList[5 - index].slice(8, 16).reverse()" :key="item.index"
                            :position="{
        x: i < 7 ? i * 20 : i * 20 + 12,
        y: 203 + index * 80
    }" :item="item" />
                        <booth2 v-for="(item, i) in letterList[5 - index].slice(0, 8)" :key="item.index" :position="{
        x: i < 7 ? i * 20 : i * 20 + 12,
        y: 223 + index * 80
    }" :item="item" />
                        <v-text :config="{
        text: key,
        fontSize: 34,
        x: 190,
        y: 209 + index * 80
    }" />
                    </template>

                </v-group>
                <v-group>
                    <v-text :config="{
        text: 'A',
        fontSize: 34,
        x: 3370,
        y: 1270
    }" />
                    <booth2 :position="{
        x: 3359,
        y: 1304
    }" :item="letterList[0][0]" />
                    <booth2 :position="{
        x: 3359,
        y: 1332
    }" :item="letterList[0][1]" />

                    <booth2 :position="{
        x: 3350,
        y: 1432
    }" :item="letterList[0][2]" />
                    <booth2 :position="{
        x: 3350,
        y: 1452
    }" :item="letterList[0][3]" />
                    <booth2 :position="{
        x: 3350,
        y: 1472
    }" :item="letterList[0][4]" />
                    <booth2 :position="{
        x: 3350,
        y: 1492
    }" :item="letterList[0][5]" />
                </v-group>
                <v-group>
                    <booth2 :item="listCollection['あ'][0]" :position="{
        x: 2941,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][1]" :position="{
        x: 2604,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][2]" :position="{
        x: 2584,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][3]" :position="{
        x: 2553,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][4]" :position="{
        x: 2533,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][5]" :position="{
        x: 2513,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][6]" :position="{
        x: 2425,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][7]" :position="{
        x: 2405,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][8]" :position="{
        x: 2192,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][9]" :position="{
        x: 2172,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][10]" :position="{
        x: 2107,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][11]" :position="{
        x: 2087,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][12]" :position="{
        x: 2067,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][13]" :position="{
        x: 2008,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][14]" :position="{
        x: 1988,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][15]" :position="{
        x: 1890,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][16]" :position="{
        x: 1860,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][17]" :position="{
        x: 1570,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][18]" :position="{
        x: 1550,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][19]" :position="{
        x: 1465,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][20]" :position="{
        x: 1445,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][21]" :position="{
        x: 1425,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][22]" :position="{
        x: 1345,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][23]" :position="{
        x: 1325,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][24]" :position="{
        x: 1117,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][25]" :position="{
        x: 1097,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][26]" :position="{
        x: 1032,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][27]" :position="{
        x: 1012,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][28]" :position="{
        x: 992,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][29]" :position="{
        x: 927,
        y: 1559
    }" />
                    <booth2 :item="listCollection['あ'][30]" :position="{
        x: 907,
        y: 1559
    }" />
                </v-group>
                <v-group>
                    <booth3 :item="listCollection['企業'][0]" :position="{ x: 240, y: 621 }"
                        :size="{ width: 90, height: 180 }" />
                    <booth3 :item="listCollection['企業'][1]" :position="{ x: 405, y: 666 }"
                        :size="{ width: 90, height: 45 }" />
                    <booth3 :item="listCollection['企業'][2]" :position="{ x: 405, y: 711 }"
                        :size="{ width: 90, height: 45 }" />
                    <booth3 :item="listCollection['企業'][3]" :position="{ x: 553, y: 675 }"
                        :size="{ width: 45, height: 45 }" />
                    <booth3 :item="listCollection['企業'][4]" :position="{ x: 598, y: 675 }"
                        :size="{ width: 45, height: 45 }" />
                    <booth3 :item="listCollection['企業'][5]" :position="{ x: 598, y: 720 }"
                        :size="{ width: 45, height: 45 }" />
                    <booth3 :item="listCollection['企業'][6]" :position="{ x: 553, y: 720 }"
                        :size="{ width: 45, height: 45 }" />
                    <booth3 :item="listCollection['企業'][7]" :position="{ x: 260, y: 876 }"
                        :size="{ width: 45, height: 90 }" />
                    <booth3 :item="listCollection['企業'][8]" :position="{ x: 400, y: 876 }"
                        :size="{ width: 90, height: 90 }" />
                    <booth3 :item="listCollection['企業'][9]" :position="{ x: 553, y: 876 }"
                        :size="{ width: 45, height: 45 }" />
                    <booth3 :item="listCollection['企業'][10]" :position="{ x: 598, y: 876 }"
                        :size="{ width: 45, height: 45 }" />
                    <booth3 :item="listCollection['企業'][11]" :position="{ x: 553, y: 921 }"
                        :size="{ width: 90, height: 45 }" />
                    <booth3 :item="listCollection['企業'][12]" :position="{ x: 775, y: 921 }"
                        :size="{ width: 90, height: 90 }" />
                    <booth3 :item="listCollection['企業'][13]" :position="{ x: 292, y: 1064 }"
                        :size="{ width: 45, height: 90 }" />
                    <booth3 :item="listCollection['企業'][14]" :position="{ x: 440, y: 1064 }"
                        :size="{ width: 45, height: 140 }" />
                    <booth3 :item="listCollection['企業'][15]" :position="{ x: 566, y: 1019 }"
                        :size="{ width: 45, height: 45 }" />
                    <booth3 :item="listCollection['企業'][16]" :position="{ x: 611, y: 1019 }"
                        :size="{ width: 45, height: 45 }" />
                    <booth3 :item="listCollection['企業'][17]" :position="{ x: 566, y: 1064 }"
                        :size="{ width: 90, height: 45 }" />
                    <booth3 :item="listCollection['企業'][18]" :position="{ x: 636, y: 1249 }"
                        :size="{ width: 180, height: 90 }" />
                    <booth3 :item="listCollection['企業'][19]" :position="{ x: 1298, y: 536 }"
                        :size="{ width: 45, height: 45 }" />
                    <booth3 :item="listCollection['企業'][20]" :position="{ x: 1513, y: 536 }"
                        :size="{ width: 45, height: 45 }" />
                    <booth3 :item="listCollection['企業'][21]" :position="{ x: 2372, y: 536 }"
                        :size="{ width: 45, height: 45 }" />
                </v-group>
            </v-layer>
        </v-stage>
    </div>

    <MapTabBar />

    <!-- <template v-if="!isScaleMode">
        <div class="arrow-left" @click="toLeft">
            <i class="iconfont icon-arrow-left-s-line" />
        </div>

        <div class="arrow-right" @click="toRight">
            <i class="iconfont icon-arrow-left-s-line" />
        </div>
    </template> -->


    <div class="scale-btn" @click="toggleScale">
        <i class="iconfont" :class="{
        'icon-expand-diagonal-fill': isScaleMode,
        'icon-collapse-diagonal-fill': !isScaleMode,
    }" @click="zoomIn" />
    </div>

    <div class="thumbnail" @touchmove="e => e.preventDefault()" :class="{
        isScaleMode: isScaleMode,
    }">
        <div class="indicator" :style="{
        width: `${(viewWidth / WIDTH) * 100}%`,
        height: `${(viewHeight / HEIGHT) * 100}%`,
        left: `${layerPos.x / WIDTH * 100}%`,
        top: `${layerPos.y / HEIGHT * 100}%`,
    }"></div>
    </div>

    <div class="marker" :style="{
        left: `${mapStore.markerPos?.x}px`,
        top: `${mapStore.markerPos?.y}px`,
    }" v-if="mapStore.showMarker"></div>

    <ShareMask v-model:show="showShare" />
</template>

<script setup>
import { ref, onMounted, provide, watchEffect, computed, onActivated } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useImage } from 'vue-konva'
import listCollection, { centerList, letterList } from './data/list'
import Booth from './components/BoothItem.vue'
import Booth2 from './components/BoothItem2.vue'
import Booth3 from './components/BoothItem3.vue'
import bg from '../../assets/img/convention/bg.webp'
import { store } from '@/utils/store'
import { useMapStore } from '@/store/'
import MapTabBar from './components/MapTabBar.vue'
import ShareMask from './components/ShareMask.vue'

Konva.pixelRatio = 1

const router = useRouter()
const route = useRoute()

defineOptions({
    name: 'Map'
})

const mapStore = useMapStore()

const showShare = ref(false)

const container = ref()
const stage = ref()
const layer = ref()

const WIDTH = 3575
const HEIGHT = 2550

const AREA_WIDTH = 413
const AREA_HEIGHT = 2550

const spliceWidth = [0, 413, 826, 1229, 1727, 2130, 2533, 2981]
let currentIndex = 2
let isScaleMode = ref(false)

const viewWidth = computed(() => innerWidth)
const viewHeight = computed(() => innerHeight)
const layerPos = ref({
    x: 0,
    y: 0,
})

const stageConfig = ref({
    width: WIDTH,
    height: HEIGHT,
    scaleX: 1,
    scaleY: 1,
    container: container.value,
    x: 0,
    y: 0,
    draggable: false,

})

const layerConfig = ref({
    x: 0,
    y: 0,
    draggable: true,
    dragBoundFunc: (pos) => {
        if (stageConfig.value.scaleX !== 1) {
            pos.x = 0
            pos.y = -HEIGHT * innerWidth / WIDTH / 2 + innerHeight / 2
            return pos
        }
        const minX = -(WIDTH - innerWidth)
        const minY = -(HEIGHT - innerHeight)
        const maxX = 0
        const maxY = 0

        pos.x = Math.min(maxX, Math.max(minX, pos.x))
        pos.y = Math.min(maxY, Math.max(minY, pos.y))

        return pos
    },
})

const [bgImage] = useImage(bg)

const centerGroupX = i => {
    if (i === 21) {
        return 1855 - 42 * (i + 1) - 33 * i - 220
    }
    return i >= 15 ? 1855 - 42 * (i + 1) - 33 * i - 175 : 1855 - 42 * (i + 1) - 33 * i
}

console.log('[center list]:', centerList)
console.log('[letter list]:', letterList)
console.log('[list collection]:', listCollection)

const share = () => {
    showShare.value = true
}

const toggleScale = () => {
    stageConfig.value.scaleX = stageConfig.value.scaleX === 1 ? innerWidth / WIDTH : 1
    stageConfig.value.scaleY = stageConfig.value.scaleY === 1 ? innerWidth / WIDTH : 1

    if (stageConfig.value.scaleX !== 1) {
        stageConfig.value.y = -HEIGHT * innerWidth / WIDTH / 2 + innerHeight / 2
        layer.value.getNode().position({
            x: 0,
            y: 0
        })

        isScaleMode.value = true
    } else {
        stageConfig.value.y = 0

        isScaleMode.value = false
    }
}

const jumpToArea = (e) => {
    const x = e.clientX
    const y = e.clientY
    console.log('x:', x)
    console.log('y:', y)
}

const onLayerDragMove = e => {
    layerPos.value = {
        x: -e.target.x(),
        y: -e.target.y(),
    }
}

onMounted(() => {
    mapStore.getFavoriteList()
    mapStore.getSignList()
})



watchEffect(() => {
    mapStore.clipX = layerConfig.value.clipX
})

provide('isScaleMode', isScaleMode)
provide('layer', layer)
</script>

<style lang="scss" scoped>
    .map-header {
        position: fixed;
        z-index: 3;
        top: 0;
        width: calc(100% - 1.75rem);
        height: 2.75rem;

        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: .5rem;
        padding: 0 .875rem;

        background-color: #fff;
        border-width: 0px 0px 1px 0px;
        border-style: solid;
        border-color: #F4F4F4;

        .iconfont {
            font-size: 1.25rem;
            font-weight: 400;
            color: #3d3d3d;
            border-radius: 50%;

            background-color: transparent;
            width: 2rem;
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .left {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: .5rem;

            .subject {
                font-size: .875rem;
                font-weight: 500;
                line-height: 1.5625rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin: 0 .5rem;
            }
        }

        .right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 1rem;

            .iconfont {
                color: #F20E61;
            }
        }
    }

    .booth-container {
        display: flex;
        align-items: stretch;
    }

    .separator {
        width: .4375rem;
        background-color: #f4f4f4;
    }

    .container {
        width: 100vw;
        height: 100vh;
        // overflow: hidden;
    }

    .arrow-left,
    .arrow-right {
        position: fixed;
        z-index: 3;
        top: 50%;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;

        transform: translateY(-50%);
        cursor: pointer;

        .iconfont {
            font-size: 1.25rem;
            color: #fff;

        }
    }

    .arrow-left {
        left: 1rem;

        .iconfont {
            transform: rotate(180deg);
        }
    }

    .arrow-right {
        right: 1rem;
    }

    .scale-btn {
        position: fixed;
        z-index: 3;
        bottom: 9.625rem;
        right: 1rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;

        .iconfont {
            font-size: 1.25rem;
            color: #fff;
        }
    }

    .thumbnail {
        width: 7.625rem;
        height: 5.4375rem;
        background-image: url('../../assets/img/convention/thumbnail.webp');
        background-size: cover;
        background-position: center;
        position: fixed;
        background-repeat: no-repeat;
        border: solid 0.125rem #4285F4;
        z-index: 3;
        right: 0.5rem;
        top: calc(4.125rem + env(safe-area-inset-top));
        box-sizing: content-box;
        transition: all 0.3s ease-in-out;

        .indicator {
            // height: 100%;
            border: solid 0.125rem #F20E61;
            box-sizing: border-box;
            position: relative;
            transition: all 0.3s ease-in-out;
        }

        &.isScaleMode {
            border-color: #F20E61;

            .indicator {
                display: none;
            }
        }
    }

    .marker {
        width: 4rem;
        height: 4rem;
        background-image: url('../../assets/img/convention/map-pin-fill@2x.webp');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: fixed;
        z-index: 99999;
    }
</style>
