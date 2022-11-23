<template>
    <div>
        <el-upload v-model:file-list="fileList" action="" :http-request="upload"
            list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <el-icon>
                <Plus />
            </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import { Post } from '@/api/requerst';
import type { UploadProps, UploadUserFile, UploadRequestOptions } from 'element-plus'

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const upload = (Options: UploadRequestOptions)=>{
  console.log(Options);
  const fromData = new FormData()
  fromData.set('name',Options.file.name);
  fromData.set('file',Options.file);
  Post('/tool/addFile',fromData)
}
</script>

<style scoped>

</style>