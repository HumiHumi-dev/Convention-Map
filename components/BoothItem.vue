<template>
    <v-group :config="wrapperConfig" @tap="openDetail" ref="groupRef">
        <v-rect :config="colorConfig" />
        <v-rect :config="colorConfig2" />
        <v-rect :config="rectConfig" />
        <v-text :config="textConfig" />
        <v-image :config="imageConfig" v-if="isSigned" />
    </v-group>
</template>

<script setup>
import { ref, computed, render, createVNode, inject, watchEffect, onActivated, onMounted } from 'vue'
import { useImage } from 'vue-konva'
import { useRoute } from 'vue-router'
import { useMapStore } from '@/store/'
import { store } from '@/utils/store'
import { listen } from '@/utils/event'
import BoothDetailSheet from './BoothDetailSheet.vue'
import FlagImg from '@/assets/img/convention/flag.webp'

const isScaleMode = inject('isScaleMode', false)
const layerRef = inject('layer')

const mapStore = useMapStore()
const route = useRoute()

const [signImg] = useImage(FlagImg)

const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    },
    length: {
        type: Number,
        default: 0
    },
    index: {
        type: Number,
        default: 0
    }
})

const half = computed(() => {
    return props.length / 2
})

const groupRef = ref(null)

const color = ref([])

const isSigned = ref(false)

