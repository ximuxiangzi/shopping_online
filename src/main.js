import Vue from 'vue'//引入vue
import App from './App.vue'//引入app父组件
import router from './router'//引入路由router
import ElementUI from 'element-ui';//引入element-ui
import 'element-ui/lib/theme-chalk/index.css';//引入element-ui css
Vue.use(ElementUI);//挂载
// import { cilck2 } from './mixin'//引入mixin
// Vue.mixin(cilck2)
import plugins from './pubgins'//引入pubgins 自定义插件
Vue.use(plugins)
// // 引入全局css
import './assets/style/header.scss'
// import './assets/style/header.scss'
router.beforeEach((to,from,next)=>{//全局前置路由守卫
  console.log(to,from,next)
  if(to.path == '/role'){
    alert("请先登录")
  }else{
    next();
  }
})
Vue.config.productionTip = false//关闭vue生产提示
//创建vue实例对象 -vm
new Vue({
  router,
  render: h => h(App),//引入vue残缺版需要render函数编译
  beforeCreate(){
    Vue.prototype.$bus = this;
  }

}).$mount('#app')//app挂载vue
