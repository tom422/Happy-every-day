<template>
  <div>
    <el-row class="mb-4">
      <el-button @click="handleRouter">Default</el-button>
      <el-button @click="getData" type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import request from '@/api/requerst';
const router = useRouter();
const handleRouter = () => {
  router.push('/PictureToolsView')
}


const getData = () => {
  request({
    method: 'get',
    url: '/tool/file',
  }).then(res=>{
    console.log(res);
    
  })
}
</script>

<style scoped>

</style>