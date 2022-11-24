<template>
  <div class="page-content">
    <!-- <el-upload v-model:file-list="fileList" action="" 
            list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <el-icon>
                <Plus />
            </el-icon>
        </el-upload> -->
    <el-upload class="upload-demo" drag :http-request="upload" multiple>
      <div class="card-bg">
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">
          拖拽文件到此处 or <em>点击击以上传</em>
        </div>
      </div>
    </el-upload>
    <div>
      <el-button type="primary" @click="getFileList"> 获取文件 </el-button>
    </div>
    <div>
      <div v-for="item in ShowfileList" :key="item.id">
        <div>{{ item.name }}   <el-button @click="downloadFile(item)">下载</el-button></div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import api from '@/api';
import type { filelist } from '@/api/type'
import { FileSave } from '@/tool/file'
import { Post, Get } from '@/api/requerst';
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

const ShowfileList = ref<filelist[]>([])
const getFileList = () => {
  Post(api.file.getList).then((res: any) => {
    console.log(res.data);
    
    ShowfileList.value = res.data
  })
}
const upload = (Options: UploadRequestOptions) => {
  console.log(Options);
  // const fromData = new FormData()
  // fromData.set('name',Options.file.name);
  // fromData.set('file',Options.file);
  // Post('/tool/addFile',fromData).then(res=>{
  //   console.log(res);
  //   getFileList()
  // })
}



const downloadFile = (item:any)=>{
  console.log(item);
  const blob = new Blob(item.content,{type:'image/jpeg'})
  FileSave(blob,item.name)
}
</script>

<style scoped>
.page-content {
  max-width: 1000px;
  margin: 0 auto;
}

.card-bg{

}
</style>