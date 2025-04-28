<template>
    <li>
        <div class="left">
            <span class="box" :style="{ backgroundColor: booth.color }">

            </span>
            <div class="info">
                <span>{{ booth.name }}</span>
                <span>{{ booth.booth }}</span>
            </div>
        </div>
        <div class="icons">

            <div class="flag" v-if="signList.findIndex(item => item.booth === booth.booth) > -1"></div>
            <i class="iconfont icon-map-pin-line" @click="toBooth"></i>
            <i class="iconfont icon-delete-bin-6-fill" @click="deleteItem"></i>
        </div>
    </li>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { confirm, showToast } from '@/utils/dialog'
import { message } from '@/utils/locale'
import { service } from '@/utils/http'
import { useMapStore } from '@/store'

const router = useRouter()
const mapStore = useMapStore()

const emit = defineEmits(['refresh'])

const props = defineProps({
    booth: {
        type: Object,
        required: true
    },
    signList: {
        type: Array,
        default: () => []
    }
});

const deleteItem = () => {
    confirm({
        content: message('deleteConfirm'),
        confirmButtonText: message('delete'),
        confirmButtonColor: '#FF3333',
        cancelButtonText: message('cancel'),
        confirm: () => {
            service('/comiccon/operation/delete', {
                type: 'favorite',
                booth: props.booth.booth,
            }, () => {
                showToast({
                    text: message('deleteSuccess'),
                })
                emit('refresh')
            })
        },
    })
};

const toBooth = () => {
    mapStore.routerType = 'push'
    router.push({
        path: '/comicConvention/map',
        query: {
            booth: props.booth.booth
        }
    })
};
</script>

<style lang="scss" scoped>
    li {
        width: calc(100% - 1.875rem);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .left {
        display: flex;

        .box {
            width: 2.25rem;
            height: 2.25rem;
            margin-right: 1rem;
            display: block;


        }

        .info {
            display: flex;
            flex-direction: column;
            gap: .5rem;

            span:first-child {
                font-size: .9375rem;
                font-weight: 500;
                line-height: 1rem;
                color: #3D3D3D;
            }

            span:last-child {
                font-size: .625rem;
                font-weight: 400;
                line-height: .75rem;
                color: #959595;
            }
        }
    }

    .icons {
        display: flex;
        align-items: center;

        .iconfont {
            font-size: 1.5rem;
            color: #959595;
            margin-left: .5rem;
        }

        .flag {
            width: 1rem;
            height: 1rem;
            background-image: url(../../../assets/img/convention/flag.webp);
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
    }
</style>