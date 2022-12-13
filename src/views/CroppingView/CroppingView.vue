<template>
     <div class="page-content">

          <div class="image-box">
               <img ref="image" src="@/assets/images/image.jpg" />
          </div>
          <div class="operation">
              
               <div class="row">
                    <div class="row-col">
                         <span class="row-lable">宽度：</span>
                         <el-input-number v-model="cropperWidth" :min="1" :max="2000" :step="50" @change="setSize" />
                    </div>
                    <div class="row-col">
                         <span class="row-lable">高度：</span>
                         <el-input-number v-model="cropperHeight" :min="1" :max="2000" :step="50" @change="setSize" />
                    </div>
                    <div class="row-col">
                         <el-upload ref="upload" class="upload-demo" :limit="1" action="" accept="image/*"
                              :http-request="uploadPictures" :on-exceed="handleExceed" >
                              <template #trigger>
                                   <el-button type="primary">
                                        <el-icon>
                                             <UploadFilled /> 
                                        </el-icon>
                                        上传图片
                                   </el-button>
                              </template>
                              <!-- <template #tip>
                                   <div class="el-upload__tip">
                                        jpg/png files with a size less than 500kb
                                   </div>
                              </template> -->
                         </el-upload>
                    </div>
                    <div class="row-col">
                         <el-button type="primary" @click="onFileSave">裁剪图片</el-button>
                    </div>
               </div>
               <div class="row">
                    
               </div>
          </div>

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
import { genFileId } from 'element-plus'
import type { UploadInstance , UploadProps, UploadRawFile } from 'element-plus'

console.log(ImageDialog);

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

 

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
// 设置宽高
const cropperWidth = ref(100)
const cropperHeight = ref(100)
const setSize = () => {
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
     const dialogImage = imageVue.value as any
     dialogImage.open(data)

}

</script>

<style lang="scss" scoped>
.image-box {
     max-height: 500px;
}

.operation {
     padding: 20px;

     .row {
          padding: 10px 0;
          display: flex;
          .row-col{
               margin: 0 5px;
          }

          .row-lable{
               font-size: 13px;

          }
     }
}
</style>