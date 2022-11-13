import router from './router'
import store from './store'
// import {Message} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from '@/utils/auth'
// import { constantRoutes } from "@/router";

NProgress.configure({showSpinner: false})

const whiteList = ['/login']
console.log(getToken())

router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log(to.path)
    if(to.path == '/'){
        if(getToken()){
          next({path: '/login'})
        }else{
          alert("请先登录")
        }
    }else{
      next();
    }

})

// router.afterEach(() => {
//   NProgress.done()
// })
