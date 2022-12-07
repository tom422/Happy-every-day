<template>
    <div>
        <canvas class="myClouds" ref="myClouds"></canvas>
        <img ref="image" src="../assets/images/image.jpg"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import * as klouds from 'klouds'    
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs';
const myClouds = ref(null)
const image = ref(null)
onMounted(()=>{
    const instance = klouds.create({
        selector:myClouds.value as unknown as HTMLCanvasElement,
        layerCount: 5,
        speed: 1,
    });
    instance.setCloudColor1('#1ab3cc');
    instance.setCloudColor2('#ffffff');
    instance.setBgColor('#fff');
    instance.start()
    const cropper = new Cropper(image.value as unknown as HTMLImageElement)
 })
</script>

<style lang="scss" scoped>
.myClouds{
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
}
</style>