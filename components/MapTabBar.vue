<template>
    <footer>
        <div class="footer-item" @click="$router.push('/comicConvention/map/booth')">
            <div class="icon">
                <i class="iconfont icon-map-pin-range-line"></i>
            </div>
            <span>{{ message('markBooth') }}</span>
        </div>
        <div class="footer-item" @click="toSearch">
            <div class="icon">
                <i class="iconfont icon-search-2-line"></i>
            </div>
            <span>{{ message('searchBooth') }}</span>
        </div>
        <div class="footer-item" @click="randomSeat">
            <div class="icon">
                <i class="iconfont icon-dice-line"></i>
            </div>
            <span>{{ message('randomBooth') }}</span>
        </div>
    </footer>
</template>

<script setup>
import { message } from '@/utils/locale'
import { useRouter } from 'vue-router'
import { useMapStore } from '@/store'
import { prompt, showToast } from '@/utils/dialog'
import { trigger } from '@/utils/event'
import listCollection from '../data/list'

const router = useRouter()
const mapStore = useMapStore()

const toSearch = () => {
    mapStore.routerType = 'push'
    router.push({
        path: '/comicConvention/map/search'
    })
    // prompt({
    //     placeholder: '请输入摊位编号或社团名称',
    //     content: '搜索摊位',
    //     promptFunc: value => {
    //         // for (const pre in listCollection) {
    //         //     for (const boothList of listCollection[pre]) {
    //         //         for (const )
    //         //             if (info.code.includes(value) || info.name.includes(value)) {
    //         //                 router.push({
    //         //                     path: '/comicConvention/map',
    //         //                     query: {
    //         //                         booth: info.code
    //         //                     }
    //         //                 })

    //         //                 return
    //         //             }
    //         //     }
    //         // }

    //         // showToast({
    //         //     text: '未找到该摊位',
    //         // })
    //     }
    // })
}

const randomSeat = () => {
    const preKeys = Object.keys(listCollection)
    const pre = preKeys[Math.floor(Math.random() * preKeys.length)]

    const boothList = listCollection[pre]

    const booth = boothList[Math.floor(Math.random() * boothList.length)]

    trigger(`openDetail-${booth.pre}${booth.index}`, booth)
}
</script>

<style lang="scss" scoped>
    footer {
        position: fixed;
        bottom: 2.75rem;
        left: 50%;
        transform: translateX(-50%);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        column-gap: 1.25rem;
        max-width: 19.4375rem;
        padding: .75rem 1rem;
        border-radius: .4375rem;
        background: #fff;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
    }

    .footer-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: #F4F4F4;

            .iconfont {
                font-size: 1.5rem;
                color: #3d3d3d;
            }
        }

        span {
            margin-top: .25rem;
            font-size: .75rem;
            font-weight: 500;
            color: #3d3d3d;
            white-space: nowrap;
        }
    }
</style>