const wrapperConfig = ref({
    x: (() => {
        if (props.item.index > half.value) {
            return 0
        } else {
            return 20
        }
    })(),
    y: (() => {
        if (props.index === 21) {
            if (props.item.index === 15 || props.item.index === 14) {
                return 30
            }

            if (props.item.index >= 9 && props.item.index <= 13) {
                return 30 + 11 + 20 * (14 - props.item.index)
            }

            if (props.item.index >= 16 && props.item.index <= 20) {
                return 30 + 11 + 20 * (props.item.index - 15)
            }

            if (props.item.index === 21 || props.item.index === 8) {
                return 30 + 11 * 2 + 20 * 6
            }

            if (props.item.index === 22 || props.item.index === 7) {
                return 30 + 11 * 2 + 20 * 7 + 24
            }

            if (props.item.index >= 2 && props.item.index <= 6) {
                return 30 + 11 * 3 + 24 + 20 * (14 - props.item.index)
            }

            if (props.item.index >= 23 && props.item.index <= 27) {
                return 30 + 11 * 3 + 24 + 20 * (props.item.index - 15)
            }

            if (props.item.index === 28 || props.item.index === 1) {
                return 30 + 11 * 4 + 24 + 20 * 13
            }
        }

        if (props.index === 20) {
            if (props.item.index === 1 || props.item.index === 22) {
                return 802 - 460
            }

            if (props.item.index >= 2 && props.item.index <= 5) {
                return 802 - 460 - 20 * (props.item.index - 1) - 11
            }

            if (props.item.index >= 18 && props.item.index <= 21) {
                return 802 - 460 - 20 * (22 - props.item.index) - 11
            }

            if (props.item.index === 17 || props.item.index === 6) {
                return 802 - 460 - 20 * 5 - 11 * 2
            }

            if (props.item.index === 7 || props.item.index === 16) {
                return 802 - 460 - 20 * 6 - 11 * 2 - 24
            }

            if (props.item.index >= 8 && props.item.index <= 10) {
                return 802 - 460 - 20 * 6 - 20 * (props.item.index - 7) - 11 * 3 - 24
            }

            if (props.item.index >= 13 && props.item.index <= 15) {
                return 802 - 460 - 20 * 6 - 20 * (16 - props.item.index) - 11 * 3 - 24
            }

            if (props.item.index === 11 || props.item.index === 12) {
                return 802 - 460 - 20 * 11 - 11 * 4
            }
        }


        if (props.index >= 7 && props.index <= 8 || props.index === 19) {
            if (props.item.index === 1 || props.item.index === 44) {
                return 802 - 63
            }
            if (props.item.index >= 2 && props.item.index <= 4) {
                return 802 - 62 - 11 - (props.item.index - 1) * 20
            }

            if (props.item.index >= 41 && props.item.index <= 43) {
                return 802 - 62 - 11 - 20 * (44 - props.item.index)
            }

            if (props.item.index === 5 || props.item.index === 40) {
                return 802 - 62 - 11 - 20 * 4 - 11
            }

            if (props.item.index === 6 || props.item.index === 39) {
                return 802 - 62 - 11 - 20 * 5 - 11 - 24
            }

            if (props.item.index >= 7 && props.item.index <= 10) {
                return 802 - 62 - 20 * 5 - 24 - 20 * (props.item.index - 6) - 11 * 3
            }

            if (props.item.index >= 35 && props.item.index <= 38) {
                return 802 - 62 - 20 * 5 - 24 - 20 * (39 - props.item.index) - 11 * 3
            }

            if (props.item.index === 11 || props.item.index === 34) {
                return 802 - 62 - 20 * 10 - 24 - 11 * 4
            }

            if (props.item.index === 12 || props.item.index === 33) {
                return 802 - 460
            }

            if (props.item.index >= 13 && props.item.index <= 16) {
                return 802 - 460 - 20 * (props.item.index - 12) - 11
            }

            if (props.item.index >= 29 && props.item.index <= 32) {
                return 802 - 460 - 20 * (33 - props.item.index) - 11
            }

            if (props.item.index === 17 || props.item.index === 28) {
                return 802 - 460 - 20 * 5 - 11 * 2
            }

            if (props.item.index === 18 || props.item.index === 27) {
                return 802 - 460 - 20 * 6 - 11 * 2 - 24
            }

            if (props.item.index >= 19 && props.item.index <= 21) {
                return 802 - 460 - 20 * 6 - 20 * (props.item.index - 18) - 11 * 3 - 24
            }

            if (props.item.index >= 24 && props.item.index <= 26) {
                return 802 - 460 - 20 * 6 - 20 * (27 - props.item.index) - 11 * 3 - 24
            }

            if (props.item.index === 22 || props.item.index === 23) {
                return 802 - 460 - 20 * 11 - 11 * 4
            }
        }

        if (props.index >= 9 && props.index <= 18) {
            if (props.item.index >= 51 && props.item.index <= 55) {
                return 802 - 20 * (props.length - props.item.index + 1) - 11
            }

            if (props.item.index === 50) {
                return 802 - 20 * (props.length - props.item.index + 1) - 11 * 2
            }

            if (props.item.index === 49) {
                return 802 - 20 * (props.length - 49 + 1) - 11 * 2 - 24
            }

            if (props.item.index >= 44 && props.item.index <= 48) {
                return 802 - 20 * (props.length - 49 + 1) - 11 * 2 - 24 - 20 * (49 - props.item.index) - 11
            }

            if (props.item.index === 43) {
                return 802 - 20 * (props.length - 49 + 1) - 11 * 2 - 24 - 20 * (49 - props.item.index) - 11 * 2
            }

            if (props.item.index === 42) {
                return 802 - 20 * (props.length - 49 + 1) - 11 * 2 - 24 - 20 * (49 - props.item.index) - 11 * 2 - 76
            }

            if (props.item.index >= 37 && props.item.index <= 41) {
                return 802 - 20 * (props.length - 49 + 1) - 11 * 2 - 24 - 20 * (49 - 42) - 11 * 2 - 76 - 20 * (42 - props.item.index) - 11
            }

            if (props.item.index === 36) {
                return 802 - 20 * (props.length - 49 + 1) - 11 * 2 - 24 - 20 * (49 - 42) - 11 * 2 - 76 - 20 * (42 - props.item.index) - 11 * 2
            }

            if (props.item.index === 35) {
                return 802 - 20 * (props.length - 49 + 1) - 11 * 2 - 24 - 20 * (49 - 42) - 11 * 2 - 76 - 20 * (42 - props.item.index) - 11 * 2 - 24
            }

            if (props.item.index >= 23 && props.item.index <= 27) {
                return 802 - 20 * 8 - 11 * 2 - 24 - 20 * (15 - 8) - 11 * 2 - 76 - 20 * (22 - 15) - 11 * 2 - 24 - 20 * (props.item.index - 22) - 11
            }

            if (props.item.index >= 30 && props.item.index <= 34) {
                return 802 - 20 * (props.length - 49 + 1) - 11 * 2 - 24 - 20 * (49 - 42) - 11 * 2 - 76 - 20 * (42 - 35) - 11 * 2 - 24 - 20 * (35 - props.item.index) - 11
            }

            if (props.item.index === 28) {
                return 802 - 20 * 8 - 11 * 2 - 24 - 20 * (15 - 8) - 11 * 2 - 76 - 20 * (22 - 15) - 11 * 2 - 24 - 20 * (props.item.index - 22) - 11 * 2
            }

            if (props.item.index === 29) {
                return 802 - 20 * (props.length - 49 + 1) - 11 * 2 - 24 - 20 * (49 - 42) - 11 * 2 - 76 - 20 * (42 - 35) - 11 * 2 - 24 - 20 * (35 - props.item.index) - 11 * 2
            }
        }

        if (props.item.index >= 2 && props.item.index <= 6) {
            return 802 - 20 * props.item.index - 11
        }

        if (props.item.index >= 47 && props.item.index <= 51) {
            return 802 - 20 * (props.length - props.item.index + 1) - 11
        }

        if (props.item.index === 7) {
            return 802 - 20 * 7 - 11 * 2
        }

        if (props.item.index === 46) {
            return 802 - 20 * (props.length - props.item.index + 1) - 11 * 2
        }

        if (props.item.index === 8) {
            return 802 - 20 * 8 - 11 * 2 - 24
        }

        if (props.item.index === 45) {
            return 802 - 20 * (props.length - 45 + 1) - 11 * 2 - 24
        }

        if (props.item.index >= 9 && props.item.index <= 13) {
            return 802 - 20 * 8 - 11 * 2 - 24 - 20 * (props.item.index - 8) - 11
        }

        if (props.item.index >= 40 && props.item.index <= 44) {
            return 802 - 20 * (props.length - 45 + 1) - 11 * 2 - 24 - 20 * (45 - props.item.index) - 11
        }

        if (props.item.index === 14) {
            return 802 - 20 * 8 - 11 * 2 - 24 - 20 * (props.item.index - 8) - 11 * 2
        }

        if (props.item.index === 39) {
            return 802 - 20 * (props.length - 45 + 1) - 11 * 2 - 24 - 20 * (45 - props.item.index) - 11 * 2
        }

        if (props.item.index === 15) {
            return 802 - 20 * 8 - 11 * 2 - 24 - 20 * (props.item.index - 8) - 11 * 2 - 76
        }

        if (props.item.index === 38) {
            return 802 - 20 * (props.length - 45 + 1) - 11 * 2 - 24 - 20 * (45 - props.item.index) - 11 * 2 - 76
        }

        if (props.item.index >= 16 && props.item.index <= 20) {
            return 802 - 20 * 8 - 11 * 2 - 24 - 20 * (15 - 8) - 11 * 2 - 76 - 20 * (props.item.index - 15) - 11
        }

        if (props.item.index >= 33 && props.item.index <= 37) {
            return 802 - 20 * (props.length - 45 + 1) - 11 * 2 - 24 - 20 * (45 - 38) - 11 * 2 - 76 - 20 * (38 - props.item.index) - 11
        }

        if (props.item.index === 21) {
            return 802 - 20 * 8 - 11 * 2 - 24 - 20 * (15 - 8) - 11 * 2 - 76 - 20 * (props.item.index - 15) - 11 * 2
        }

        if (props.item.index === 32) {
            return 802 - 20 * (props.length - 45 + 1) - 11 * 2 - 24 - 20 * (45 - 38) - 11 * 2 - 76 - 20 * (38 - props.item.index) - 11 * 2
        }

        if (props.item.index === 22) {
            return 802 - 20 * 8 - 11 * 2 - 24 - 20 * (15 - 8) - 11 * 2 - 76 - 20 * (props.item.index - 15) - 11 * 2 - 24
        }

        if (props.item.index === 31) {
            return 802 - 20 * (props.length - 45 + 1) - 11 * 2 - 24 - 20 * (45 - 38) - 11 * 2 - 76 - 20 * (38 - props.item.index) - 11 * 2 - 24
        }

        if (props.item.index >= 23 && props.item.index <= 25) {
            return 802 - 20 * 8 - 11 * 2 - 24 - 20 * (15 - 8) - 11 * 2 - 76 - 20 * (22 - 15) - 11 * 2 - 24 - 20 * (props.item.index - 22) - 11
        }

        if (props.item.index <= 30 && props.item.index >= 28) {
            return 802 - 20 * (props.length - 45 + 1) - 11 * 2 - 24 - 20 * (45 - 38) - 11 * 2 - 76 - 20 * (38 - 31) - 11 * 2 - 24 - 20 * (31 - props.item.index) - 11
        }

        if (props.item.index === 26) {
            return 802 - 20 * 8 - 11 * 2 - 24 - 20 * (15 - 8) - 11 * 2 - 76 - 20 * (22 - 15) - 11 * 2 - 24 - 20 * (props.item.index - 22) - 11 * 2
        }

        if (props.item.index === 27) {
            return 802 - 20 * (props.length - 45 + 1) - 11 * 2 - 24 - 20 * (45 - 38) - 11 * 2 - 76 - 20 * (38 - 31) - 11 * 2 - 24 - 20 * (31 - props.item.index) - 11 * 2
        }



        if (props.item.index > half.value) {
            return 802 - 20 * (props.length - props.item.index + 1)
        }

        return 802 - 20 * props.item.index
    })(),
})

