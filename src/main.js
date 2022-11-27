import Vue from 'vue'//引入vue
import App from './App.vue'//引入app父组件
import router from './router'//引入路由router
import ElementUI from 'element-ui';//引入element-ui
import 'element-ui/lib/theme-chalk/index.css';//引入element-ui css
Vue.use(ElementUI);//挂载
// import { cilck2 } from './mixin'//引入mixin
// Vue.mixin(cilck2)
import plugins from './pubgins'//引入pubgins 自定义插件
import store from '@/store'//引入
Vue.use(plugins)
// // 引入全局css
import './assets/style/header.scss'
import {getDictDataLabel,parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree,downloadBy} from "@/utils/base";
// import './assets/style/header.scss'
import '@/assets/icons' // icon
import './permission' // permission control
import Pagination from "@/components/Pagination";//分页

Vue.prototype.handleTree = handleTree//树结构
Vue.prototype.selectDictLabels = selectDictLabels//回显数据字典（字符串数组）
Vue.prototype.selectDictLabel = selectDictLabel//// 回显数据字典
Vue.prototype.addDateRange = addDateRange//// 添加日期范围
Vue.prototype.resetForm = resetForm//// 表单重置
Vue.prototype.parseTime = parseTime//日期时间格式化
Vue.prototype.getDictDataLabel = getDictDataLabel//表格内有颜色的状态按钮
Vue.prototype.downloadBy = downloadBy//下载

Vue.config.productionTip = false//关闭vue生产提示
//全局组件挂载
Vue.component('Pagination', Pagination)
import JsonViewer from 'vue-json-viewer'//json 解析
Vue.use(JsonViewer)

import directive from './directive' // directive
Vue.use(directive)
//创建vue实例对象 -vm
new Vue({
  router,
  store,
  render: h => h(App),//引入vue残缺版需要render函数编译
  beforeCreate(){
    Vue.prototype.$bus = this;
  }
}).$mount('#app')//app挂载vue
