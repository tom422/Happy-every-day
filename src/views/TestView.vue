<template>
    <div>
        <img ref="imgNode"  @load="nodeImgOnload"  src="../assets/images/img.jpeg" alt="" />
        <canvas ref="myCanvas" width="800" height="400"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { imageToGrey , toChars } from '@/tool/pic_to_chars';
const myCanvas = ref<HTMLCanvasElement | null>(null);
const imgNode = ref<HTMLImageElement | null>(null);

const nodeImgOnload = () => {
    const canvas = myCanvas.value as HTMLCanvasElement
    const imags =  imgNode.value as HTMLImageElement
    // 默认按比例压缩

    let w = imags.width
    let h = imags.height
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D 
    // 创建属性节点
    canvas.width = w
    canvas.height = h
    // console.log(preview,that);
    ctx.drawImage(imags, 0, 0, w, h)


    let x = canvas.width
    let y = canvas.height
    let pixels = ctx.getImageData(0, 0, x, y);
    pixels = imageToGrey(pixels)
    ctx.putImageData(pixels, 0, 0);
    let data = toChars(ctx, canvas.width, canvas.height)
    ctx.putImageData(data.getImageData,  0, 0 );
    document.body.appendChild(data.canvas)

}
onMounted(() => {
    // const imags =  imgNode.value as HTMLImageElement
    // imags.onload = nodeImgOnload
})

</script>

<style lang="scss" scoped>

</style>