const textConfig = {
    fontSize: 12,
    fill: 'black',
    x: 0,
    y: 4,
    text: props.item.index,
    align: 'center',
    width: 20,
    height: 20
}

const rectConfig = ref({
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    stroke: 'black',
})

const imageConfig = ref({
    x: 5,
    y: -4,
    width: 16,
    height: 16,
    image: signImg
})

const colorConfig = ref({
    x: 0,
    y: 0,
    width: 10,
    height: 20,
})

const colorConfig2 = ref({
    x: 10,
    y: 0,
    width: 10,
    height: 20,
})

const openDetail = () => {
    if (isScaleMode.value) return

    const position = groupRef.value.getNode().getAbsolutePosition()
    if (innerWidth > 768) {
        if (position.y - window.scrollY - 80 + store.padding.top > innerHeight - 680) {
            // layerRef.value.getNode().y(-position.y + (innerHeight - 680))
            window.scrollTo({
                top: position.y - (innerHeight - 680),
                behavior: 'instant'
            })
        }
        mapStore.setMarkerPos({
            x: position.x - 40 - window.scrollX,
            y: position.y - window.scrollY - 80 + store.padding.top
        })
    } else {
        if (position.y - 60 - window.scrollY + store.padding.top > innerHeight - 680) {
            window.scrollTo({
                top: position.y - 60 - (innerHeight - 680),
                behavior: 'instant'
            })
            // layerRef.value.getNode().y(-position.y + (innerHeight - 680) - 60)
        }
        mapStore.setMarkerPos({
            x: position.x - 20 - window.scrollX,
            y: position.y - 60 - window.scrollY + store.padding.top
        })
    }


    const container = document.createElement('div')
    container.id = 'booth-detail-container'
    document.body.appendChild(container)
    render(createVNode(BoothDetailSheet, {
        booths: props.item.info,
        onRemoveSelf: () => {
            document.body.removeChild(container)
        }
    }), container)


}

