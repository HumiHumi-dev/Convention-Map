<template>
    <v-group :config="wrapperConfig" @tap="openDetail" ref="groupRef">
        <v-rect :config="colorConfig" />
        <v-rect :config="colorConfig2" />
        <v-rect :config="rectConfig" />
        <v-text :config="textConfig2" />
        <v-text :config="textConfig" />
        <v-image :config="imageConfig" v-if="isSigned" />
    </v-group>
</template>

<script setup>
import { ref, createVNode, render, inject, watchEffect, computed, onActivated, onMounted } from 'vue'
import { useImage } from 'vue-konva'
import { useRoute } from 'vue-router'
import { useMapStore } from '@/store/'
import { store } from '@/utils/store'
import { listen } from '@/utils/event'
import BoothDetailSheet from './BoothDetailSheet.vue'
import FlagImg from '@/assets/img/convention/flag.webp'

const isScaleMode = inject('isScaleMode', false)
const layerRef = inject('layer', null)

const mapStore = useMapStore()
const route = useRoute()

const [signImg] = useImage(FlagImg)

const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    },
    position: {
        type: Object,
        default: () => ({
            x: 0,
            y: 0
        })
    },
    size: {
        type: Object,
        default: () => ({
            width: 45,
            height: 45
        })
    }
})

const groupRef = ref(null)

const color = ref([])

const isSigned = ref(false)

const wrapperConfig = ref({
    x: props.position.x,
    y: props.position.y,
})

const rectConfig = ref({
    x: 0,
    y: 0,
    width: props.size.width,
    height: props.size.height,
    stroke: 'black',
})

const getTextConfig = (offsetY = 0, text = '') => {
    const rect = rectConfig.value;
    // 計算文字的中心位置 - 文本宽高
    const centerX = rect.x + rect.width / 2 - 15;
    const centerY = rect.y + rect.height / 2 - 15;

    return {
        fontSize: 16,
        fill: 'black',
        x: centerX,
        y: centerY + offsetY,
        text,
    };
};

const textConfig2 = computed(() => getTextConfig(0, '企業'));
const textConfig = computed(() => getTextConfig(16, props.item.index));

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
    width: props.size.width,
    height: props.size.height,
})

const colorConfig2 = ref({
    x: 10,
    y: 0,
    width: 10,
    height: 20,
})

const openDetail = () => {
    if (isScaleMode.value) {
        return
    }

    const position = groupRef.value.getNode().getAbsolutePosition()
    if (innerWidth > 768) {
        if (position.y - window.scrollY - 80 + store.padding.top > innerHeight - 680) {
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
        if (position.y - 60 - window.scrollY + store.padding.top > innerHeight - 650) {
            window.scrollTo({
                top: position.y - 60 - (innerHeight - 650),
                behavior: 'instant'
            })
        }
        mapStore.setMarkerPos({
            x: position.x - window.scrollX,
            y: position.y - window.scrollY - 60 + store.padding.top
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

        isSigned.value = flag > 0

        if (color.value.length === 1) {
            colorConfig.value.fill = color.value[0]
            colorConfig2.value.fill = color.value[0]
        } else if (color.value.length === 2) {
            colorConfig.value.fill = color.value[0]
            colorConfig2.value.fill = color.value[1]
        } else {
            colorConfig.value.fill = 'transparent'
            colorConfig2.value.fill = 'transparent'
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
            index = `${booth[1]}${booth[2]}`
            pre = booth[0]
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