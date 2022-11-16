import store from './store'
// import {Message} from 'element-ui'
import {getToken} from '@/utils/auth'
import router  from "@/router";
import Layout from "@/components/index.vue";
let status = true
let dataList =[
      {
          path: '/homePage/index',//每次进入默认进入该路由
          // name: '/home',// 可以为路由进行命名,可以通过name进行路由跳转
          component: Layout,
          redirect: '/homePage/index',
          node:{
            menuType:0,
            path: '/home',//每次进入默认进入该路由
          },
          children:[
              {
                  path:'/homePage/index',
                  component: () => import('@/views/homePage/index.vue'),
                  node:{
                    menuType:1,
                    path:'/homePage/index',
                  },
              },
              {
                  name: '用户管理',
                  component: () => import('@/views/sys/user.vue'),
                  node:{
                    menuType:1,
                    path:'/sys/user',
                  },
              },
              {
                name: '角色管理',
                component: () => import('@/views/sys/user.vue'),
                node:{
                  menuType:1,
                  path:'/sys/role',
                },
            },
            {
              name: '权限管理',
              component: () => import('@/views/sys/user.vue'),
              node:{
                menuType:1,
                path:'/sys/permission',
              },
          },
          ]
      },
]
router.beforeEach((to,from,next)=>{//全局前置路由守卫
  let token =getToken();
  if(to.path == '/' ||( null===token && to.path != '/login')){
    // alert("请先登录")
    next({path: '/login'})
  }else{
    if(status){
      console.log('执行添加路由...')
      //重新添加动态路由
      // let val =loadChild(dataList);
      let val =loadChild(JSON.parse(store.state.userInfo).roles[0].treeNodes);
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
  console.log(path)
  return (resolve) => require([`@/views${path}.vue`], resolve);
}


function loadChild(data){
  let val=[];
  ( data || []).forEach(e=>{
    if(e.node.menuType !== 2){
      let demo ={
        path:e.node.path,
        component:Layout,
        redirect: e.children[0].node.path,
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
