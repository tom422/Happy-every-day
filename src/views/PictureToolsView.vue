<template>
  <div class="page-content">
    <!-- <el-upload v-model:file-list="fileList" action="" 
            list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <el-icon>
                <Plus />
            </el-icon>
        </el-upload> -->
    <el-upload class="upload-demo" drag :http-request="upload" :limit="10" :show-file-list="false" multiple>
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
      <!-- <el-button type="primary" @click="getFileList"> 获取文件 </el-button> -->
    </div>
    <div class="file_list">
      <div v-for="item in fileList" :key="item.id">
        <div class="file_list_item">
          <div class="item_name text-ellipsis">{{item.name}}</div>
          <div class="item_progress">
            <el-progress :stroke-width="15" :percentage="100" :text-inside="true" :status="item.status ? 'success':'exception'" :indeterminate="item.indeterminate" :duration="1" />
          </div>
          <div class="item_download">
            <el-button @click="downloadFile(item)">下载</el-button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <el-button @click="downloadFileZip"> zip </el-button>
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
import { fileSave, fileZip } from '@/tool/file'
import { Post, Get } from '@/api/requerst';
import type { UploadProps, UploadUserFile, UploadRequestOptions } from 'element-plus'
import { nanoid } from "nanoid";
import { fa } from 'element-plus/es/locale';

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
/** 删除文件 */
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
/** 文件展示 */
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

/**文件列表 */
const fileList = ref<filelist[]>([])
const getFileList = () => {
  Post(api.file.getList).then((res: any) => {
    console.log(res);
    const data = JSON.parse(res).data
    fileList.value = data
  })
}

/** 上传文件 */
const upload = (Options: UploadRequestOptions) => {
  const uuid = nanoid()
  console.log(Options);
  const file = Options.file
  const fromData = new FormData()
  fromData.set('name', Options.file.name);
  fromData.set('type', Options.file.type);
  fromData.set('file', Options.file);
  // Post('/tool/addFile',fromData,{
  //   "content-type": "multipart/form-data"
  // }).then(res=>{
  //   console.log(res);
  //   // getFileList()
  // })
  fileList.value.push({
    id: uuid,
    name: file.name,
    type: file.type,
    url:'',
    status: true,
    indeterminate: true
  })

  setTimeout(() => {
    for (let index = 0; index < fileList.value.length; index++) {
      const element = fileList.value[index];
      if (element.id === uuid) {
        element.indeterminate = false
        element.status = false
        break;
      }
    }
  }, 3000)
}






function convertBase64ToBlob(imageEditorBase64: string) {
  var base64Arr = imageEditorBase64.split(",");
  var imgtype = "";
  var base64String = "";
  if (base64Arr.length > 1) {
    //如果是图片base64，去掉头信息
    base64String = base64Arr[1];
    imgtype = base64Arr[0].substring(
      base64Arr[0].indexOf(":") + 1,
      base64Arr[0].indexOf(";")
    );
  }
  // 将base64解码
  var bytes = atob(base64String);
  //var bytes = base64;
  var bytesCode = new ArrayBuffer(bytes.length);
  // 转换为类型化数组
  var byteArray = new Uint8Array(bytesCode);

  // 将base64转换为ascii码
  for (var i = 0; i < bytes.length; i++) {
    byteArray[i] = bytes.charCodeAt(i);
  }

  // 生成Blob对象（文件对象）
  return new Blob([bytesCode], { type: imgtype });
}

const downloadFile = (item: any) => {
  console.log(item);
  const base64 = `data:${item.fileType}:base64,${item.content}`
  fileSave(convertBase64ToBlob(base64), item.name)
}

const downloadFileZip = ()=>{
  fileZip()
}
</script>

<style scoped>
.page-content {
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 50px;
}

.card-bg {}

.file_list{
   
}
.file_list .file_list_item{
  display: flex;
  align-items: center;
  padding: 12px 10px;
  margin: 6px 0;
  border: 1px dashed #d3d3d3 ;
}

.file_list_item .item_name {
  flex: 1 auto;
  width: 200px;
  text-align: left;
}

.file_list_item .item_progress {
  flex: 1 auto;
  width: 400px;
}

.file_list_item .item_download {
  flex: 1 auto;
  width: 200px;
}
</style>