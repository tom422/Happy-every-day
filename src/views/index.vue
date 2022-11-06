<template>
    <div>
        <HeaderVue></HeaderVue>
        <RouterView></RouterView>
        <FooterVue></FooterVue>
    </div>
</template>

<script setup lang="ts">
import HeaderVue from '@/components/Header/Header.vue';
import FooterVue from '@/components/Footer/Footer.vue'
</script>

<style scoped>

</style>