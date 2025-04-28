<template>
    <div class="header" :style="{ paddingTop: store.safeAreaTop }">
        <i class="iconfont icon-arrow-left-line" @click="back"></i>
        <span>{{ message('markedBooth') }}</span>
        <i class="iconfont icon-arrow-left-line" style="visibility: hidden;"></i>
    </div>
    <div class="block" :style="{ paddingTop: store.safeAreaTop }"></div>
    <div class="list">
        <van-loading color="#F20E61" v-if="isLoading" />
        <BoothListItem v-for="(booth, index) in booths" :key="booth.code" :booth="booth" :signList="signList"
            @refresh="getList" />
        <van-empty v-if="!isLoading && booths.length === 0"
            image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
            :description="message('user.nothing')" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { message } from '@/utils/locale'
import { store } from '@/utils/store'
import { service } from '@/utils/http'
import { useMapStore } from '@/store'
import { useRouter } from 'vue-router'
import BoothListItem from './components/BoothListItem.vue';

const router = useRouter()
const mapStore = useMapStore()

const booths = ref([])

const signList = ref([])

const isLoading = ref(true)

const getList = () => {
    service('/comiccon/operation/query', {
        type: 'favorite',
        pageSize: 1024,
        pageNum: 1
    }, data => {
        booths.value = data.list.map(item => {
            item.color = item.value.split(',')[0]
            item.name = item.value.split(',').splice(1).join(',')
            return item
        })

        isLoading.value = false
    })
}

const getSignList = () => {
    service('/comiccon/operation/query', {
        type: 'sign',
        pageSize: 1024,
        pageNum: 1
    }, data => {
        signList.value = data.list
    })
}

const back = () => {
    mapStore.routerType = 'back'
    router.back()
}

onMounted(() => {
    getList()
    getSignList()
})
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        color: #3d3d3d;

        background-color: #fff;
        position: fixed;
        top: 0;
        width: calc(100% - 1.75rem);
        box-sizing: content-box;
        height: 2.75rem;

        .iconfont {
            font-size: 1.5rem;
        }

        & span {
            font-size: 0.9375rem;
            font-weight: 500;
            line-height: 1.0625rem;
            text-align: center;
        }
    }

    .block {
        height: 2.75rem;
    }

    .list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1.125rem 0rem;
        gap: 1.5rem;
        border-radius: .4375rem;
        background: #fff;
        margin: .5rem;
    }
</style>