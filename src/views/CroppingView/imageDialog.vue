<template>
    <div>
        <el-dialog v-model="dialogVisible" title="图片" width="50%" :before-close="handleClose">
            <div class="imgbox">
                <img :src="imgData" />
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="imgDowload">
                        下载
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, toRef } from 'vue'
import { ElMessageBox } from 'element-plus'
import { fileSave } from '@/tool/file';

const dialogVisible = ref(false)
const imgData = ref('')

const open = (base='')=>{
    dialogVisible.value = true
    imgData.value = base
}

const handleClose = (done: () => void) => {
//   ElMessageBox.confirm('Are you sure to close this dialog?')
//     .then(() => {
//       
//     })
//     .catch(() => {
//       // catch error
//     })
    done()
}
const imgDowload = ()=>{
    fileSave(imgData.value,'image.jpg')
}
defineExpose({
    open
})
</script>

<style lang="scss" scoped>
.imgbox{
    img{
        width: 100%;
        max-height: 800px;
    }
}
</style>