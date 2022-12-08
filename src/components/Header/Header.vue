<template>
  <div class="header-default">
    <div class="header">
      <el-row>
        <el-col :span="20" :offset="2">
          <div class="icon" @click="goHome">
            <div>
              <div class="icon-title">开心每一天</div>
              <div class="line"></div>
              <div class="icon-subtitle">live-each-day</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
        name:'header',
        data(){
          return{

          }
        },
        methods:{
          goHome(){
            this.$router.push('/')
          }
        }

})
</script>
<style lang="scss" scoped>
.header-default{
  width: 100%;
  height: 60px;
}
.header {
  width: 100%;
  height: 60px;
  // box-shadow: 0px 5px 6px 5px #dcdcdc3b;
  box-shadow: 0 1px 10px rgb(151 164 175 / 10%);
  user-select: none;
  text-align: left;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  // background-image: radial-gradient(transparent 1px, #ffffff 1px);
  // background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}

.icon {
  height: 60px;
  display: flex;
  align-items: center;
}

.line {
  margin: 2px 0;
  border-bottom: 1px dashed #d2d2dd;
}

.icon-title {
  // color: rgba(207, 150, 44, 0.788);
  font-size: 18px;
  font-weight: 600;
  color: var(--main-color);
}

.icon-subtitle {
  // color: rgba(207, 150, 44, 0.788);
  color: var(--main-color);
  font-size: 12px;
  transform: scale(0.8);
  transform-origin: left top;
}
</style>