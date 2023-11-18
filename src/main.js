import { createApp } from 'vue'
import App from './App.vue'

// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入路由器
import router from './router'
// 导入创建pinia的函数
import { createPinia } from 'pinia'
// 创建vue实例
let app = createApp(App)
// 注册插件
app.use(router)
app.use(createPinia())
app.use(ElementPlus)
// 挂载容器
app.mount('#app')
