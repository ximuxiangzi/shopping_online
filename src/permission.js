import store from './store'
// import {Message} from 'element-ui'
import {getToken} from '@/utils/auth'
import router  from "@/router";
import Layout from "@/components/index.vue";
// 白名单（这里是根据路由名字判断的）
const whiteList = ['/cesium', "/demo", ];
let status = true
router.beforeEach((to,from,next)=>{//全局前置路由守卫 to：去 from：从哪里去  next：放行 初始化被调用 每次路由切换之后被调用
  let token =getToken();
  console.log('第一个路由前置守卫')

  console.log(token,to.path)
  if(to.path == '/' || ( null===token && to.path != '/login')){
    console.log(whiteList,whiteList.includes(to.path),to.path,to)
    if (whiteList.includes(to.path)) {
      console.log('to.path == ',whiteList)
      // 在免登录白名单，直接进入
      next();
    } else{
      console.log('to.path == ',111)
      next({path: '/login'})
    }
   
  }else if(to.path === '/login'){
     // 没有 cookie
    next()
  }else{
    console.log(localStorage.getItem('statusMenu'))
    if(status || localStorage.getItem('statusMenu') == '0'){
      console.log('sssssssss')
      localStorage.setItem('statusMenu','1')
      //重新添加动态路由
      console.log(store.state)
      let val =loadChild(JSON.parse(store.state.Options.menuData));
      console.log(val)
      router.addRoutes(val)
      status= false;
      next({ ...to, replace: true })
    }else{
      next();
    }
  }
})

// router.afterEach((to,from)=>{//全局后置路由守卫 to：去 from：从哪里去 初始化被调用 每次路由切换之后被调用
// console.log(to,from)
// document.title = '我放行了'
// })




function routerCom(path) { //对路由的component解析
  return (resolve) => require([`@/views${path}.vue`], resolve);
}


function loadChild(data){
  let val=[];
  ( data || []).forEach(e=>{
    if(e.node.menuType !== 2){
      let demo ={
        path:e.node.path,
        component:Layout,
        redirect: e?.children[0]?.node.path,
        children: loadChilden(e.children)};
      val.push(demo);
    }
  });
  return val;
}

function loadChilden(data){
  let val=[];
  ( data || []).forEach(e=>{
    if(e.node.menuType === 1){
      let demo ={
        path:e.node.path,
        component:routerCom(e.node.path),
      };
      val.push(demo);
    }
  });
  return val;
}