const positionBooth = () => {
    const position = groupRef.value.getNode().getAbsolutePosition()
    const layerPosition = layerRef.value.getNode().getAbsolutePosition()
    layerRef.value.getNode().position({
        x: - position.x + innerWidth / 2 + layerPosition.x,
        y: - position.y + innerHeight / 2 + layerPosition.y,
    })
    groupRef.value.getNode().fire('tap')
}

watchEffect(() => {
    if (props?.item?.info?.length) {

        color.value = []
        let flag = 0
        props.item.info.forEach((item) => {
            const favItem = mapStore.favoriteList.find(fav => fav.booth === item.code)
            if (favItem) {
                color.value.push(favItem.value.split(',')[0])
            }

            const signItem = mapStore.signList.find(sign => sign.booth === item.code)
            if (signItem) {
                flag++
            }

        })

        if (flag > 0) {
            isSigned.value = true
        } else {
            isSigned.value = false
        }

        if (color.value.length === 1) {
            colorConfig.value.fill = color.value[0]
            colorConfig2.value.fill = color.value[0]
        } else if (color.value.length === 2) {
            colorConfig.value.fill = color.value[0]
            colorConfig2.value.fill = color.value[1]
        } else {
            colorConfig.value.fill = 'white'
            colorConfig2.value.fill = 'white'
        }
    }

})

onActivated(() => {
    if (route.query.booth && mapStore.routerType === 'push') {
        const booth = route.query.booth
        let index
        let pre
        if (/^\d+$/.test(booth)) {
            index = booth
            pre = '企業'
        } else {
            pre = booth.match(/(?<pre>[\u3040-\u309F\u30A0-\u30FFA-Z]+)/).groups.pre
            index = booth.match(/(?<index>\d+)/).groups.index
        }

        if (Number(index) === props.item.index && pre === props.item.pre) {
            positionBooth()
        }
    }
})

onMounted(() => {
    listen(`openDetail-${props.item.pre}${props.item.index}`, data => {
        if (data.index === props.item.index && data.pre === props.item.pre) {
            positionBooth()
        }
    })
})
</script>

<style lang="scss" scoped></style>