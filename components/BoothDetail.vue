<script setup>
import { ref, onMounted } from 'vue'
import { message } from '@/utils/locale'
import { store } from '@/utils/store'
import { channel } from '@/utils/channel'
import { service } from '@/utils/http'
import { showToast } from '@/utils/dialog'
import { useMapStore } from '@/store'
const images = import.meta.glob('/src/assets/img/convention/*.webp', { eager: true });

const emit = defineEmits(['close']);

const mapStore = useMapStore();

const props = defineProps({
    booth: {
        type: Object,
        required: true
    }
});

const model = ref({
    isChecked: false,
    description: '',
    colors: ['red', 'yellow', 'lime', 'dodgerblue', 'purple', '#fff']
})
const selectedColor = ref(null);
const selectColor = (color) => {
    if (!store?.user?.id) {
        store.sign = true
        return
    }
    selectedColor.value = color;
    if (color === '#fff') {
        service('/comiccon/operation/delete', {
            type: 'favorite',
            booth: props.booth.code
        }, () => {
            showToast({
                text: message('success.action')
            })
            mapStore.getFavoriteList()
        })
    } else {
        service('/comiccon/operation/save', {
            type: 'favorite',
            booth: props.booth.code,
            value: `${color},${props.booth.name}`
        }, () => {
            showToast({
                text: message('success.action')
            })

            mapStore.getFavoriteList()
        })
    }

};

const getImagePath = (cover) => {
    const imageKey = Object.keys(images).find(key => key.includes(cover));
    return imageKey ? images[imageKey].default : null;
};

const check = () => {
    if (!store?.user?.id) {
        store.sign = true
        return
    }
    service(`/comiccon/operation/${model.value.isChecked ? 'delete' : 'save'}`, {
        type: 'sign',
        booth: props.booth.code,
    }, data => {
        model.value.isChecked = !model.value.isChecked;
        mapStore.getSignList()
    })
}

const toSite = (url) => {
    if (store.platform) {
        channel("launch", { url });
    } else {
        window.open(url, '_blank')
    }
}

const saveMemo = () => {
    service('/comiccon/operation/save', {
        type: 'memo',
        booth: props.booth.code,
        value: model.value.description
    }, () => {
        showToast({
            text: message('share.save.success')
        })
    })
}

onMounted(() => {
    service('/comiccon/operation/find', {
        booth: props.booth.code,
        type: 'memo'
    }, data => {
        model.value.description = data.value;
    })

    service('/comiccon/operation/find', {
        booth: props.booth.code,
        type: 'favorite'
    }, data => {
        if (!data.value) return;
        selectedColor.value = data.value.split(',')[0]
    })

    service('/comiccon/operation/find', {
        booth: props.booth.code,
        type: 'sign'
    }, data => {
        model.value.isChecked = data.booth === props.booth.code;
    })
})
</script>

