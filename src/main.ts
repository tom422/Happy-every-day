import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const root = createApp(App);
root.use(ElementPlus, { size: 'small', zIndex: 3000 })
root.use(store)
root.use(router)
root.mount('#app')
