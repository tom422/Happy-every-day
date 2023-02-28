import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

// highlight 的样式，依赖包，组件
// import 'highlight.js/styles/default.css'
import './assets/css/tomorrow.min.css.css'
import hl from 'highlight.js' // 导入代码高亮文件

import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import html from 'highlight.js/lib/languages/vbscript.js';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', html);


const root = createApp(App);
root.use(ElementPlus, { size: 'default', zIndex: 3000 ,  locale: zhCn,})
root.use(store)
root.use(router)
root.use(hljsVuePlugin)
root.mount('#app')
 