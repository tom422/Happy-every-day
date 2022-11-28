<template>
  <div class="header">
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="icon">
          <div>
            <div class="icon-title">开心每一天</div>
            <div class="line"></div>
            <div class="icon-subtitle">live-each-day</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({

})
</script>
<style lang="scss" scoped>
.header {
  height: 60px;
  // box-shadow: 0px 5px 6px 5px #dcdcdc3b;
  box-shadow: 0 1px 10px rgb(151 164 175 / 10%);
  user-select: none;
  text-align: left;
  
}

.icon{
  height: 60px;
  display: flex;
  align-items: center;
}

.line{
  margin: 2px 0;
  border-bottom: 1px dashed #d2d2dd;
}
.icon-title {
  color: rgba(207, 150, 44, 0.788);
  font-size: 18px;
  font-weight: 600;
   
}

.icon-subtitle{
  color: rgba(207, 150, 44, 0.788);
  font-size: 12px;
  transform: scale(0.8);
  transform-origin: left top; 
}
</style>