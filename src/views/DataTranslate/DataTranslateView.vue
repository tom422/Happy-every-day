<template>
    <div class="page">
        <div class="header">
           
           
        </div>
        <div class="box">
            <div class="item ">
                <div class="t_right">
                    <el-button type="text" @click="conversionTable">转化</el-button>
                </div>
                <textarea v-model="text" class="textarea "></textarea>
            </div>
            <div class="item ">
                <div class="t_right">
                    <!-- <el-button type="text" @click="copyText()">复制</el-button> -->
                </div>
                <div class="pre">
                    <highlightjs
                        language="JavaScript"
                        :autodetect="false"
                        :code="code"
                    ></highlightjs>
                    
                </div>
            </div>
        </div>
        <div class="row2">
            <div class="htmlbox">
                <highlightjs
                    language="Xml"
                    :autodetect="false"
                    :code="html"
                    ></highlightjs>
            </div>
        </div>
    </div>
</template>
<!--  -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import conversion from './index'
// const beautifyJS = require('js-beautify').js_beautify
// const beautifyHtml = require('js-beautify').html_beautify 
let text = ref('name string 名字(1测试一2测试二)')
var code = ref('')
var html = ref('')
function conversionTable() {
    let data = conversion(text.value)
    code.value = data.js
    html.value = data.vueTemplate  // beautifyHtml(data.vueTemplate, { indent_size: 2 } )
}
</script>

<style lang="scss" scoped>
.page {
    background: #fff;
    min-width: 1000px;
}

// .header {
//     height: 60px;
//     line-height: 60px;
//     background: #0066b8;
//     padding: 0 20px;
//     box-shadow: 0 2px 4px #00000014;
// }

.box {
    display: flex;
    justify-content: space-between;
    height: 500px;
}

.bg {
    /* background: pink; */
    box-shadow: inset 11px 10px 30px pink;
}

.box .item {
    flex: 1;
    box-sizing: content-box;
    padding: 15px;
    overflow: hidden;
}

.htmlbox {

    padding: 20px 20px 20px 20px;
}

.htmlbox>>>code {
    min-height: 100vh;
    border: 1px solid #535353;
}

.textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    padding: 8px;
    color: #606266;
    resize: none;
    outline: none;
    width: calc(100% - 16px);
    height: 90%;
    box-sizing: content-box;
    border-color:#d2d2d2;
}

.pre {
    width: 100%;
    height: 90%;
    /* padding: 1rem; */
    border: 1px solid #d2d2d2;
    box-sizing: content-box;
    overflow: auto;
    /* background-color: rgba(51, 51, 51, 0.079); */
}

.pre>>>code {
    min-height: 100vh;
}

.t_right {
    text-align: right;
}
</style>