<template>
    <div class="wrapper">
        <div class="banner b1" @click="$router.push('/comicConvention/map')">
            第二十二回博麗神社例大祭
            <div class="subtitle">2025年5月5日</div>
            <div class="subtitle">(非公式)</div>
        </div>
    </div>
    <div class="wrapper">
        <div class="banner b2" @click="showToast({ text: 'お楽しみに' })">
            Comic Market 106
            <div class="subtitle">開発中、お楽しみに</div>
            <div class="subtitle">(非公式)</div>
        </div>
    </div>
</template>

<script setup>
import { showToast } from "@/utils/dialog";
</script>

<style lang="scss" scoped>
    .wrapper {
        display: flex;
        gap: .5rem;
        flex-direction: column;
        margin: 0.5rem;
        justify-content: center;

        .banner {
            color: white;
            font-weight: 500;
            font-size: 1.5rem;
            text-align: center;
            width: 22.4375rem;
            height: 12.625rem;
            border-radius: 0.4375rem;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .subtitle {
                font-size: 1rem;
                font-weight: 500;
                color: white;
                text-align: center;
                margin-top: 0.75rem;
            }
        }

        .b1 {
            background-image: url('../../assets/img/convention/1@2x.webp');
        }

        .b2 {
            background-image: url('../../assets/img/convention/2@2x.webp');
        }
    }
</style>