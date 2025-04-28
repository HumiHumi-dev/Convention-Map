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
import { ref, createVNode, render, inject, watchEffect, onActivated, onMounted } from 'vue'
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
    }
})

const groupRef = ref(null)

const color = ref([])

const isSigned = ref(false)

const wrapperConfig = ref({
    x: props.position.x,
    y: props.position.y,
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
            x: position.x - 40,
            y: position.y - window.scrollY - 80 + store.padding.top
        })
    } else {
        if (position.y - 60 - window.scrollY + store.padding.top > innerHeight - 680) {
            window.scrollTo({
                top: position.y - 60 - (innerHeight - 680),
                behavior: 'instant'
            })
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

        isSigned.value = flag > 0

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