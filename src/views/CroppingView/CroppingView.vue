<template>
     <div class="page-content">

          <div class="image-box">
               <img ref="image" src="@/assets/images/image.jpg" />
          </div>
          <div>
               <el-input-number v-model="cropperWidth" :min="1" :max="2000" @change="setWidth" />
               <el-input-number v-model="cropperHeight" :min="1" :max="2000" @change="setWidth" />
               <el-button @click="setWidth">确认</el-button>

               <div>
                    <el-upload ref="uploadRef" class="upload-demo"
                         action="" accept="image/*" :http-request="uploadPictures">
                         <template #trigger>
                              <el-button type="primary">
                                   <el-icon><UploadFilled /></el-icon>
                              </el-button>
                         </template>
                         <template #tip>
                              <div class="el-upload__tip">
                                   jpg/png files with a size less than 500kb
                              </div>
                         </template>
                    </el-upload>
               </div>
          </div>
          <el-button @click="onFileSave">裁剪图片</el-button>
          <ImageDialog ref="imageVue"></ImageDialog>
     </div>
</template>

<script setup lang="ts">
import { ref, VueElement } from 'vue'
import { onMounted } from '@vue/runtime-core'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs';
import ImageDialog from './imageDialog.vue';
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadInstance } from 'element-plus'

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value!.submit()
}

const imageVue = ref<VueElement>()
// const myClouds = ref(null)
const image = ref(null)
const imageData = ref('')
let myCropper: Cropper
onMounted(() => {
     myCropper = new Cropper(image.value as unknown as HTMLImageElement)
})
// 设置宽高
const cropperWidth = ref(100)
const cropperHeight = ref(100)
const setWidth = () => {
     myCropper.setData({
          width: cropperWidth.value,
          height: cropperHeight.value
     })
}
/** 上传图片 */
const uploadPictures = (UploadRequestOptions: any) => {
     console.log(UploadRequestOptions);
     const file = UploadRequestOptions.file
     if (/^image\/\w+$/.test(file.type)) {
          const blobURL = URL.createObjectURL(file);
          myCropper.replace(blobURL)
          myCropper.reset()
          // URL.revokeObjectURL(blobURL);
     } else {
          // showMessage('Please choose an image file.');
     }
}

/** 裁剪图片 */
const onFileSave = () => {
     const data = myCropper.getCroppedCanvas({
          imageSmoothingQuality: 'high'
     }).toDataURL('image/jpeg')
     console.log(imageVue.value);
     const dialogImage = imageVue.value as any
     dialogImage.open(data)

}

</script>

<style lang="scss" scoped>
.image-box{
     max-height: 500px;
}
</style>