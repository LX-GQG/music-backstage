/*
 * @Author: LX_DUG
 * @Date: 2022-11-24 20:51:51
 * @LastEditors: LX_DUG
 * @LastEditTime: 2022-12-06 22:42:17
 * @Description: description
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import ElEmentPlus  from 'element-plus'
import lxButton from './components/lxButton.vue';
// vue3 传值
import mitt from 'mitt'
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "@/text/text.scss";
import './permission'


import './assets/main.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// vue3挂载到全局
app.config.globalProperties.$mitt = mitt();

app.component('lxButton',lxButton)

app.use(router).use(store).use(ElEmentPlus).mount('#app')
