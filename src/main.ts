import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const root = createApp(App);
root.use(ElementPlus, { size: 'default', zIndex: 3000 ,  locale: zhCn,})
root.use(store)
root.use(router)
root.mount('#app')
