<template>
  <div>
    <el-row class="mb-4">
      <el-button @click="handleRouter('/PictureToolsView')">Default</el-button>
      <el-button @click="getData" type="primary">Primary get</el-button>
      <el-button @click="handleRouter('/test')" type="success">test</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Get } from '@/api/requerst';
const router = useRouter();
const handleRouter = (path = '/') => {
  router.push(path)
}
const getData = () => {
  Get('/tool/file').then((res): void => {
    console.log(res);
  })
}
</script>

<style scoped>

</style>