<template>
    <van-action-sheet v-model:show="show" teleport="#booth-detail-container"
        :overlay-style="{ background: 'rgba(0, 0, 0, 0.3)' }" :style="{ maxHeight: '60%' }" @closed="onClosed">
        <div v-if="booths && booths.length">
            <div :class="{ 'booth-container': booths.length === 2 }">
                <!-- 循环渲染 BoothDetail 组件 -->
                <template v-for="(booth, index) in booths" :key="index">
                    <BoothDetail :booth="booth" />
                    <!-- 仅在有两条数据且当前索引为 0 时显示分隔线 -->
                    <div v-if="booths.length === 2 && index === 0" class="separator"></div>
                </template>
            </div>
        </div>
        <div v-else>
            <van-empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
                :description="message('user.nothing')" />
        </div>
    </van-action-sheet>
</template>

<script setup>
import { ref } from 'vue';
import { useMapStore } from '@/store'
import { message } from '@/utils/locale'
import BoothDetail from './BoothDetail.vue';

const mapStore = useMapStore()

const emits = defineEmits(['removeSelf'])

const props = defineProps({
    booths: Array,
});

const show = ref(true)

const onClosed = () => {
    emits('removeSelf')
    mapStore.showMarker = false
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
</script>

<style lang="scss" scoped>
    .booth-container {
        display: flex;
        align-items: stretch;
    }

    .separator {
        width: .4375rem;
        background-color: #f4f4f4;
    }
</style>