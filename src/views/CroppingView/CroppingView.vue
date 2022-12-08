<template>
    <div class="page-content">
        
       <div>
            <img ref="image" src="@/assets/images/image.jpg"/>
       </div>
       <div>
            <img :src="imageData"/>
       </div>
       <el-button @click="onFileSave">裁剪图片</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs';
// const myClouds = ref(null)
const image = ref(null)
const imageData = ref('')
let myCropper:Cropper
onMounted(()=>{
    myCropper = new Cropper(image.value as unknown as HTMLImageElement)
 })


 const onFileSave = ()=>{
    imageData.value = myCropper.getCroppedCanvas({
        imageSmoothingQuality: 'high'
      }).toDataURL('image/jpeg')
 }

</script>

<style lang="scss" scoped>
</style>