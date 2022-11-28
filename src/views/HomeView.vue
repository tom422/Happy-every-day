<template>
  <div class="home page-content">
    <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>

  <div class="card">

    <el-row :gutter="12">
    <el-col :span="8">
      <el-card shadow="hover"> Hover </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover"> Hover </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover"> Hover </el-card>
    </el-col>
  </el-row>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Header from '@/components/Header/Header.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
    Header
  },
});
</script>

<style scoped>
.card{
  box-sizing: border-box;
  padding: 20px;
}
</style>
