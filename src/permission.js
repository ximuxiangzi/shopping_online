import store from './store'
// import {Message} from 'element-ui'
import {getToken} from '@/utils/auth'
import router  from "@/router";
import Layout from "@/components/index.vue";
let status = true
router.beforeEach((to,from,next)=>{//全局前置路由守卫
  let token =getToken();
  console.log(token,to.path)
  if(to.path == '/' || ( null===token && to.path != '/login')){
    // alert("请先登录")
    next({path: '/login'})
  }else if(to.path === '/login'){
    next()
  }else{
    if(status){
      console.log('执行添加路由...')
      //重新添加动态路由
      console.log(JSON.parse(store.state.userInfo))
      let val =loadChild(JSON.parse(store.state.userInfo)?.roles[0]?.treeNodes);
      console.log(val)
      router.addRoutes(val)
      status= false;
      next({ ...to, replace: true })
    }else{
      console.log('直接跳转...')
      next();
    }
  }
})

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
      console.log("demo,v",demo)
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
