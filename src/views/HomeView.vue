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
          <el-card shadow="hover" @click="jumRouter('/PictureToolsView')">
            <el-icon><Picture /></el-icon>
            图片压缩
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" @click="jumRouter('/test')"> 图片转字符串 </el-card>
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
import Header from '@/components/Header/Header.vue';
import { Picture } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    Header,
    Picture
  },

  methods: {
    jumRouter(url: string) {
      this.$router.push(url)
    }
  }
});
</script>

<style scoped>
.card {
  box-sizing: border-box;
  padding: 20px;
}
</style>
