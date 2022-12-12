<template>
    <div>
        <canvas class="myClouds" height="240" ref="myClouds"></canvas>
        <HeaderVue></HeaderVue>
            <router-view />
        <FooterVue></FooterVue>
    </div>
</template>

<script setup lang="ts">

import * as klouds from 'klouds'   
import { Get } from '@/api/requerst';
import { onMounted, ref } from '@vue/runtime-core';
import HeaderVue from '@/components/Header/PageHeader.vue';
import FooterVue from '@/components/Footer/Footer.vue';
const myClouds = ref(null)
onMounted(()=>{
    const canvas = myClouds.value as unknown as HTMLCanvasElement
    const instance = klouds.create({
        selector:canvas,
        layerCount: 8,
        speed: 1,
    });
    instance.setCloudColor1('#1ab3cc');
    instance.setCloudColor2('#ffffff');
    instance.setBgColor('#fff');
    instance.start()
})
Get('/tool/login').then((res)=>{
    console.log(res);
    window.sessionStorage.setItem('csrf',res as string)
})
</script>

<style scoped>

.myClouds{
    position: fixed;
    left: 0;
    top: 60px;
    width: 100%;
    max-height: 300px !important;
    z-index: -1;
}
</style>