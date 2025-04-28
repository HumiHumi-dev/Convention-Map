<template>
    <div class="header" :style="{ paddingTop: store.safeAreaTop }">
        <div class="back" @click="back">
            <i class="iconfont icon-arrow-left-line" />
        </div>

        <input class="input" type="text" :placeholder="message('search_booth')" v-model="keyword" />

        <div class="search" @click="search">
            {{ message('search') }}
        </div>
    </div>

    <div class="block"></div>

    <div class="list">
        <div v-for="booth in booths" :key="booth.code" class="list-item">
            <div class="list-item-info">
                <div class="title">{{ booth.code }}</div>
                <div class="subtitle">{{ booth.name }}</div>
                <div class="subtitle"> {{ booth.penName }}</div>
            </div>
            <i class="iconfont icon-map-pin-line" @click="toBooth(booth)"></i>
        </div>
        <van-empty v-if="booths.length === 0"
            image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
            :description="message('user.nothing')" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMapStore } from '@/store'
import { message } from '@/utils/locale'
import { store } from '@/utils/store'
import listCollection from './data/list'

const mapStore = useMapStore();
const router = useRouter()

const keyword = ref('')

const booths = ref([])

const back = () => {
    mapStore.routerType = 'back'
    router.back()
}

const search = () => {
    booths.value = []
    for (const pre in listCollection) {
        for (const booth of listCollection[pre]) {
            if (booth.info) {
                for (const info of booth.info) {
                    console.log(info)
                    if (info.code.includes(keyword.value) || info.name.includes(keyword.value) || info.penName.includes(keyword.value)) {
                        console.log('add')
                        booths.value.push(info)
                    }
                }
            }
        }

    }
}

const toBooth = (item) => {
    mapStore.routerType = 'push'
    router.push({
        path: '/comicConvention/map',
        query: {
            booth: item.code
        }
    })
};
</script>

<style lang="scss" scoped>
    .header {
        position: fixed;
        z-index: 3;
        top: 0;
        width: calc(100% - 1.75rem);
        height: 2.75rem;
        box-sizing: content-box;

        display: flex;
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

        .input {
            border-radius: 10rem;
            border: none;
            background-color: #F4F4F4;
            height: 1.75rem;
            flex: 1;
            padding: 0 1rem;
            font-size: 0.875rem;
            color: #3d3d3d;
        }

        .search {
            font-size: 0.875rem;
            color: #3d3d3d;
        }
    }

    .block {
        height: 2.75rem;
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 0.875rem;

        .list-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem;
            background-color: white;
            border-radius: 0.5rem;

            .list-item-info {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                font-size: 0.875rem;
                color: #3d3d3d;

                .title {
                    font-size: 1rem;
                    font-weight: 700;
                }

                .subtitle {
                    font-size: 0.875rem;
                    color: #959595;
                }
            }

            .iconfont {
                font-size: 1.5rem;
                color: #959595;
                margin-left: .5rem;
            }
        }
    }
</style>