<template>
    <div class="detail">
        <div class="check" :class="{ 'checked': model.isChecked }" @click="check">
            <i :class="['iconfont', model.isChecked ? ' icon-a-rongqi3' : ' icon-flag-2-fill']"></i>
            <span>{{ model.isChecked ? message('checkedBooth') : message('checkBooth') }}</span>
        </div>
        <div class="booth">
            <div class="booth_info">
                <i class="iconfont icon-store-3-fill"></i>
                <span class="booth_num">{{ booth.code }}</span>
                <span class="booth_penName"><i class="iconfont icon-user-fill"></i>{{ booth.penName }}</span>
                <span class="booth_name">{{ booth.name }}</span>
            </div>
            <div class="contacts">
                <div class="contact_icon" style="background-color: #231815;" v-if="booth.twitter"
                    @click="toSite(booth.twitter)">
                    <i class="iconfont icon-twitter"></i>
                </div>
                <div class="contact_icon" style="background-color: #0096FA;" v-if="booth.pixiv"
                    @click="toSite(booth.pixiv)">
                    <i class="iconfont icon-pixiv"></i>
                </div>
                <div class="contact_icon" style="background-color: #3d3d3d;" v-if="booth.site"
                    @click="toSite(booth.site)">
                    <i class="iconfont icon-global-line"></i>
                </div>
            </div>
            <div v-if="getImagePath(booth.cover)" class="booth_cover">
                <img :src="getImagePath(booth.cover)" :alt="booth.name">
            </div>
        </div>
        <div class="mark">
            <span class="title">{{ message('addMark') }}</span>
            <div class="colors">
                <div v-for="(color, index) in model.colors" :key="index" :class="{ selected: selectedColor === color }"
                    @click="selectColor(color)" :style="{ backgroundColor: color }" class="color-option">
                    <span v-if="color === '#fff'" class="empty-text">空</span>
                </div>
            </div>
        </div>
        <div class="memo">
            <span class="title">{{ message('addNote') }}</span>
            <el-input v-model="model.description" :placeholder="message('illustration.desc.check')" maxlength="500"
                show-word-limit :autosize="{ minRows: 4 }" type="textarea" @blur="saveMemo" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.detail {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1.125rem .5rem;
    gap: 1.125rem;
    box-sizing: border-box;

    .check {
        position: relative;
        left: 50%;
        transform: translateX(-50%);

        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 14.0625rem;
        padding: .625rem .75rem;
        gap: .25rem;
        border-radius: .4375rem;
        background: #FDE6EF;

        font-size: .9375rem;
        font-weight: 500;
        line-height: 1.0625rem;
        color: #F20E61;
        border: 1px solid #FDE6EF;

        transition: all 0.3s ease-in-out;

        .iconfont {
            font-size: 1rem;
            color: #F20E61;
        }
    }

    .checked {
        flex-direction: row-reverse;
        background: #fff;
        border: 1px solid #EBEBEB;
    }

    .booth {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .75rem;

        .booth_info {
            display: flex;
            flex-direction: column;
            align-items: center;

            .iconfont {
                font-size: 1.5rem;
                color: #3d3d3d;
            }

            .booth_num {
                font-size: 1.25rem;
                font-weight: 700;
                color: #3d3d3d;
            }

            .booth_penName {
                font-size: .875rem;
                font-weight: 500;
                color: #3d3d3d;

                .iconfont {
                    font-size: .875rem;
                    font-weight: 400;
                    color: #3d3d3d;
                }
            }

            .booth_name {
                font-size: .9375rem;
                font-weight: 500;
                color: #3d3d3d;
            }
        }

        .contacts {
            display: flex;
            align-items: center;
            gap: .5rem;

            .contact_icon {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 2.25rem;
                height: 2.25rem;
                border-radius: .4375rem;
            }

            .iconfont {
                font-size: 1.25rem;
                font-weight: 400;
                color: #fff;
            }
        }

        .booth_cover {
            width: 227px;
            height: 227px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .mark {
        display: flex;
        flex-direction: column;
        gap: .25rem;

        .title {
            font-size: .75rem;
            font-weight: 400;
            line-height: 1.0625rem;
            color: #3d3d3d;
        }

        .colors {
            display: flex;
            align-items: center;
            padding: .125rem;
            gap: .125rem;
            background: #F4F4F4;
            width: fit-content;

            .color-option {
                width: 1.5rem;
                height: 1.5rem;
                cursor: pointer;
            }

            .selected::after {
                font-family: "iconfont";
                content: "\e60f";
                font-size: 1.5rem;
                color: #fff;
            }

            .empty-text {
                position: relative;
                left: .25rem;
                color: black;
                font-size: .875rem;
            }
        }
    }

    .memo {
        display: flex;
        flex-direction: column;
        gap: .25rem;

        .title {
            font-size: .75rem;
            font-weight: 400;
            line-height: 1.0625rem;
            color: #3d3d3d;
        }
    }
}
</style>