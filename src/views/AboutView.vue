<template>
  <div class="page-content">
    <el-row class="mb-4">
      <ButtonBird></ButtonBird>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Get } from '@/api/requerst';
import ButtonBird from '@/components/ButtonBird/ButtonBird.vue';
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

<style lang="scss" scoped>
#box {
  width: 100px;
  height: 100px;
  background: #f4cf47;
  border: solid 3px #000;
  border-radius: 20px 30px 40px 50px / 50px 40px 30px 20px;
  clip-path: path('M13.77,37.35L.25,16.6c-.87-1.33,.69-2.91,2-2.02l12.67,8.59c.81,.55,1.91,.14,2.18-.81l2.62-9.33c.39-1.4,2.34-1.42,2.76-.02l3.6,11.99c.33,1.11,1.74,1.4,2.47,.52L49.38,.52c.87-1.04,2.53-.42,2.53,.95V23.7c0,1.13,1.2,1.83,2.16,1.26l12.75-7.51c.85-.5,1.94,0,2.13,.98l1.5,7.6c.2,1.03,1.37,1.51,2.22,.92l17.74-12.3c1.09-.75,2.52,.25,2.21,1.55l-2.44,10.2c-.26,1.09,.74,2.06,1.8,1.75l30.8-9.04c1.37-.4,2.42,1.26,1.49,2.36l-9.07,10.66c-.83,.98-.1,2.49,1.17,2.42l12.12-.68c1.6-.09,2.12,2.15,.65,2.8l-2.73,1.21c-.18,.08-.38,.12-.58,.12H14.97c-.48,0-.93-.25-1.2-.65Z');

}

</style>