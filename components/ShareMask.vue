<script setup>
import { message } from '@/utils/locale'
import { ref, inject } from 'vue'
import { album } from '@/utils/album'
import { copy2clipboard } from '@/utils/clipboard';
import { showToast} from '@/utils/dialog'
// import { store } from "@/utils//store";
// import { channel } from "@/utils/channel";
import LogoImg from '@/assets/img/logoText.webp'
// import MapImg from '@/assets/img/convention/map.jpg?url'

const layerRef = inject('layer')

const show = defineModel('show')

const cardRef = ref()

const copy = async () => {
    await copy2clipboard(window.location.href);
    showToast({ type: 'success', text: message('share.copy.success') });
}

const save = async () => {
    const blob = await layerRef.value.getNode().toBlob({})
    album(blob)
    showToast({
        type: 'success',
        text: message('share.save.success')
    })
}
</script>

<template>
    <Transition name="slide-fade">
        <van-config-provider :theme-vars="{
            overlayBackground: 'rgba(0, 0, 0, 0.5)'
        }">
        <van-overlay :show="show" class="wrapper" @click="show = false">
            <div class="card" ref="cardRef">
                <div class="img">
                    <img src="../../../assets/img/convention/small-size.webp" alt="">
                </div>
                <div class="footer">
                    <div class="logo">
                        <img :src="LogoImg" alt="HumiHumi">
                    </div>
                    <div class="tip">
                        <span>{{ message('shareImgTip') }}</span>
                    </div>
                </div>
            </div>

            <div class="action" @click="show = false">
                <div class="btn" @click.stop="copy">
                    <div class="icon">
                        <i class="iconfont icon-link-m"></i>
                    </div>
                    {{ message('share.copylink') }}
                </div>

                <div class="btn" @click.stop="save">
                    <div class="icon">
                        <i class="iconfont icon-download-line"></i>
                    </div>
                    {{ message('share.savephoto') }}
                </div>
            </div>
        </van-overlay>
        </van-config-provider>
    </Transition>


</template>

<style lang="scss" scoped>
.wrapper {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
}

.mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.85) 100%);
}

.card {
    background-color: white;
    border-radius: .4375rem;
    max-width: 90vw;
    margin: 5.25rem auto 0;
    position: relative;
    padding: 1rem;
    box-sizing: border-box;
    // display: flex;

    .img {
        width: auto;
        height: auto;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }


    .footer {
        display: flex;
        justify-content: space-between;
        padding-top: 1rem;

        .logo {
            width: 6.625rem;
            height: 1.25rem;
            align-self: flex-end;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        .tip {
            font-size: .625rem;
            font-weight: 400;
            line-height: 1.125rem;
            color: #959595;
        }
    }
}

.action {
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 1.625rem;
    gap: 6.25rem;

    .btn {
        display: flex;
        flex-direction: column;
        font-size: 0.875rem;
        color: white;
        font-weight: 500;
        gap: .875rem;
        justify-content: center;
        align-items: center;

        .icon {
            width: 2.875rem;
            height: 2.875rem;
            border-radius: 50%;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;

            .iconfont {
                font-size: 1.5rem;
                color: #F20E61;
            }
        }


    }
}

/*转场动画*/
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(5rem);
    opacity: 0;
}
</style>