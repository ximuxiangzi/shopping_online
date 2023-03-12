import Vue from "vue";
import VueRouter from "vue-router";

// Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/lineMonitor".
// 解决vue-router重复导航同一个路由的报错问题.
const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return RouterPush.call(this, to).catch(err => err)
}
const RouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return RouterReplace.call(this, to).catch(err => err)
}
//布局
import Layout from "@/components/index.vue";
Vue.use(VueRouter);

//路由
export const routingList=[
    {
        path: '/',
        redirect: '/login',
    },//匹配不到路由时跳转的页面
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),// vue路由懒加载  异步加载
        meta: {//路由元信息
            noNav: true // 不显示nav
        },
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('@/views/demo.vue'),// vue路由懒加载  异步加载
        meta: {
            noNav: true // 不显示nav
        },
        // // 独享路由守卫
        // beforeEnter: (to, from, next) => {
        //     //进入之前
        //     console.log('独享路由守卫',to, from)
        //     next();
        // }
    },
    {
        path: '/cesium',
        name: 'cesium',
        component: () => import('@/views/cesium.vue'),// vue路由懒加载  异步加载
        meta: {
            noNav: true // 不显示nav
        },
    },
    {
        path: '/home',//每次进入默认进入该路由
        // name: '/home',// 可以为路由进行命名,可以通过name进行路由跳转
        component: Layout,
        redirect: '/homePage',
        children:[
            {
                path:'/homePage',
                component: () => import('@/views/homePage/index.vue'),
            },
        ]
        //props 的第一种写法 值为对象 该对象的所有key _value 都会以props的形势传给组件 只能传递死数据
        // props:{a:1,b:"hello"},

        // props 的第二种写法 值为布尔值 若为真 就会把该组件收到的所有params参数以props的形势传给组件
        // props:true,

        // props 的第三种写法 值为函数 
        // props($route){
        //     return {n:$route.query.n,m:$route.query.m}//返回值必须是一个对象
        // }
        // props({query}){//解构赋值
        //     return {n:query.n,m:query.m}//返回值必须是一个对象
        // }


    },
]

//把常量routingList放进来
const router =  new VueRouter({
    // scrollBehavior: () => ({ y: 0 }),
    /**
     * hash     1.兼容器好   1.不会发给服务器但地址中永远带着# 不美观  3. 若以后将地址通过第三方手机app 分享 若app校验严格 则地址会标记为不合法
     * history  1.兼容性略差  2.地址美观干净  3.应用部署上显示需要后端人员支持，解决刷新页面服务端404的问题
     */
    mode: 'hash',
    routes: routingList,
});
//导出router

export default router
