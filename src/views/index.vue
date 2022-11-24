<template>
    <div>
        <HeaderVue></HeaderVue>
            <router-view />
        <FooterVue></FooterVue>
    </div>
</template>

<script setup lang="ts">
import HeaderVue from '@/components/Header/Header.vue';
import FooterVue from '@/components/Footer/Footer.vue'
import { Get } from '@/api/requerst';

Get('/tool/login').then((res)=>{
    console.log(res);
    window.sessionStorage.setItem('csrf',res as string)
})
</script>

<style scoped>

</style>