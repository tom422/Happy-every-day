<template>
    <div>
       <div class="page-content">
        <div>
            <el-upload class="upload-demo"  v-model:file-list="fileList" drag :http-request="upload" :limit="1" :show-file-list="false" multiple>
                <div class="card-bg">
                    <el-icon class="el-icon--upload">
                        <upload-filled />
                    </el-icon>
                    <div class="el-upload__text">
                        拖拽文件到此处 or <em>点击击以上传</em>
                    </div>
                </div>
            </el-upload>
        </div>
        
        <div class="preview-img"> 
            <img ref="imgNode" @load="nodeImgOnload"  alt="" />
        </div>
       
        <div class="preview-canvas">
            <canvas ref="myCanvas" width="800" height="400"></canvas>
        </div>

        <div class="preview" v-if="imgText">
            <div style="text-align: center;">
                <el-button @click="onCopyText(imgText)"> 复制文本</el-button>
            </div>
            <pre>{{imgText}}</pre>
        </div>
       </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { imageToGrey, toChars } from '@/tool/pic_to_chars';
import type { UploadRequestOptions,UploadUserFile } from 'element-plus';
import { Message, UploadFilled } from '@element-plus/icons-vue';
import { copyText } from '@/tool/tool'
const myCanvas = ref<HTMLCanvasElement | null>(null);
const imgNode = ref<HTMLImageElement | null>(null);
const imgText = ref('');
const fileList = ref<UploadUserFile[]>([])
const nodeImgOnload = () => {
    const canvas = myCanvas.value as HTMLCanvasElement
    const imags = imgNode.value as HTMLImageElement
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
    ctx.scale(0.1,0.1);
    ctx.putImageData(data.getImageData, 0, 0);
    imgText.value = data.output
}
onMounted(() => {
    // const imags =  imgNode.value as HTMLImageElement
    // imags.onload = nodeImgOnload
})

/** 上传文件 */
const upload = (Options: UploadRequestOptions) => {
    fileList.value = []
    const img =  imgNode.value as HTMLImageElement
    // 获得文件
		var file = Options.file;
		console.log(file)
		var reader = new FileReader();
		
		// 将文件读取为DataUrl
		reader.readAsDataURL(file);
		
		reader.onload = function(event) {
            console.log(this.result)
			img.src = this.result as string;
		}
		
		reader.onerror = function(event){
			throw new Error("读取出错");
		}
		
		reader.onloadstart = function() {
			console.log("读取开始");
		}
}   

const onCopyText = (str: string)=>{
    copyText(str)
    Message
}

</script>

<style lang="scss" scoped>
.preview-img{
    padding: 15px;
    
    img{
        max-width: 100%;
        
    }
}

.preview{
    overflow: auto;
}
</style>