<template>
  <div class="home page-content">
    <canvas class="myClouds" ref="myClouds"></canvas>
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <div class="card">
      <el-row :gutter="12">
        <el-col class="col" :span="8">
          <el-card shadow="hover" @click="jumRouter('/PictureToolsView')">
            <el-icon><Picture /></el-icon>
             图片压缩
          </el-card>
        </el-col>
        <el-col class="col" :span="8">
          <el-card shadow="hover" @click="jumRouter('/test')"> 图片转字符串 </el-card>
        </el-col>
        <el-col class="col" :span="8">
          <el-card shadow="hover" @click="jumRouter('/about')"> Hover </el-card>
        </el-col>
        <el-col class="col" :span="8">
          <el-card shadow="hover" @click="jumRouter('/CloudView')"> 云 </el-card>
        </el-col>
        <el-col class="col" :span="8">
          <el-card shadow="hover" @click="jumRouter('/CloudView')"> 云 </el-card>
        </el-col>
        <el-col class="col" :span="8">
          <el-card shadow="hover" @click="jumRouter('/CloudView')"> 云 </el-card>
        </el-col>
        <el-col class="col" :span="8">
          <el-card shadow="hover" @click="jumRouter('/CloudView')"> 云 </el-card>
        </el-col>
        <el-col class="col" :span="8">
          <el-card shadow="hover" @click="jumRouter('/CloudView')"> 云 </el-card>
        </el-col>
        <el-col class="col" :span="8">
          <el-card shadow="hover" @click="jumRouter('/CloudView')"> 云 </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header/Header.vue';
import { Picture } from '@element-plus/icons-vue'
import * as klouds from 'klouds'   
export default defineComponent({
  name: 'HomeView',
  components: {
    Header,
    Picture
  },
  mounted(){
     const instance = klouds.create({
        selector:this.$refs.myClouds as HTMLCanvasElement,
        layerCount: 5,
        speed: 1,
    });
    instance.setCloudColor1('#1ab3cc');
    instance.setCloudColor2('#ffffff');
    instance.setBgColor('#fff');
    instance.start()
  },
  methods: {
    jumRouter(url: string) {
      this.$router.push(url)
    }
  }
});
</script>

<style lang="scss" scoped>
.card {
  box-sizing: border-box;
  padding: 20px;

  .col{
    padding: 10px 0;
  }
}

.myClouds{
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
}
</style>
